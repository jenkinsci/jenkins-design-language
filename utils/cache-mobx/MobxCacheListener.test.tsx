import { MobxCacheListener } from './MobxCacheListener';
import {DataCache} from '../cache/DataCache';

describe('MobxCacheListener', () => {
    it('should display', () => {
        const dCache = new DataCache();
        const onEvict = (key: string) => null;
        expect(new MobxCacheListener(dCache, onEvict)).not.toBeNull();
    });
});
