import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Table } from '../components/Table';

const headers = ['A','B','C'];
const headers2 = [
    { className: 'red', label: 'A' },
    { className: 'blue', label: 'B' },
    { className: 'green', label: 'C' },
];

storiesOf('Table', module)
    .add('standard', scenario1)
    .add('table class', scenario2)
    .add('header class', scenario3)
    .add('fluid columns', scenario4)
    .add('fixed columns', scenario5);


// SHORYUKEN
const detailedHeaders = ['Name', 'DOB', 'Height', 'Weight', 'Blood Type'];
const detailedData = [
    [ 'Ryu',      '21-7-1964',  '5\'10"', '150 lbs', 'O' ],
    [ 'E. Honda', '3-11-1960',  '6\'2"',  '304 lbs', 'A' ],
    [ 'Blanka',   '12-2-1966',  '6\'5"',  '218 lbs', 'B' ],
    [ 'Guile',    '23-12-1960', '6\'1"',  '191 lbs', 'O' ],
    [ 'Ken',      '14-2-1966',  '5\'10"', '169 lbs', 'B' ],
    [ 'Chun-Li',  '1-3-1968',   '5\'8"',  '-',       'A' ],
    [ 'Zangief',  '1-6-1956',   '7\'',    '256 lbs', 'A' ],
    [ 'Dhalsim',  '22-11-1962', '5\'10"', '107 lbs', 'O' ]
];

function renderRow(values) {
    return (
        <tr>
            { values.map(value => <td>{value}</td>) }
        </tr>
    );
}

function scenario1() {
    return (
        <Table headers={detailedHeaders}>
            { detailedData.map(renderRow) }
        </Table>
    );
}

function scenario2() {
    return (
        <Table className="red" headers={headers}>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
        </Table>
    );
}

function scenario3() {
    return (
        <Table headers={headers2}>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
        </Table>
    );
}

function scenario4() {
    return (
        <Table headers={headers}>
            <tr>
                <td>this column has very long text, therefore gets a very long width</td>
                <td>short column 1</td>
                <td>short column 2</td>
            </tr>
        </Table>
    );
}

function scenario5() {
    return (
        <Table className="fixed" headers={headers}>
            <tr>
                <td>this column has very long text, but is still the same size</td>
                <td>short column 1</td>
                <td>short column 2</td>
            </tr>
        </Table>
    );
}
