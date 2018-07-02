import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Table } from './Table';

export class User {
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

const user = new User('Alex', '30', 'Raleigh', '155');
const user2 = new User('Sam', '54', 'Chicago', '184');
const user3 = new User('Eric', '38', 'New York', '190');

export const users = [user, user2, user3];

describe('Table: ', () => {
    it('should contain same number of rows as items', () => {
        const rendered = Enzyme.render(
            <Table items={users}>
                <Table.Col>{(u: User) => u.name}</Table.Col>
            </Table>
        );
        expect(rendered.find('td').length).toBe(users.length);
    });

    it('should render a header', () => {
        const rendered = Enzyme.render(
            <Table items={users}>
                <Table.Col header="COLUMN_HEADER">{(u: User) => u.name}</Table.Col>
            </Table>
        );
        expect(rendered.find('thead th').text()).toBe('COLUMN_HEADER');
    });

    it('should render a footer', () => {
        const rendered = Enzyme.render(
            <Table items={users}>
                <Table.Col footer="COLUMN_FOOTER">{(u: User) => u.name}</Table.Col>
            </Table>
        );
        expect(rendered.find('tfoot td').text()).toBe('COLUMN_FOOTER');
    });

    it('expand a column', () => {
        const rendered = Enzyme.render(
            <Table items={[users[0]]}>
                <Table.Col expand>{(u: User) => u.name}</Table.Col>
                <Table.Col>{(u: User) => u.name}</Table.Col>
            </Table>
        );
        expect(rendered.find('td:first-child').hasClass('expand')).toBeTruthy();
        expect(rendered.find('td:last-child').hasClass('expand')).toBeFalsy();
    });

    it('should render multiple columns', () => {
        const rendered = Enzyme.render(
            <Table items={users}>
                <Table.Col header="C1">{(u: User) => u.name}</Table.Col>
                <Table.Col header="C2">{(u: User) => u.name}</Table.Col>
                <Table.Col header="C3">{(u: User) => u.name}</Table.Col>
                <Table.Col header="C4">{(u: User) => u.name}</Table.Col>
            </Table>
        );
        expect(rendered.find('th').length).toBe(4);
    });

    it('column renders', () => {
        const rendered = Enzyme.render(
            <Table.Col>{(u: User) => null}</Table.Col>
        );
        expect(rendered.text()).toBe('')
    });
});
