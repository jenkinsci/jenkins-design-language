/**
 * An LRU queue that only maintains a set number of elements,
 * the last recently used
 */
export class LRUList<T> {
    private queue: T[] = [];
    private max: number;

    constructor(size: number = 1000) {
        this.max = size;
    }

    add(item: T) {
        const { queue, max } = this;
        queue.push(item);
        if (queue.length > max) {
            this.queue = queue.splice(queue.length - max);
        }
    }

    clear() {
        this.queue.length = 0;
    }

    get top() {
        return this.queue[this.queue.length - 1];
    }

    get items() {
        return [...this.queue];
    }
}
