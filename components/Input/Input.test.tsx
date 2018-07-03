import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Input } from './Input';

describe('Input: ', () => {
    it('should display correct input', () => {
        const input = Enzyme.mount(<Input onChange={e => console.log(e)} />);
        input.simulate('change', { target: { value: 'changed value.' } });
        expect(input.length).toBe(1);
    });

    it('should display an input without onchange set', () => {
        const input = Enzyme.mount(<Input />);
        input.simulate('change', { target: { value: 'changed value.' } });
        expect(input.length).toBe(1);
    });
});
