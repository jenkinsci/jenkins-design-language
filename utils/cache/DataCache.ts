import { Timer } from './Timer';

export interface Logger {
    info: (...args: any[]) => void;
}

export interface ClassType<T> {
    name: string;
    new (): T;
}

export interface CacheEntry<V> {
    key: string;
    value: V;
    modified: number;
}

export interface CacheListener<V> {
    added?: (k: string, v: V | null) => void;
    retrieved?: (k: string, v: V | null) => V | null | undefined;
    removed?: (k: string, v: V | null) => void;
    evicted?: (k: string, v: V | null) => void;
}

export class DataCacheManager {
    static defaultMaxAge = 1 * 60 * 1000; // default to 1 min for now

    log: Logger;

    // tslint:disable-next-line
    caches: DataCache<any>[] = [];
    evictionTimer: Timer;

    constructor(log: Logger = console) {
        this.log = log;
        this.evictionTimer = new Timer(2000, this.runCacheEviction.bind(this));
        this.startEvictionTimer();
    }

    startEvictionTimer() {
        this.evictionTimer.start();
    }

    stopEvictionTimer() {
        this.evictionTimer.stop();
    }

    // tslint:disable-next-line
    register(cache: DataCache<any>) {
        cache.lastEviction = this.getTime();
        this.caches.push(cache);
    }

    getTime() {
        return Date.now();
    }

    runCacheEviction() {
        const now = this.getTime();
        // let evictCount = 0;
        for (let cacheIdx = 0; cacheIdx < this.caches.length; cacheIdx++) {
            const cache = this.caches[cacheIdx];
            if (now - cache.lastEviction < cache.maxAge) {
                continue;
            }
            cache.lastEviction = now;
            for (const key of Object.keys(cache._data)) {
                const val = cache._data[key];
                if (val && now - val.modified >= cache.maxAge) {
                    delete cache._data[key];
                    // evictCount++;
                    if (cache.listeners) {
                        for (const l of cache.listeners) {
                            if (l.evicted) {
                                l.evicted(val.key, val.value);
                            }
                        }
                    }
                }
            }
        }

        // this.log.info('Eviction completed in', this.getTime() - now, 'ms, for', evictCount, 'items');
    }
}

export class DataCache<V> {
    manager: DataCacheManager;

    _data: { [key: string]: CacheEntry<V> } = {};
    lastEviction: number;
    maxAge: number;
    listeners: CacheListener<V>[];

    constructor(
        maxAge: number = DataCacheManager.defaultMaxAge,
        manager: DataCacheManager = new DataCacheManager(console)
    ) {
        this.maxAge = maxAge;
        this.manager = manager;
        this.manager.register(this);
    }

    addListener(listener: CacheListener<V>) {
        this.listeners = this.listeners || [];
        this.listeners.push(listener);
    }

    get(key: string): V | null | undefined {
        const entry = this._data[key];
        let value: V | null = entry && entry.value;
        if (this.listeners) {
            for (const l of this.listeners) {
                if (l.retrieved) {
                    const v = l.retrieved(key, value);
                    if (v !== undefined) {
                        value = v;
                    }
                }
            }
        }
        return value;
    }

    set(key: string, value: V) {
        this._set(key, value);
        if (this.listeners) {
            for (const l of this.listeners) {
                if (l.added) {
                    l.added(key, value);
                }
            }
        }
    }

    _set(key: string, value: V) {
        const cacheEntry = {
            key,
            value,
            modified: this.manager.getTime(),
        };
        this._data[key] = cacheEntry;
    }

    remove(key: string): V | null | undefined {
        const prev = this._data[key];
        try {
            delete this._data[key];
            return prev && prev.value;
        } finally {
            if (this.listeners) {
                if (prev !== undefined) {
                    for (const l of this.listeners) {
                        if (l.removed) {
                            l.removed(key, prev.value);
                        }
                    }
                }
            }
        }
    }

    get size() {
        return Object.keys(this._data).length;
    }
}
