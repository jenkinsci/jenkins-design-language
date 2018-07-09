import { ElementSet } from './ElementSet';

export interface ElementSetManip {
    get: {
        attr(name: string): string;
        width(): number;
        height(): number;
    };
    add: {
        c(name: string): ElementSet;
    };
    set: {
        attr(name: string, value: string): ElementSet;
    };
    rm: {
        c(name: string): ElementSet;
        attr(name: string): ElementSet;
    };
}

declare module './ElementSet' {
    interface ElementSet {
        get: {
            attr(name: string): string;
            width(): number;
            height(): number;
        };
        add: {
            c(name: string): ElementSet;
        };
        set: {
            attr(name: string, value: string): ElementSet;
        };
        rm: {
            c(name: string): ElementSet;
            attr(name: string): ElementSet;
        };
    }
}

Object.defineProperties(ElementSet.prototype, {
    get: {
        get() {
            const s: ElementSet = this as any;
            return {
                attr(name: string) {
                    const n = s.first;
                    return n && n.getAttribute(name);
                },
                width() {
                    return s.width();
                },
                height() {
                    return s.height();
                },
            };
        },
    },
    add: {
        get() {
            const s: ElementSet = this as any;
            return {
                c(name: string) {
                    s.each(e => {
                        e.classList.add(name);
                    });
                    return s;
                },
            };
        },
    },
    rm: {
        get() {
            const s: ElementSet = this as any;
            return {
                c(name: string) {
                    s.each(e => {
                        e.classList.remove(name);
                    });
                    return s;
                },
                attr(name: string) {
                    s.each(e => {
                        e.removeAttribute(name);
                    });
                    return s;
                },
            };
        },
    },
    set: {
        get() {
            const s: ElementSet = this as any;
            return {
                attr(name: string, v: string) {
                    s.each(e => {
                        e.setAttribute(name, v);
                    });
                    return s;
                },
            };
        },
    },
});
