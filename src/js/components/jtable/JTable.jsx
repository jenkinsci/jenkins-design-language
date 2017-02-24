// @flow

import React, { Component, PropTypes, Children } from 'react';

export type ColumnDescription = {
    name: string,
    width: number,
    isFlexible: boolean
};

export const TABLE_LEFT_RIGHT_PADDING = 24;
export const TABLE_COLUMN_SPACING = 32;
// !!!IMPORTANT!!! Don't change the above consts without changing jtable.less to match!

/**
 * Make sure we have an Array<ColumnDescription> with all fields populated
 */
export function processColumns(columns: any): Array<ColumnDescription> {
    if (!columns) {
        return [];
    }

    if (!Array.isArray(columns)) {
        columns = [columns]; // Assuming a single column passed in
    }

    let hasFlexibleColumn = false;
    let processedColumns = columns.map(input => {

        let result = {
            name: input.name ? '' + input.name : '',
            width: parseInt(input.width),
            isFlexible: !!input.isFlexible
        };

        hasFlexibleColumn = hasFlexibleColumn || result.isFlexible;

        if (isNaN(result.width)) {
            // Make a wild stab at it
            result.width = Math.floor(1000 / columns.length);
        }

        return result;
    });

    // If no flexible columns specified, we make them all flexible, or they'll get cut off / table will look weird
    if (!hasFlexibleColumn) {
        for (let col of processedColumns) {
            col.isFlexible = true;
        }
    }

    return processedColumns;
}

// TODO: Docs
export class JTable extends Component {

    static propTypes = {}; // TODO: propTypes

    static column(width: number, name: string = '', isFlexible: boolean = false): ColumnDescription {
        return {name, width, isFlexible};
    }

    render() {

        const {
            className,
            children,
            style
        } = this.props;

        const columns = processColumns(this.props.columns);

        const classNames = ['JTable', 'u-table-maxwidth'];

        if (className) {
            classNames.push(...(className.split(/\s+/)));
        }

        const newChildProps = {
            columns
        };

        const newChildren = Children.map(children, child => {
            return React.cloneElement(child, newChildProps);
        });

        return (
            <div className={classNames.join(' ')} style={style}>
                {newChildren}
            </div>
        );
    }
}





