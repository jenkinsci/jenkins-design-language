// @flow

import React, { Component, PropTypes } from 'react';

function getKey(column:string | Object) {
    if (typeof column === 'string') {
        return column;
    }
    return column.label;
}

function getLabel(column:string | Object) {
    if (typeof column === 'string') {
        return column;
    }
    return column.label;
}

function getClass(column:string | Object) {
    if (typeof column === 'string') {
        return null;
    }
    return column.className;
}

/**
 * Renders a simple HTML table with optional header elements.
 *
 * Properties:
 *
 * "children": one or more TR elements
 *
 * "headers": an array of Strings to render, or
 *            an array of Objects with shape: { label:String, className:String }
 *
 * "disableHeaderDivider": Optional, truthy if you wish to disable the HR row at the bottom of THEAD
 *
 * "disableDefaultPadding": Optional, truthy if you wish to disable default padding added by removing u-table-padding
 * className from the TABLE element
 *
 * To set explicit column widths, specify className for the header elements and
 * specify specify className="fixed" on the Table component to use table-layout: fixed.
 *
 * Specify additional className="u-highlight-rows" for whole-row mouseover hover
 *
 * Head / body divider will only be included automagically when using headers prop.
 */
export class Table extends Component {

    render() {
        const {
            headers,
            children,
            className,
            disableHeaderDivider,
            disableDefaultPadding } = this.props;

        const divider = headers && headers.length && !disableHeaderDivider ?
            <TableDivider numCols={headers.length}/> : undefined;

        const headerRowCells = headers && headers.map((column) => (
                <th key={getKey(column)} className={getClass(column)}>
                    {getLabel(column)}
                </th>
            ));

        const tableHeader = headers && (
                <thead>
                    <tr>{ headerRowCells }</tr>
                    { divider }
                </thead>
            );

        const tableClasses = ['jdl-table'];

        if (className) {
            tableClasses.push(className);
        }

        if (!disableDefaultPadding) {
            tableClasses.push('u-table-padding');
        }

        return (
            <table className={tableClasses.join(' ')}>
                { tableHeader }
                { headers ? <tbody>{children}</tbody> : children }
            </table>
        );
    }
}

Table.propTypes = {
    headers: PropTypes.array,
    children: PropTypes.node,
    className: PropTypes.string,
    disableHeaderDivider: PropTypes.bool,
    disableDefaultPadding: PropTypes.bool
};

export const TableDivider = (props: {numCols: number}) => (
    <tr className="jdl-table-divider">
        <td colSpan={props.numCols}>
            <hr/>
        </td>
    </tr>
);

TableDivider.propTypes = {
    numCols: PropTypes.number.isRequired
};
