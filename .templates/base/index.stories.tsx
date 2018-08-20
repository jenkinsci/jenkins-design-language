import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { [componentName] } from './[componentName]';

storiesOf('[componentName]', module)
.add('should display', () => {
    return <[componentName] />;
});
