import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from './Icon';
import './Icon.scss';

const withTests = require('@storybook/addon-jest').withTests;
const results = require('./.jest-test-results.json');
const stories = storiesOf('Icon', module);
const iconTestFile = 'Icon.test.tsx';

stories
    .addDecorator(withTests({ results })(iconTestFile))
    .add('should display text', () => {
        return <Icon />;
    });
