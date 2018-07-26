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
        expect(rendered.find('label').text()).toBe('First Name');
    });
});
