import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Card, CardType } from './Card';

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
            <Card width="300" type={CardType.Shadowed}>
                <Card.Header>{value.header}</Card.Header>
                <Card.Description>{value.section}</Card.Description>
                {value.listItem.map(item => {
                    return <Card.ListItem>{item}</Card.ListItem>;
                })}
            </Card>
            <br />
        </>
    );
});

storiesOf('Card', module)
    .add('should display basic Card', () => {
        const value = cardValues[0];
        return (
            <>
                <Card width="340">
                    <Card.Header>{value.header}</Card.Header>
                    <Card.Description>{value.section}</Card.Description>
                    {value.listItem.map(item => {
                        return <Card.ListItem>{item}</Card.ListItem>;
                    })}
                </Card>
            </>
        );
    })
    .add('should display Shadowed Cards', () => {
        return <>{cardItems}</>;
    });
