import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Form } from './Form';

export const theUser = {
    zip: '27529',
    firstName: 'Donald',
    _lastName: 'Trump',
    get lastName() {
        return this._lastName;
    },
    set lastName(v: string) {
        this._lastName = v;
    },
};

describe('Form', () => {
    it('should render an input', () => {
        const rendered = Enzyme.render(
            <Form.Vertical>
                <Form.Item label="First Name">
                    <Form.InputText
                        placeholder="Enter your first name"
                        value={theUser.firstName}
                        validation={['required']}
                        onChange={v => (theUser.firstName = v)}
                    />
                </Form.Item>
            </Form.Vertical>
        );
        const input = rendered.find('input');
        const value = input.attr('value');
        expect(value).toBe(theUser.firstName);
    });
});
