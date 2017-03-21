import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
    PlaceholderTable,
    PlaceholderTextCell as TextCell,
    PlaceholderCircleCell as CircleCell,
    PlaceholderText,
    PlaceholderCircle,
} from '../components';
import { JTable, TableRow, TableCell } from '../components/';


storiesOf('Placeholder', module)
    .add('PlaceholderTable', () => <TableStory />)
    .add('using JTable', () => <JTableStory />)
;

const style = {
    padding: 10,
};


function TableStory() {
    const columns = [
        { width: 75, head: { text: 50 }, cell: { circle: 20 } },
        { width: 250, isFlexible: true, head: { text: 50 }, cell: { text: 200 } },
        { width: 125, head: { text: 50 }, cell: { text: 100 } },
        { width: 125, head: { text: 50 }, cell: { text: 100 } },
        { width: 50, head: { text: 50 }, cell: { circle: 20 } },
    ];

    return (
        <div style={style}>
            <p>PlaceholderTable driven by 'columns' prop</p>

            <PlaceholderTable columns={columns} style={{maxHeight: 415}} />
        </div>
    );
}

function JTableStory() {
    const columns = [
        { width: 500, isFlexible: true },
        { width: 100 },
        { width: 100 },
        { width: 100 },
        { width: 50 },
    ];

    return (
        <div style={style}>
            <p>JTable using PlaceholderText/Circle and PlaceholderTextCell/CircleCell</p>

            <JTable columns={columns}>
                <TableRow>
                    <TextCell size={50} />
                    <TextCell size={50} />
                    <TextCell size={50} />
                    <TextCell size={50} />
                    <TextCell size={50} />
                </TableRow>
                <TableRow>
                    <TableCell>
                        <PlaceholderCircle size={20} style={{marginRight: 10}} />
                        <PlaceholderText size={75} />
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                </TableRow>
                <TableRow>
                    <TextCell size={75} />
                    <TextCell size={200} />
                    <TextCell size={100} />
                    <TextCell size={100} />
                    <CircleCell size={20} />
                </TableRow>
                <TableRow>
                    <TextCell size={75} />
                    <TextCell size={50} />
                    <TextCell size={50} />
                    <TextCell size={50} />
                    <CircleCell size={20} />
                </TableRow>
            </JTable>
        </div>
    );
}
