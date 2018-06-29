import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';

const stories = storiesOf('Button', module);
const buttonTestFile = 'Button.test.tsx';

const specs = require('../../.storybook/facade').specs;

stories.add('should display text', () => {
    const story = <Button>some-text</Button>;
    specs(() => require(buttonTestFile).default);
    return story;
});
