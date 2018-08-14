import * as React from 'react';
import {mount} from 'enzyme';
import {CenterInContainer} from './CenterInContainer';

describe('Component', () => {
    it('should ...', () => {
        const fs = mount(
            <CenterInContainer>
                Something Centered
            </CenterInContainer>
        );
        expect(fs.text()).toBe("Something Centered");
    });
});
