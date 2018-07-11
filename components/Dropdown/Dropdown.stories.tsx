import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Dropdown } from './Dropdown';

const options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];

storiesOf('Dropdown', module)
    .add('should display a dropdown', () => {
        return <Dropdown options={options} value={options[0].value} />;
    })
    .add('should alert on change', () => {
        const handleChange = (e: HTMLInputElement) => alert('changed to value: ' + e.value);
        return <Dropdown options={options} value={options[0].value} onChange={handleChange} />;
    });
