import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Form } from './Form';

describe('Form', () => {
    it('should render an input', () => {
        const rendered = Enzyme.render(
            <Form>
                <Form.Input>
                    {{
                        label: 'First Name',
                        name: 'first-name',
                        placeholder: 'Enter a first name',
                        htmlFor: 'first-name',
                    }}
                </Form.Input>
            </Form>
        );
        const label = rendered.find('label');
        const input = rendered.find('input');
        expect(label.text()).toBe('First Name');
        const name = input.attr('name');
        expect(name).toBe('first-name');
    });

    it('should throw error when rendering form', () => {
        expect(() => Enzyme.render(<Form />)).toThrowError();
    });
});
