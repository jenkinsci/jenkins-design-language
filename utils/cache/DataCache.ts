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
    retrieved?: (k: string, v: V | null) => void;
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
        let evictCount = 0;
        for (let cacheIdx = 0; cacheIdx < this.caches.length; cacheIdx++) {
            const cache = this.caches[cacheIdx];
            if (now - cache.lastEviction < cache.maxAge) {
                continue;
            }
            cache.lastEviction = now;
            for (let i = 0; i < cache._entryList.length; i++) {
                const val = cache._entryList[i];
                if (val && now - val.modified >= cache.maxAge) {
                    evictCount++;
                    cache._entryList.splice(i, 1);
                    // cache._entries.delete(val.key);
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

        this.log.info('Eviction completed in', this.getTime() - now, 'ms, for', evictCount, 'items');
    }
}

export class DataCache<V> {
    manager: DataCacheManager;

    _entryIndexes: { [key: string]: number } = {};
    _entryList: CacheEntry<V>[] = [];
    lastEviction: number;
    maxAge: number;
    listeners: CacheListener<V>[];

    constructor(maxAge: number = DataCacheManager.defaultMaxAge, manager: DataCacheManager = new DataCacheManager(console)) {
        this.maxAge = maxAge;
        this.manager = manager;
        this.manager.register(this);
    }

    addListener(listener: CacheListener<V>) {
        this.listeners = this.listeners || [];
        this.listeners.push(listener);
    }

    get(key: string): V | null | undefined {
        const entry = this._entryList[this._entryIndexes[key]];
        const value = entry && entry.value;
        if (this.listeners) {
            for (const l of this.listeners) {
                if (l.retrieved) {
                    l.retrieved(key, value);
                }
            }
        }
        return value;
    }

    // @action
    set(key: string, value: V) {
        const cacheEntry = {
            key,
            value,
            modified: this.manager.getTime(),
        };
        const idx = this._entryList.push(cacheEntry);
        this._entryIndexes[key] = idx;
        if (this.listeners) {
            for (const l of this.listeners) {
                if (l.added) {
                    l.added(key, value);
                }
            }
        }
    }

    remove(key: string): V | null | undefined {
        const idx = this._entryIndexes[key];
        const prev = this._entryList[idx];
        try {
            this._entryList.splice(idx, 1); // TODO immutable?
            delete this._entryIndexes[key];
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
        return this._entryList.length;
    }
}
