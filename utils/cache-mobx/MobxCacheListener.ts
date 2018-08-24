// MobxCacheListener.ts
import { intercept, IObservable, action, observable, ObservableMap } from 'mobx';

import {CacheListener} from '@jdl2/cache';

export class MobxCacheListener<V> implements CacheListener<V> {
    @observable _entries = new ObservableMap<string, V>();

    constructor() {
        intercept(this._entries, change => {
            if (change.type === 'delete') {
                // skip cache deletes, as this will invalidate the react component tree
                // instead initiate a re-fetch

                // try to find out if there are observers
                const observable = change.object;
                // tslint:disable-next-line
                const o = (observable as any)._data[change.name] as IObservable;
                if (o.observers && o.observers.size) {
                    // mark the entry as pending deletion
                    const key = this.keys[change.name];
                    if (key !== undefined) {
                        this.loadData(key);
                    }
                    const entryIdx = this.cache._entryIndexes[change.name];
                    const entry = this.cache._entryList[entryIdx];
                    if (entry) {
                        // let this cache entry live during the fetch
                        entry.modified += this.cache.maxAge;
                    }
                    // stop the reaction
                    return null;
                }
            }

            // If the change
            return change;
        });

    }

    retrieved(key: string, value: V) {
        return this._entries.get(key); // mobx tracking
    }

    added(key: string, value: V) {
        this._entries.set(key, value); // mobx updates
    }

    @action
    removed(key: string, value: V) {
        this._entries.delete(key); // trigger mobx updates
    }

    evicted(key: string, value: V) {
    }
}
