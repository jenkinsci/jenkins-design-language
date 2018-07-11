import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ClickListener } from './ClickListener';

storiesOf('ClickListener', module).add('should display an input', () => {
    return <ClickListener />;
});
