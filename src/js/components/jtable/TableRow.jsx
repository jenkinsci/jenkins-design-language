// @flow

import React, { Component, PropTypes, Children } from 'react';
import {
    TABLE_COLUMN_SPACING,
    TABLE_LEFT_RIGHT_PADDING
} from './JTable';

import type {ColumnDescription} from './JTable';

// TODO: Docs
export class TableRow extends Component {
    // TODO: Rename to DataRow?

    static propTypes = {}; // TODO: propTypes

    getColumns(): Array<ColumnDescription> {

        const columns = this.props.columns || [];
        const numChildren = Children.count(this.props.children);

        // Make sure we have the right number of columns
        if (columns.length !== numChildren) {
            console.warn('TableRow - received', numChildren, 'children, but', columns.length, 'columns!');

            // Add more columns if there's some missing
            while (columns.length < numChildren) {
                columns.push({ width: 100, isFlexible: true })
            }
        }

        return columns;
    }

    render() {

        let columns: Array<ColumnDescription> = this.getColumns(); // TODO: Move columns to this.state?

        const {
            className,
            children
        } = this.props;

        const numChildren = Children.count(children);
        
        const newChildren = Children.map(children, (child, i) => {

            const elementStyle = child.props.style || {};
            const newStyle = {...elementStyle};
            const columnDescription = columns[i];

            // Calc width including "spacing" because it needs to actually be padding for whole-row anchors
            let colWidth = columnDescription.width;
            if (i === 0 || i === numChildren - 1) {
                colWidth += TABLE_LEFT_RIGHT_PADDING + (TABLE_COLUMN_SPACING / 2);
            } else {
                colWidth += TABLE_COLUMN_SPACING;
            }
            newStyle.flexBasis = colWidth;

            // Add or remove space on flexible columns in proportion to comparitive widths
            newStyle.flexGrow = newStyle.flexShrink = columnDescription.isFlexible ? colWidth : 0;

            return React.cloneElement(child, {style: newStyle});
        });

        const classNames = ['JTable-row'];

        if (className) {
            classNames.push(className);
        }

        return (
            <div className={classNames.join(' ')}>
                {newChildren}
            </div>
        );
    }
}




