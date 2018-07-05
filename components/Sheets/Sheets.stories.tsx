// TODO refactor based on component

import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { Button } from './Sheets';

const stories = storiesOf('Sheets', module);

stories.add('should display text', () => {
    const story = <div>some-text</div>;
    return story;
});
