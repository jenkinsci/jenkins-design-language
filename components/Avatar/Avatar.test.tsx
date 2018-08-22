import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Avatar } from './Avatar';

describe('Avatar: ', () => {
    it('should display', () => {
        const comp = Enzyme.mount(<Avatar />);
        comp.simulate('click');
        expect(comp.html()).toBeTruthy();
    });
});
