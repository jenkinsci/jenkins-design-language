import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Creatable } from 'react-select';
import { Selectbox, SelectboxProps, SelectboxState } from './Selectbox';

describe('Selectbox', () => {
    const options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];
    let selectbox: Enzyme.ShallowWrapper<SelectboxProps, SelectboxState>;
    const onChange = jest.fn();

    beforeEach(() => {
        selectbox = Enzyme.shallow(
            <Selectbox options={options} value={options[0].value} onChange={onChange} />
        );
    });

    it('should render with options', () => {
        expect(selectbox.find(Creatable)).toHaveLength(1);
        expect(selectbox.find(Creatable).props().options).toBe(options);
        expect(selectbox.find(Creatable).props().value).toBe(options[0].value);
        expect(selectbox.state().selectedOption).toEqual(options[0].value);
    });

    it('should be able to change selected value', () => {
        selectbox.simulate('change', options[1]);

        expect(onChange).toBeCalledWith(options[1]);
        expect(selectbox.find(Creatable).props().value).toBe(options[1].value);
        expect(selectbox.state().selectedOption).toEqual(options[1].value);
    });
});
