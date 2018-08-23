import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Form } from './Form';
import { theUser } from './Form.test';

storiesOf('Form', module).add('should display text', () => {
    return (
        <>
            <Form.Vertical>
                <Form.Item label="First Name">
                    <Form.InputText
                        placeholder="Enter your first name"
                        value={theUser.firstName}
                        validation={['required']}
                        onChange={v => (theUser.firstName = v)}
                    />
                </Form.Item>
                <Form.Item label="Last Name">
                    <Form.InputText
                        placeholder="Enter your first name"
                        value={theUser.lastName}
                        validation={['email']}
                        onChange={v => (theUser.lastName = v)}
                    />
                </Form.Item>
                <Form.Item label="Zipcode">
                    <Form.InputText
                        placeholder="Enter your zipcode"
                        value={theUser.zip}
                        validation={['required', 'numeric']}
                        onChange={v => (theUser.zip = v)}
                    />
                </Form.Item>
                <Form.Item label="Application">
                    <Form.Checkbox name="application" description="are you a CloudBees employee" />
                </Form.Item>
                <Form.Item label="T&C">
                    <Form.Checkbox name="terms" description="do you agree to the terms?" />
                </Form.Item>
                <Form.Submit>Submit Form.</Form.Submit>
            </Form.Vertical>
        </>
    );
});
