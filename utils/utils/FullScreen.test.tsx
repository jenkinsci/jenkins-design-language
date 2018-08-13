import * as React from 'react';
import {FullScreen} from './FullScreen';
import {mount} from 'enzyme';

describe('Component', () => {
    it('should ...', () => {
        const fs = mount(
            <FullScreen>
                Something Fullscreen
            </FullScreen>
        );
        expect(fs.text()).toBe("Something Fullscreen");
    });
});
