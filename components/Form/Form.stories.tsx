import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Form } from './Form';

storiesOf('Form', module).add('should display text', () => {
    return (
        <>
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
                <Form.Input>
                    {{
                        label: 'Last Name:',
                        name: 'last-name',
                    }}
                </Form.Input>
            </Form>
        </>
    );
});
