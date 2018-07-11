import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Toast } from './Toast';

storiesOf('Toast', module).add('should display text', () => {
    return <Toast />;
});
