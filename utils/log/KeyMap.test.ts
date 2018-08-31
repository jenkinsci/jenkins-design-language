import {KeyMap} from './KeyMap';

class KeyValType {
    id: number;
    val: string;

    constructor(id: number, val: string) {
        this.id = id;
        this.val = val;
    }
}

describe('KeyMap', () => {
    it('works with keyFn', () => {
        const kv1 = new KeyValType(1, 'one');

        const km = new KeyMap<KeyValType, KeyValType>(k => k.id);
        km.put(kv1, kv1);

        expect(km.size()).toBe(1);

        const kv1found = km.get(kv1);
        expect(kv1found).toBe(kv1);

        expect(km.containsKey(kv1)).toBeTruthy();

        const kv2 = new KeyValType(2, 'two');

        expect(km.containsKey(kv2)).toBeFalsy();

        const kv2getCreate = km.getOrCreate(kv2, () => kv2);

        expect(km.size()).toBe(2);

        expect(kv2getCreate.id).toBe(kv2.id);

        const kv0 = new KeyValType(0, 'zero');

        expect(km.containsKey(kv0)).toBeFalsy();
    });

    it('works with default keyFn', () => {
        const kv1 = new KeyValType(1, 'one');

        const km = new KeyMap<KeyValType, KeyValType>();
        km.put(kv1, kv1);

        expect(km.size()).toBe(1);

        const kv1found = km.get(kv1);
        expect(kv1found).toBe(kv1);

        expect(km.containsKey(kv1)).toBeTruthy();

        const kv2 = new KeyValType(2, 'two');

        expect(km.containsKey(kv2)).toBeFalsy();

        const kv2getCreate = km.getOrCreate(kv2, () => kv2);

        expect(km.size()).toBe(2);

        expect(kv2getCreate.id).toBe(kv2.id);

        const kv0 = new KeyValType(0, 'zero');

        expect(km.containsKey(kv0)).toBeFalsy();
    });
});
