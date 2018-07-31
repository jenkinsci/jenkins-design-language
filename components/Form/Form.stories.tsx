import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {Form} from './Form';

storiesOf('Form', module).add('should display text', () => {
    const theUser = {
        firstName: 'Donald',
        _lastName: 'Trump',
        get lastName() {
            return this._lastName;
        },
        set lastName(v: string) {
            this._lastName = v;
        }
    };
    return (
        <>
            <Form.Vertical>
                <Form.Item label="First Name">
                    <Form.InputText placeholder="Enter your first name" value={theUser.firstName} onChange={v => theUser.firstName = v} />
                </Form.Item>
                <Form.Item label="Last Name" notifications={[{ type: 'Error', message: 'This was incorrect'}]}>
                    <Form.InputText placeholder="Enter your first name" value={theUser.lastName} onChange={v => theUser.lastName = v} />
                </Form.Item>
            </Form.Vertical>
            <Form>
                <Form.Header>CloudBees Form</Form.Header>
                <Form.Input>
                    {{
                        label: 'First Name:',
                        name: 'first-name',
                        placeholder: 'Enter your first name:',
                        htmlFor: 'first-name',
                    }}
                </Form.Input>
                <Form.Input>{{ label: 'Last Name:', name: 'last-name' }}</Form.Input>
                <Form.Checkbox>
                    {{
                        name: 'employee1',
                        description: 'are you a CloudBees Employee?',
                        value: 'Employee',
                    }}
                </Form.Checkbox>
                <Form.Checkbox>
                    {{
                        name: 'terms',
                        description: 'do you agree to the terms?',
                        value: 'Terms',
                    }}
                </Form.Checkbox>
                <Form.Input>
                    {{ label: 'Description:', name: 'describe', placeholder: 'Description:' }}
                </Form.Input>
            </Form>
        </>
    );
});
