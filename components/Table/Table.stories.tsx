import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from './Table';
import { users } from './Table.test';

storiesOf('Table', module).add('should display a data table', () => {
    return (
        <Table items={users}>
            <Table.Col header="Name" expand>{(user: any) => <div>{user.name}</div>}</Table.Col>
            <Table.Col header="Age">{(user: any) => <div>{user.age}</div>}</Table.Col>
            <Table.Col header="Weight">{(user: any) => <div>{user.weight}</div>}</Table.Col>
            <Table.Col
                header="Location"
                footer="wow"
            >{(user: any) => <div>{user.location}</div>}</Table.Col>
        </Table>
    );
});
