import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Selectbox } from './Selectbox';

const options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];

storiesOf('Selectbox', module)
    .add('should display a selectbox', () => {
        return <Selectbox options={options} value={options[0].value} />;
    })
    .add('should alert on change', () => {
        const handleChange = (e: HTMLInputElement) => alert('changed to value: ' + e.value);
        return <Selectbox options={options} value={options[0].value} onChange={handleChange} />;
    });
