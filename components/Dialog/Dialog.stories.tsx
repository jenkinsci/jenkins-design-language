import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { dialogs } from './Dialog';

const stories = storiesOf('Dialog', module);

stories.add('should display a dialog', () => {
    let content = <span>Some modal content!</span>;
    dialogs.addDialog('My first dialog', '', content);
    dialogs.addDialog('My second dialog', 'great-class', content);

    setTimeout(() => {
        dialogs.addDialog('My third dialog', '', content);
    }, 5000);

    return dialogs.render();
});
