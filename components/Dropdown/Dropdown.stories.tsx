import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Dropdown } from './Dropdown';

const stories = storiesOf('Dropdown', module);

stories.add('should display a dropdown', () => {
    let options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];
    return <Dropdown options={options} value={options[0].value} />;
});
