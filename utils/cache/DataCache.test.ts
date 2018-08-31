import { DataCache, DataCacheManager } from './DataCache';
// import { Injector, singleton } from '@jdl2/ioc';
// import { ProductionLogger } from '@jdl2/log';


class IncrementingTimeManager extends DataCacheManager {
    time = 0;
    startEvictionThread() {
        // do nothing
    }
    getTime() {
        return this.time++;
    }
}

it('eviction works', () => {
    const manager = new IncrementingTimeManager({ info: () => null });
    const cache = new DataCache(1, manager);

    expect(cache.size).toBe(0);

    cache.maxAge = 1;

    cache.set('thing1', 'thing1');

    expect(cache.size).toBe(1);

    manager.runCacheEviction();

    expect(cache.size).toBe(0);

    cache.maxAge = 20;

    cache.set('thing1', 'thing1');

    expect(cache.size).toBe(1);

    manager.runCacheEviction();

    expect(cache.size).toBe(1);
});
