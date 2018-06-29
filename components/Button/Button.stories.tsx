import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';

declare var specs: any;

const stories = storiesOf('Button', module);

stories.add('should display text', () => {
    const story = <Button>some-text</Button>;
    specs(() => require('./Button.test.tsx') && 'Button');
    return story;
});
