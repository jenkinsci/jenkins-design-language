import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar } from './Avatar';

storiesOf('Avatar', module).add('should display', () => {
    return <Avatar />;
});
