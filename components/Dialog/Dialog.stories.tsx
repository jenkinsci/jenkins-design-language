import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Dialog } from './Dialog';

const stories = storiesOf('Dialog', module);

stories.add('should display a modal', () => {
    let content = <span>Some modal content!</span>;
    return <Dialog>{content}</Dialog>;
});
