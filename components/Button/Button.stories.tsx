import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';
import './Button.scss';

const withTests = require('@storybook/addon-jest').withTests;
const results = require('./.jest-test-results.json');
const stories = storiesOf('Button', module);

stories
    .addDecorator(withTests({ results })('Button.test.tsx'))
    .add('should display text', () => {
        const story = <Button>some-text</Button>;
        return story;
    });

