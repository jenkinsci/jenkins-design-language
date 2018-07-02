import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';

storiesOf('Input', module)
.add('should display an input', () => {
    return <Input onChange={() => console.log('')} />;
});
