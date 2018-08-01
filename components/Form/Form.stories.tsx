import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Form } from './Form';

storiesOf('Form', module).add('should display text', () => {
    const theUser = {
        firstName: 'Donald',
        _lastName: 'Trump',
        get lastName() {
            return this._lastName;
        },
        set lastName(v: string) {
            this._lastName = v;
        },
    };
    return (
        <>
            <Form.Vertical>
                <Form.Item label="First Name">
                    <Form.InputText
                        placeholder="Enter your first name"
                        value={theUser.firstName}
                        onChange={v => (theUser.firstName = v)}
                    />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    notifications={[{ type: 'Error', message: 'This was incorrect' }]}
                >
                    <Form.InputText
                        placeholder="Enter your first name"
                        value={theUser.lastName}
                        onChange={v => (theUser.lastName = v)}
                    />
                </Form.Item>
                <Form.Item label="Application">
                    <Form.Checkbox description="are you a CloudBees employee" />
                </Form.Item>
            </Form.Vertical>
        </>
    );
});
