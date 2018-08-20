import * as React from 'react';
import * as Enzyme from 'enzyme';
import { [componentName] } from './[componentName]';

describe('[componentName]: ', () => {
    it('should display', () => {
        const comp = Enzyme.mount(<[componentName] />);
        comp.simulate('click');
        expect(comp.html()).toBeTruthy();
    });
});
