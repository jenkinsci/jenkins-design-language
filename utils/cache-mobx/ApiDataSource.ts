import { Logger } from '@ldj2/log';
import { DataCache } from '@jdl2/cache';
import {FetchResult} from './FetchResult';
const { DeDupeCallTracker } = require('@jenkins-cd/blueocean-core-js/dist/js/utils/dedupe-calls');

export { Api, url } from './Api';
export * from '../generics';

interface KeyType {
    toString(): string;
}

interface ResourceConstructor<T> {
    new (data: T): T;
}

export abstract class ApiDataSource<K extends KeyType, V> {
    @inject(Logger) log: Logger;
    @inject(Api) api: Api;
    @inject(DataCache) cache: DataCache<FetchResult<V>>;

    tracker = new DeDupeCallTracker();
    keys = {};
    type: ResourceConstructor<V>;

    constructor(type: ResourceConstructor<V>) {
        this.type = type;
    }

    @postConstruct
    init() {
    }

    setValues(k: K, values: V[]) {
        values = values ? values.map(v => this.mapItem(k, v)) : [];
        const key = this.getKey(k);
        this.keys[key] = k;
        this.cache.set(key, new FetchResult<V>(values));
    }

    mapItem(k: K, v: V): V {
        return new this.type(v);
    }

    getKey(k: K) {
        return k && k.toString();
    }

    get(k: K): FetchResult<V> {
        const v = this.cache.get(this.getKey(k));
        if (v === undefined) {
            // nothing in cache
            this.loadData(k);
        }
        return v || new FetchResult<V>();
    }

    loadData(k: K) {
        this.tracker.dedupe(k.toString(), () => {
            const url = this.getDataUrl(k);
            this.log.info('loadData', url);
            return this.api.get(url).then(v => this._postLoadData(k, v));
        });
    }

    // tslint:disable-next-line
    _postLoadData(k: K, v: any) {
        this.log.debug('_postLoadData', k, v);
        // if we get an object lets wrap it in an array
        if (!Array.isArray(v) && v) {
            v = [v];
        }
        this.setValues(k, v);
    }

    abstract getDataUrl(k: K): string;
}
