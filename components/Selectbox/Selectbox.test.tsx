import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Creatable } from 'react-select';
import { Selectbox, DropdownProps, DropdownState } from './Selectbox';

describe('Selectbox', () => {
    let options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];
    let dropdown: Enzyme.ShallowWrapper<DropdownProps, DropdownState>;
    let onChange = jest.fn();

    beforeEach(() => {
        dropdown = Enzyme.shallow(
            <Selectbox options={options} value={options[0].value} onChange={onChange} />
        );
    });

    it('should render with options', () => {
        expect(dropdown.find(Creatable)).toHaveLength(1);
        expect(dropdown.find(Creatable).props().options).toBe(options);
        expect(dropdown.find(Creatable).props().value).toBe(options[0].value);
        expect(dropdown.state().selectedOption).toEqual(options[0].value);
    });

    it('should be able to change selected value', () => {
        dropdown.simulate('change', options[1]);

        expect(onChange).toBeCalledWith(options[1]);
        expect(dropdown.find(Creatable).props().value).toBe(options[1].value);
        expect(dropdown.state().selectedOption).toEqual(options[1].value);
    });
});
