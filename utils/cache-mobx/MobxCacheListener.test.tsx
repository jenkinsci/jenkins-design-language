import * as React from 'react';
import { observer } from 'mobx-react';
import { MobxCacheListener } from './MobxCacheListener';
import { DataCache, DataCacheManager } from '../cache/DataCache';
import * as Enzyme from 'enzyme';

class ExplicitTimeManager extends DataCacheManager {
    time = 0;
    startEvictionThread() {
        // do nothing
    }
    getTime() {
        return this.time;
    }
}

class User {
    id: string;
    name: string;
}

interface UserComponentProps {
    cache: DataCache<User>;
    id: string;
    rendered: () => void;
}

@observer
class UserComponent extends React.Component<UserComponentProps> {
    render() {
        const { cache, id, rendered } = this.props;
        rendered();
        const u = cache.get(id);
        return <div>{u && u.name}</div>;
    }
}

describe('MobxCacheListener', () => {
    // beforeEach(() => {
    //     mobx.extras.resetGlobalState();
    // });
    it('should display', () => {
        let renderCount = 0;
        let evictCount = 0;

        const manager = new ExplicitTimeManager();
        manager.time = 0;
        const cache = new DataCache<User>(1, manager);

        new MobxCacheListener(cache, () => evictCount++);

        const usr1 = {
            id: '1',
            name: 'User 1',
        };
        const usr2 = {
            id: '2',
            name: 'User 2',
        };

        const uc1 = <UserComponent cache={cache} id={usr1.id} rendered={() => renderCount++} />;
        const uc1m = Enzyme.mount(uc1);

        expect(uc1m.text()).toBe('');
        expect(renderCount).toBe(1);

        cache.set(usr1.id, usr1);
        expect(uc1m.text()).toBe('User 1');
        expect(renderCount).toBe(2);

        // should not be updated
        usr1.name = 'User 1 Updated';
        expect(uc1m.text()).toBe('User 1');
        expect(renderCount).toBe(2);

        // should be updated
        cache.set(usr1.id, usr1);
        expect(uc1m.text()).toBe('User 1 Updated');
        expect(renderCount).toBe(3);

        expect(evictCount).toBe(0);

        usr1.name = 'User 1';
        cache.set(usr1.id, usr1);

        manager.time = 1;
        manager.runCacheEviction();

        expect(evictCount).toBe(1);

        expect(renderCount).toBe(4);

        // should be persisted

        expect(cache.get(usr1.id)).toBeTruthy();
        expect(cache.get(usr1.id).name).toBe('User 1');
        expect(uc1m.text()).toBe('User 1');

        expect(renderCount).toBe(4);

        uc1m.unmount();

        manager.time = 2;
        manager.runCacheEviction();

        // was unmounted, eviction just removes it
        expect(evictCount).toBe(1);

        // should be removed

        expect(cache.get(usr1.id)).toBeUndefined();

        manager.time = 3;
        manager.runCacheEviction();

        uc1m.mount();

        // should be removed, still
        expect(uc1m.text()).toBe('');

        cache.set(usr1.id, usr1);

        manager.time = 4;
        manager.runCacheEviction();

        expect(evictCount).toBe(2);

        cache.remove(usr1.id);

        expect(evictCount).toBe(2);

        expect(uc1m.text()).toBe('');
    });
});
