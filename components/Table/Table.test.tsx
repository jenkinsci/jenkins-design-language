import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Table } from './Table';

export class User {
    name: string;
    age: string;
    location: string;
    weight: string;

    constructor(name: string, age: string, location: string, weight: string) {
        this.name = name;
        this.age = age;
        this.location = location;
        this.weight = weight;
    }
}

const user = new User('Alex', '30', 'Raleigh', '155');
const user2 = new User('Sam', '54', 'Chicago', '184');
const user3 = new User('Eric', '38', 'New York', '190');

export const users = [user, user2, user3];

describe('Table: ', () => {
    it('should contain same number of rows as values', () => {
        const rendered = Enzyme.render(
            <Table values={users}>
                <Table.Col render={(u: User) => u.name} />
            </Table>
        );
        expect(rendered.find('td').length).toBe(users.length);
    });

    it('should render a header', () => {
        const rendered = Enzyme.render(
            <Table values={users}>
                <Table.Col header="COLUMN_HEADER" render={(u: User) => u.name} />
            </Table>
        );
        expect(rendered.find('thead th').text()).toBe('COLUMN_HEADER');
    });

    it('should render a footer', () => {
        const rendered = Enzyme.render(
            <Table values={users}>
                <Table.Col footer="COLUMN_FOOTER" render={(u: User) => u.name} />
            </Table>
        );
        expect(rendered.find('tfoot td').text()).toBe('COLUMN_FOOTER');
    });

    it('expand a column', () => {
        const rendered = Enzyme.render(
            <Table values={[users[0]]}>
                <Table.Col expand render={(u: User) => u.name} />
                <Table.Col render={(u: User) => u.name} />
            </Table>
        );
        expect(rendered.find('td:first-child').hasClass('expand')).toBeTruthy();
        expect(rendered.find('td:last-child').hasClass('expand')).toBeFalsy();
    });

    it('should render multiple columns', () => {
        const rendered = Enzyme.render(
            <Table values={users}>
                <Table.Col header="C1" render={(u: User) => u.name} />
                <Table.Col header="C2" render={(u: User) => u.name} />
                <Table.Col header="C3" render={(u: User) => u.name} />
                <Table.Col header="C4" render={(u: User) => u.name} />
            </Table>
        );
        expect(rendered.find('th').length).toBe(4);
    });

    it('column renders', () => {
        const rendered = Enzyme.render(<Table.Col render={(u: User) => null} />);
        expect(rendered.text()).toBe('');
    });

    it('custom keys work', () => {
        const getKey = Enzyme.mount(
            <Table values={users} getKey={u => u.name}>
                <Table.Col header="C1" render={(u: User) => u.name} />
                <Table.Col header="C2" render={(u: User) => u.name} />
            </Table>
        );
        expect(getKey.find(Table.Col)[0].key).toBe(users[0].name);
    });
});
