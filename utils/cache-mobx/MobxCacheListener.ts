// MobxCacheListener.ts
import { DataCache, CacheListener } from '@jdl2/cache';
import { IObservable, action, observable, ObservableMap } from 'mobx';

/**
 * Basic callback when eviction is called on an actively viewed entry
 */
export type EvictionCallback = (key: string) => void;

/**
 * Creates a new CacheListener that prevents actively viewed data from being
 * evicted by the cache and will call back to the listener when eviction is called
 */
export class MobxCacheListener<V> implements CacheListener<V> {
    cache: DataCache<V>;
    @observable _entries = new ObservableMap<string, V>();
    onActiveDataEviction: EvictionCallback;

    constructor(cache: DataCache<V>, onActiveDataEviction: EvictionCallback) {
        this.cache = cache;
        this.onActiveDataEviction = onActiveDataEviction;
        this.cache.addListener(this);
    }

    retrieved(key: string, value: V) {
        return this._entries.get(key); // mobx tracking
    }

    @action
    added(key: string, value: V) {
        this._entries.set(key, value); // mobx updates
    }

    @action
    removed(key: string, value: V) {
        this._entries.delete(key); // mobx, forceful re-render
    }

    @action
    evicted(key: string, value: V) {
        const o = (this._entries as any)._data.get(key) as IObservable;
        if (o && o.isBeingObserved) {
            this.onActiveDataEviction(key);
            return true; // keep the entry
        }
        this._entries.delete(key); // update mobx
        return false;
    }
}
