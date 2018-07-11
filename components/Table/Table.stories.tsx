import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from './Table';
import { User, users } from './Table.test';

storiesOf('Table', module)
    .add('should display a data table', () => {
        return (
            <Table values={users}>
                <Table.Col header="Name" expand render={(user: any) => <div>{user.name}</div>} />
                <Table.Col header="Age" render={(user: any) => <div>{user.age}</div>} />
                <Table.Col header="Weight" render={(user: any) => <div>{user.weight}</div>} />
                <Table.Col
                    header="Location"
                    footer="wow"
                    render={(user: any) => <div>{user.location}</div>}
                />
            </Table>
        );
    })
    .add('uses default unique key', () => {
        return (
            <Table values={users}>
                <Table.Col header="Name" expand render={(user: any) => <div>{user.name}</div>} />
                <Table.Col header="Age" render={(user: any) => <div>{user.age}</div>} />
            </Table>
        );
    })
    .add('supports key by id', () => {
        const usersCopy = JSON.parse(JSON.stringify(users)) as User[];
        return (
            <div>
                <Table values={usersCopy}>
                    <Table.Col
                        id
                        header="Name"
                        expand
                        render={(user: any) => <div>{user.name}</div>}
                    />
                    <Table.Col header="Age" render={(user: any) => <div>{user.age}</div>} />
                </Table>
                <button onClick={() => (usersCopy[0].age = '99')}>
                    This won't update the table
                </button>
                <button onClick={() => (usersCopy[0].name = 'asdf')}>
                    This will update the table
                </button>
            </div>
        );
    })
    .add('supports key by id={fn}', () => {
        const usersCopy = JSON.parse(JSON.stringify(users)) as User[];
        return (
            <Table values={usersCopy}>
                <Table.Col
                    id={u => u.name}
                    header="Name"
                    expand
                    render={(user: any) => <div>{user.name}</div>}
                />
                <Table.Col header="Age" render={(user: any) => <div>{user.age}</div>} />
            </Table>
        );
    });
