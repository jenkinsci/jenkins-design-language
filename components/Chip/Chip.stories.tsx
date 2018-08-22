import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Chip } from './Chip';

storiesOf('Chip', module).add('should display', () => {
    return <Chip />;
});
