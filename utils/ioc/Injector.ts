/**
 * A DI container for ES 6
 */

// tslint:disable

// We want to support any logging an application might use
type LogMethod = (...args: any[]) => void;

// This looks like the console.log, it's the default
interface Logger {
    error: LogMethod;
    debug: LogMethod;
}

// Interface for something that can be instantiated
type ClassOf<T> = new () => T;

// Accept injections of classes or strings resolved from process.env
type InjectableType<T> = ClassOf<T> | typeof Injector | string;

// To resolve an injection point
export type Provider<T> = (injector: Injector, obj: object, field: string) => T;

function getInjectableTypeKey(type: any): string {
    return !type ? '<undefined>' : type.name ? type.name : type;
}

function getLocation(obj: object, property: string): string {
    const objKey = getInjectableTypeKey(obj.constructor);
    return objKey + '.' + property;
}

function validateType(type: InjectableType<any>, obj: object, prop: string) {
    if (!type) {
        throw new Error('Type is undefined ' + getLocation(obj, prop));
    }
}

export function inject(type: InjectableType<any>) {
    return function injectClassProperty(obj: any, prop: string) {
        validateType(type, obj, prop); // Do this here so we can point to the Class.field
        Object.defineProperty(obj, prop, {
            get() {
                const i = (this as any).__injector;
                if (!i) {
                    throw new Error('No injector defined @ ' + getLocation(obj, prop) + ' did you forget @injected ?');
                }
                return i.getInstance(type, this, prop);
            },
        });
    };
}

/**
 * Explicit demarcation for a singleton scope
 */
export function singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
    let instance: any;
    (constructor as any).__provider = function SingletonProvider(injector: Injector) {
        if (!instance) {
            instance = instance = new constructor();
            instance.__injector = injector;
            if (instance.__postConstruct) {
                instance.__postConstruct.apply(instance);
            }
        }
        return instance;
    };
    return constructor;
}

/**
 * Create an instance of this type for each injection point
 */
export function newInstance<T extends { new (...args: any[]): {} }>(constructor: T) {
    (constructor as any).__provider = function InstancePerObjectProvider(
        injector: Injector,
        obj: object,
        prop: string
    ) {
        const o = obj as any;
        if (!o.__instances) {
            o.__instances = {};
        }
        let instance = o.__instances[prop];
        if (!instance) {
            instance = o.__instances[prop] = new constructor() as T;
            instance.__injector = injector;
            if (instance.__postConstruct) {
                instance.__postConstruct.apply(instance);
            }
        }
        return instance;
    };
    return constructor;
}

/**
 * Called after object is constructed; use this to access injected properties
 */
export function postConstruct(target: any, prop: string, descriptor: PropertyDescriptor) {
    const method = function(this: any) {
        this[prop].apply(this);
    };
    if (target.__postConstruct) {
        const existing = target.__postConstruct;
        target.__postConstruct = function(this: any) {
            existing.apply(this);
            method.apply(this);
        };
    } else {
        target.__postConstruct = method;
    }
}

interface Bindable<T> {
    /**
     * NOTE: if you are providing an alternate implementation and the parent class
     * specifies a provider (e.g. @singleton), you must also specify a provider on
     * the subclass because the parent's provider will be picked up and used, and
     * likely provide the parent
     *
     * FIXME: providers
     *
     * @param {{new(): T}} constructor
     */
    to: (constructor: { new (): T }) => void;
    toProvider: (provider: Provider<T>) => void;
    toInstance: (instance: T) => void;
}

export class ConsoleLogger implements Logger {
    error = console.error.bind(console);
    debug = console.debug.bind(console);
}

export class Injector {
    /**
     * Holds instance providers
     */
    providers = {};

    /**
     * This may be an injector with a parent, which can get delegated to
     */
    parent?: Injector;

    /**
     * The logger to use, this defaults to `ConsoleLogger`
     */
    logger: Logger;

    constructor(config: Injector | Logger = new ConsoleLogger()) {
        if (config instanceof Injector) {
            this.logger = config.logger;
            this.parent = config;
        } else {
            this.logger = config;
        }
    }

    bind<T>(type: InjectableType<T>): Bindable<T> {
        const injector = this;
        return {
            to: function RegisterType(constructor: { new (): T }) {
                injector.registerProvider(type, (injector: Injector) => injector.getInstance(constructor));
            },
            toProvider: function RegisterProvider(provider: Provider<T>) {
                injector.registerProvider(type, provider);
            },
            toInstance: function RegisterInstance(instance: T) {
                injector.registerProvider(type, () => instance);
            },
        };
    }

    private registerProvider<T>(type: InjectableType<T>, provider: Provider<T>) {
        const key = getInjectableTypeKey(type);
        this.providers[key] = provider;
    }

    getInstance<T>(type: InjectableType<T>, obj: object = {}, property: string = ''): T {
        if (type === Injector) {
            return this as any;
        }
        const key = getInjectableTypeKey(type);
        let provider = this.providers[key];
        if (!provider) {
            if (this.parent && this.parent.providers[key]) {
                return this.parent.getInstance(type, obj, property);
            }

            provider = (type as any).__provider;
            if (!provider) {
                // otherwise just new it up
                this.logger.debug('No provider for: ', getInjectableTypeKey(type), '@', getLocation(obj, property));

                let instance: any;
                if (typeof type === 'string') {
                    // TODO does this make sense? otherwise configured variables?
                    instance = process.env[type];
                } else {
                    // TODO how to determine if a class or just a function?
                    instance = new (type as ClassOf<any>)();
                    instance.__injector = this;
                    if (instance.__postConstruct) {
                        instance.__postConstruct.apply(instance);
                    }
                }

                this.providers[key] = () => instance;
                return instance;
            }
        }

        try {
            const instance = provider(this, obj, property);
            instance.__injector = this;
            return instance;
        } catch (e) {
            this.logger.error(
                'An error occurred while attempting to inject' +
                    getInjectableTypeKey(type) +
                    '@' +
                    getLocation(obj, property),
                e
            );
            throw e;
        }
    }
}
