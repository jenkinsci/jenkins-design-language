import { MobxCacheListener } from './MobxCacheListener';

describe('cache-mobx: ', () => {
    it('should display', () => {
        expect(new MobxCacheListener()).not.toBeNull();
    });
});
