/**
 * Array instance, containing additional information about fetch status
 */
export class FetchResult<V> implements Array<V> {
    isError: boolean = false;
    isPending: boolean = false;
    data: V[] = [];

    constructor(data?: V[]) {
        if (data) {
            this.data = data;
        } else {
            this.isPending = true;
        }
    }

    get length() {
        return this.data && this.data.length;
    }

    [n: number]: V;

    [Symbol.iterator](): IterableIterator<V> {
        return this.data[Symbol.iterator]();
    }

    [Symbol.unscopables](): {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    } {
        return this.data[Symbol.unscopables]();
    }

    concat(...items: ConcatArray<V>[]): V[];
    concat(...items: (ConcatArray<V> | V)[]): V[];
    concat(...items: (ConcatArray<V> | V)[]): V[] {
        return this.data.concat(...items);
    }

    copyWithin(target: number, start: number, end?: number): this {
        this.data.copyWithin(target, start, end);
        return this;
    }

    entries(): IterableIterator<[number, V]> {
        return this.data.entries();
    }

    // tslint:disable-next-line
    every(callbackfn: (value: V, index: number, array: V[]) => boolean, thisArg?: any): boolean {
        return this.data.every(callbackfn, thisArg);
    }

    fill(value: V, start?: number, end?: number): this {
        this.data.fill(value, start, end);
        return this;
    }

    // tslint:disable-next-line
    filter<S extends V>(callbackfn: (value: V, index: number, array: V[]) => value is S, thisArg?: any): S[];
    // tslint:disable-next-line
    filter(callbackfn: (value: V, index: number, array: V[]) => any, thisArg?: any): V[];
    // tslint:disable-next-line
    filter(callbackfn: any, thisArg?: any): any {
        return this.data.filter(callbackfn, thisArg);
    }

    // tslint:disable-next-line
    find<S extends V>(predicate: (value: V, index: number, obj: V[]) => value is S, thisArg?: any): S | undefined;
    // tslint:disable-next-line
    find(predicate: (value: V, index: number, obj: V[]) => boolean, thisArg?: any): V | undefined;
    // tslint:disable-next-line
    find(predicate: any, thisArg?: any): any {
        return this.data.find(predicate, thisArg);
    }

    // tslint:disable-next-line
    findIndex(predicate: (value: V, index: number, obj: V[]) => boolean, thisArg?: any): number {
        return this.data.findIndex(predicate, thisArg);
    }

    // tslint:disable-next-line
    forEach(callbackfn: (value: V, index: number, array: V[]) => void, thisArg?: any): void {
        this.data.forEach(callbackfn, thisArg);
    }

    indexOf(searchElement: V, fromIndex?: number): number {
        return this.data.indexOf(searchElement, fromIndex);
    }

    join(separator?: string): string {
        return this.data.join(separator);
    }

    keys(): IterableIterator<number> {
        return this.data.keys();
    }

    lastIndexOf(searchElement: V, fromIndex?: number): number {
        return this.data.lastIndexOf(searchElement, fromIndex);
    }

    // tslint:disable-next-line
    map<U>(callbackfn: (value: V, index: number, array: V[]) => U, thisArg?: any): U[] {
        return this.data.map(callbackfn, thisArg);
    }

    pop(): V | undefined {
        return this.data.pop();
    }

    push(...items: V[]): number {
        return this.data.push(...items);
    }

    reduce(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V;
    reduce(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V, initialValue: V): V;
    reduce<U>(
        callbackfn: (previousValue: U, currentValue: V, currentIndex: number, array: V[]) => U,
        initialValue: U
    ): U;
    // tslint:disable-next-line
    reduce(callbackfn: any, initialValue?: any): any {
        return this.data.reduce(callbackfn, initialValue);
    }

    reduceRight(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V;
    reduceRight(
        callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V,
        initialValue: V
    ): V;
    reduceRight<U>(
        callbackfn: (previousValue: U, currentValue: V, currentIndex: number, array: V[]) => U,
        initialValue: U
    ): U;
    // tslint:disable-next-line
    reduceRight(callbackfn: any, initialValue?: any): any {
        return this.data.reduceRight(callbackfn, initialValue);
    }

    reverse(): V[] {
        return this.data.reverse();
    }

    shift(): V | undefined {
        return this.data.shift();
    }

    slice(start?: number, end?: number): V[] {
        return this.data.slice(start, end);
    }

    // tslint:disable-next-line
    some(callbackfn: (value: V, index: number, array: V[]) => boolean, thisArg?: any): boolean {
        return this.data.some(callbackfn, thisArg);
    }

    sort(compareFn?: (a: V, b: V) => number): this {
        this.data.sort(compareFn);
        return this;
    }

    splice(start: number, deleteCount?: number): V[];
    splice(start: number, deleteCount: number, ...items: V[]): V[];
    splice(start: number, deleteCount?: number, ...items: V[]): V[] {
        if (items && deleteCount) {
            return this.data.splice(start, deleteCount, ...items);
        }
        if (deleteCount) {
            return this.data.splice(start, deleteCount);
        }
        return this.data.splice(start);
    }

    unshift(...items: V[]): number {
        return this.data.unshift(...items);
    }

    values(): IterableIterator<V> {
        return this.data.values();
    }
}
