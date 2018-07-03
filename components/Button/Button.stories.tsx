import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';

storiesOf('Button', module).add('should display text', () => {
    return <Button>some-text</Button>;
});
