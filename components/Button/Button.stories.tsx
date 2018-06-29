import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';

const stories = storiesOf('Button', module);

const specs = require('../../.storybook/facade').specs;

stories.add('should display text', () => {
    const story = <Button>some-text</Button>;
    specs(() => require('./Button.test.tsx').default);
    return story;
});
