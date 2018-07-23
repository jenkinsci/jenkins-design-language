import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from './Card';

const cardValues = [
    {
        header: 'My Card',
        section: (
            <>
                <h5>Sub header</h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </>
        ),
        listItem: [
            <>
                <strong>Name: </strong> Gabriel
            </>,
        ],
    },
    {
        header: 'My Second Card',
        section: <>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>,
        listItem: [
            <>
                <strong>First: </strong> Gabriel
            </>,
            <>
                <strong>Last: </strong> Sena
            </>,
        ],
    },
];

const cardItems = cardValues.map(value => {
    return (
        <>
            <Card>
                <Card.Header>{value.header}</Card.Header>
                <Card.Section>{value.section}</Card.Section>
                {value.listItem.map(item => {
                    return <Card.ListItem>{item}</Card.ListItem>;
                })}
            </Card>
            <br />
        </>
    );
});

storiesOf('Card', module).add('should display a card', () => {
    return <>{cardItems}</>;
});
