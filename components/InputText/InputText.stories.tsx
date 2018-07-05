import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { InputText } from './InputText';

storiesOf('InputText', module).add('should display an input', () => {
    return <InputText />;
});
