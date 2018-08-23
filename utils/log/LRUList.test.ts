import { LRUList } from './LRUList';

describe('LRUList', () => {
    it('maintains only LRU elements', () => {
        const queue = new LRUList<string>(3);

        queue.add('zero');
        queue.add('one');
        queue.add('two');

        expect(queue.items.length).toBe(3);
        expect(queue.items[2]).toBe('two');

        queue.add('three');

        expect(queue.items.length).toBe(3);
        expect(queue.items[2]).toBe('three');

        expect(queue.top).toBe('three');

        queue.clear();

        expect(queue.items.length).toBe(0);
        expect(queue.top).toBeFalsy();
    });

    it('maintains only LRU elements', () => {
        const queue = new LRUList<string>();

        queue.add('zero');
        queue.add('one');
        queue.add('two');

        expect(queue.items.length).toBe(3);
        expect(queue.items[2]).toBe('two');

        queue.add('three');

        expect(queue.items.length).toBe(4);
    });
});
