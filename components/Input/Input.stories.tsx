import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from './Input';
import './Input.scss';

const withTests = require('@storybook/addon-jest').withTests;
const results = require('./.jest-test-results.json');
const stories = storiesOf('Input', module);
const iconTestFile = 'Input.test.tsx';

stories
    .addDecorator(withTests({ results })(iconTestFile))
    .add('should display an input', () => {
        return <Input onChange={() => console.log('')} />;
    });
