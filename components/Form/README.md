# Form

### Example

```jsx
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
    <Form.Checkbox>
        {{
            name: 'employee1',
            description: 'are you a CloudBees Employee?',
            value: 'Employee',
        }}
    </Form.Checkbox>
    ...
</Form>
```

##### Properties of form parts:

```
.Input {
    label?: string;
    name?: string;
    placeholder?: string;
    htmlFor?: string;
}

.Checkbox {
    name?: string;
    value?: string;
    description?: React.ReactNode | string;
}
```
