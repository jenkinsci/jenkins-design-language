import * as React from 'react';
import * as Enzyme from 'enzyme';
import { InputText } from './InputText';

describe('InputText: ', () => {
    it('should display correct input', () => {
        const inputText = Enzyme.mount(<InputText onChange={e => console.log(e)} />);
        inputText.simulate('change', { target: { value: 'changed value.' } });
        expect(inputText.length).toBe(1);
    });

    it('should display an input without onchange set', () => {
        const inputText = Enzyme.mount(<InputText />);
        inputText.simulate('change', { target: { value: 'changed value.' } });
        expect(inputText.length).toBe(1);
    });
});
