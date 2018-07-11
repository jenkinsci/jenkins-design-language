import * as React from 'react';
import * as Enzyme from 'enzyme';
import { InputText } from './InputText';

describe('InputText: ', () => {
    it('should display correct input', () => {
        let changedValue = false;
        const inputText = Enzyme.mount(<InputText onChange={e => { changedValue = true }} />);
        inputText.simulate('change', { target: { value: 'changed value.' } });
        expect(inputText.length).toBe(1);
        expect(changedValue).toBeTruthy();
    });

    it('should display an input without onchange set', () => {
        const inputText = Enzyme.mount(<InputText />);
        inputText.simulate('change', { target: { value: 'changed value.' } });
        expect(inputText.length).toBe(1);
    });
});
