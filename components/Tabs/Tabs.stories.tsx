import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Tabs, Tab } from './Tabs';

const stories = storiesOf('Tabs', module);

stories.add('should display tabs', () => {
    return (
        <Tabs>
            <Tab title="Tab 1">Tab 1 Content</Tab>
            <Tab title="Tab 2">Tab 2 Content</Tab>
        </Tabs>
    );
});
