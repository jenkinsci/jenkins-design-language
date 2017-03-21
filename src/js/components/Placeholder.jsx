import React, { PropTypes } from 'react';
import { JTable } from './jtable/JTable';
import { TableRow } from './jtable/TableRow';
import { TableCell } from './jtable/TableCell';



export class PlaceholderTable extends React.Component {

    render() {
        const { className, columns, rowCount, style } = this.props;

        const heads = columns.map(col => col.head);
        const cells = columns.map(col => col.cell);
        const rowIterator = new Array(rowCount).fill('');
        const classString = `Placeholder ${className}`;

        return (
            <div className={classString} style={style}>
                <JTable columns={columns}>
                    <TableRow>
                        { heads.map((item, index) =>
                            <TableCell key={index}>
                                { createPlaceholderCell(item) }
                            </TableCell>
                        ) }
                    </TableRow>
                { rowIterator.map((item, index) =>
                    <TableRow key={`row-${index}`}>
                        { cells.map((item, index) =>
                            <TableCell key={`cell-${index}`}>
                                { createPlaceholderCell(item) }
                            </TableCell>
                        ) }
                    </TableRow>
                )}
                </JTable>
            </div>
        );
    }
}

PlaceholderTable.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    columns: PropTypes.array,
    rowCount: PropTypes.number,
};

PlaceholderTable.defaultProps = {
    className: '',
    style: {},
    rowCount: 20,
};


export function PlaceholderText(props) {
    return (
        <div className="Placeholder-text" style={{ ...props.style, width: props.size }} />
    );
}

PlaceholderText.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
};


export function PlaceholderCircle(props) {
    const { size, style } = props;
    const rad = size / 2;

    return (
        <svg className="Placeholder-circle" width={size} height={size} style={style}>
            <circle cx={rad} cy={rad} r={rad} />
        </svg>
    );
}

PlaceholderCircle.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
};


function createPlaceholderCell(item) {
    const _props = {};

    if (item['text']) {
        _props.size = item['text'];
        return <PlaceholderText { ..._props} />;
    } else if (item['circle']) {
        _props.size = item['circle'];
        return <PlaceholderCircle {..._props} />;
    }

    return null;
}


export function PlaceholderTextCell(props) {
    return <TableCell style={props.style}><PlaceholderText size={props.size} /></TableCell>;
}

PlaceholderTextCell.propTypes = {
    style: PropTypes.object,
    size: PropTypes.number,
};


export function PlaceholderCircleCell(props) {
    return <TableCell style={props.style}><PlaceholderCircle size={props.size} /></TableCell>;
}

PlaceholderCircleCell.propTypes = {
    style: PropTypes.object,
    size: PropTypes.number,
};
