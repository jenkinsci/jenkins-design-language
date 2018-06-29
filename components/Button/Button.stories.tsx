import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';

const withTests = require('@storybook/addon-jest').withTests;
const results = require('./.jest-test-results.json');
const stories = storiesOf('Button', module);
const buttonTestFile = 'Button.test.tsx';

stories
    .addDecorator(withTests({ results })(buttonTestFile))
    .add('should display text', () => {
        const story = <Button>some-text</Button>;
        return story;
    });
