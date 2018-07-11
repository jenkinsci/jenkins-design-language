import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Dropdown } from './Dropdown';

const stories = storiesOf('Dropdown', module);

stories.add('should display a dropdown', () => {
    let options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];
    // let dropdown: ShallowWrapper<DropdownProps, DropdownState>;
    let onChange = () => console.log('drop down..');
    return <Dropdown options={options} value={options[0].value} onChange={onChange} />;
});
