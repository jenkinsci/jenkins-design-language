'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var Enzyme = require('enzyme');
var react_select_1 = require('react-select');
var Selectbox_1 = require('./Selectbox');
describe('Selectbox', function() {
    var options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];
    var dropdown;
    var onChange = jest.fn();
    beforeEach(function() {
        dropdown = Enzyme.shallow(
            <Selectbox_1.Selectbox options={options} value={options[0].value} onChange={onChange} />
        );
    });
    it('should render with options', function() {
        expect(dropdown.find(react_select_1.Creatable)).toHaveLength(1);
        expect(dropdown.find(react_select_1.Creatable).props().options).toBe(options);
        expect(dropdown.find(react_select_1.Creatable).props().value).toBe(options[0].value);
        expect(dropdown.state().selectedOption).toEqual(options[0].value);
    });
    it('should be able to change selected value', function() {
        dropdown.simulate('change', options[1]);
        expect(onChange).toBeCalledWith(options[1]);
        expect(dropdown.find(react_select_1.Creatable).props().value).toBe(options[1].value);
        expect(dropdown.state().selectedOption).toEqual(options[1].value);
    });
});
