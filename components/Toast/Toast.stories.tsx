import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Toast } from './Toast';

storiesOf('Toast', module).add('should display toast', () => {
    return (
        <Toast
            caption="something"
            text="text here"
            style=""
            action="some action"
            onActionClick={() => console.log('action.')}
            onDismiss={() => console.log('dismissed.')}
        />
    );
});
