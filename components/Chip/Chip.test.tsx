import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Chip } from './Chip';

describe('Chip: ', () => {
    it('should display', () => {
        const comp = Enzyme.mount(<Chip />);
        comp.simulate('click');
        expect(comp.html()).toBeTruthy();
    });
});
