import React, { PropTypes } from 'react';
import { JTable } from './jtable/JTable';
import { TableRow } from './jtable/TableRow';
import { TableCell } from './jtable/TableCell';


// should fill up all available vertical space
const ROW_COUNT = new Array(20).fill('');


export class Placeholder extends React.Component {

    render() {
        const { className, columns, style } = this.props;

        const tableCols = columns.map(item => {
            const col = JTable.column(item.size);
            col.isFlexible = !!item.flex;
            return col;
        });
        const heads = columns.map(col => col.head);
        const cells = columns.map(col => col.cell);
        const classString = `Placeholder ${className}`;

        return (
            <div className={classString} style={style}>
                <JTable columns={tableCols}>
                    <TableRow>
                        { heads.map((item, index) =>
                            <TableCell key={index}>
                                { itemToPlaceholder(item) }
                            </TableCell>
                        ) }
                    </TableRow>
                    { ROW_COUNT.map((item, index) =>
                        <TableRow key={`hello-${index}`}>
                            { cells.map((item, index) =>
                                <TableCell key={`heya-${index}`}>
                                    { itemToPlaceholder(item) }
                                </TableCell>
                            ) }
                        </TableRow>
                    )}
                </JTable>
            </div>
        );
    }
}

Placeholder.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    columns: PropTypes.array,
};

Placeholder.defaultProps = {
    className: '',
    style: {},
};


function itemToPlaceholder(item) {
    const _props = {};

    if (item['text']) {
        _props.size = item['text'];
        return React.createElement(Text, _props);
    } else if (item['circle']) {
        _props.size = item['circle'];
        return React.createElement(Circle, _props);
    }

    return null;
}


function Text(props) {
    return (
        <div className="Placeholder-text" style={{ width: props.size }} />
    );
}

Text.propTypes = {
    size: PropTypes.number,
};


function Circle(props) {
    const size = props.size;
    const rad = size / 2;

    return (
        <svg className="Placeholder-circle" width={size} height={size}>
            <circle cx={rad} cy={rad} r={rad} />
        </svg>
    );
}

Circle.propTypes = {
    size: PropTypes.number,
};
