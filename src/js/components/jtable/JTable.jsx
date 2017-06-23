// @flow

import React, { Component, PropTypes, Children } from 'react';

export const TABLE_LEFT_RIGHT_PADDING = 23; // 24 inc border
export const TABLE_COLUMN_SPACING = 32;
// !!!IMPORTANT!!! Don't change the above consts without changing jtable.less to match!

export type ColumnDescription = {
    name?: string,
    width: number,
    isFlexible: boolean
};

type Props = {
    onClick?: Function,
    className?: string,
    children?: ReactChildren,
    columns: Array<ColumnDescription>,
    style?: Object
};

/**
 * Table component, rendered using divs and display:flex rather than HTML tables, because that gives us better control
 * over layout, and allows us to do things like making a whole row an anchor, etc.
 */
export class JTable extends Component {

    /**
     * Just a simple helper
     */
    static column(width: number, name: string = '', isFlexible: boolean = false): ColumnDescription {
        return {name, width, isFlexible};
    }

    props: Props;
    state: {
        columns: Array<ColumnDescription>
    };

    constructor(props: Props) {
        super(props);

        this.state = {columns: []};
    }

    componentWillMount() {
        this.processColumns(this.props.columns);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.columns !== this.props.columns) {
            this.processColumns(nextProps.columns);
        }
    }

    processColumns(propColumns: any) {

        if (propColumns == null) {
            propColumns = [];
        }

        if (!Array.isArray(propColumns)) {
            propColumns = [propColumns]; // Assuming a single column passed in
        }

        let hasFlexibleColumn = false;
        const processedColumns = propColumns.map(input => {

            let colName = '';

            if (input.name && React.isValidElement(input.name)) {
                colName = input.name;
            } else if (input.name !== null) {
                colName = String(input.name);
            }

            const result = {
                name: colName,
                width: parseInt(input.width),
                isFlexible: !!input.isFlexible
            };

            hasFlexibleColumn = hasFlexibleColumn || result.isFlexible;

            if (isNaN(result.width)) {
                // Make a wild stab at it
                result.width = Math.floor(1000 / propColumns.length);
            }

            return result;
        });

        // If no flexible columns specified, we make them all flexible, or they'll get cut off / last column stretches
        if (!hasFlexibleColumn) {
            for (const col of processedColumns) {
                col.isFlexible = true;
            }
        }

        this.setState({ columns: processedColumns });
    }

    render() {

        const {
            className,
            children,
            ...restProps
        } = this.props;

        const classNames = ['JTable', 'u-table-maxwidth'];

        if (className) {
            classNames.push(...(className.split(/\s+/)));
        }

        const newChildProps = {
            columns: this.state.columns
        };

        const newChildren = [];

        Children.forEach(children, child => {
            if (child) {
                newChildren.push(React.cloneElement(child, newChildProps));
            }
        });

        const newProps = {
            ...restProps,
            columns: undefined,
            className: classNames.join(' '),
        };

        return React.createElement('div', newProps, ...newChildren);
    }
}

JTable.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    columns: PropTypes.array
};





