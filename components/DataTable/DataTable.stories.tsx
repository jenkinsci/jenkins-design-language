import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DataTable } from './DataTable';

const withTests = require('@storybook/addon-jest').withTests;
const results = require('./.jest-test-results.json');
const stories = storiesOf('DataTable', module);
const dataTableTestFile = 'DataTable.test.tsx';

// TODO move component out into test data dir
class User {
    name: String;
    age: String;
    location: String;
    weight: String;

    constructor(name: String, age: String, location: String, weight: String) {
        this.name = name;
        this.age = age;
        this.location = location;
        this.weight = weight;
    }
}

let user = new User('Alex', '30', 'Raleigh', '155');
let user2 = new User('Sam', '54', 'Chicago', '184');
let user3 = new User('Eric', '38', 'New York', '190');
const users = [user, user2, user3];

stories
    .addDecorator(withTests({ results })(dataTableTestFile))
    .add('should display a data table', () => {
        return (
            <DataTable items={users}>
                <DataTable.Column
                    header="Name"
                    cell={(user: User) => <div>{user.name}</div>}
                    expand
                />
                <DataTable.Column
                    header="Age"
                    cell={(user: User) => <div>{user.age}</div>}
                />
                <DataTable.Column
                    header="Weight"
                    cell={(user: User) => <div>{user.weight}</div>}
                />
                <DataTable.Column
                    header="Location"
                    cell={(user: User) => <div>{user.location}</div>}
                    footer="wow"
                />
            </DataTable>
        );
    });
