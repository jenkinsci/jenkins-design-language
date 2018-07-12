import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from './Card';

const title = 'My Card';
const children = (
    <div>
        <h5>Sub header</h5>Some content below..
    </div>
);

storiesOf('Card', module).add('should display a card', () => {
    return <Card title={title} children={children} />;
});
