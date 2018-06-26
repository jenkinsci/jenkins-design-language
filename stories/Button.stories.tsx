import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from '../components/Button';

import '../components/Button/src/Button.scss';

const stories = storiesOf('Button', module);

stories.add('should display text', function() {
    const story = <Button>some-text</Button>;

    return story;
});
