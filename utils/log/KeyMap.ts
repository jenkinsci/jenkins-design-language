// tslint:disable-next-line
function getKey(thing: any) {
    return thing.id || thing.name || thing.displayName || thing;
}

type KeyFn = typeof getKey;

export class KeyMap<K, V> {
    private _data = {};
    private _keyFn: KeyFn;

    constructor(keyFn: KeyFn = getKey) {
        this._keyFn = keyFn;
    }

    put(key: K, value: V) {
        this._data[this._keyFn(key)] = value;
    }

    get(key: K) {
        return this._data[this._keyFn(key)];
    }

    getOrCreate(key: K, provider: () => V) {
        return this._data[this._keyFn(key)] || (this._data[this._keyFn(key)] = provider());
    }

    containsKey(key: K) {
        return this.get(key);
    }

    size() {
        return Object.keys(this._data).length;
    }
}
