// @flow

import React, { Component, PropTypes, Children } from 'react';

import type {ColumnDescription} from './JTable';

// TODO: Docs
export class TableRow extends Component {
    // TODO: Rename to DataRow?

    static propTypes = {}; // TODO: propTypes

    render() {

        let columns: Array<ColumnDescription> = this.props.columns || [];

        const children = this.props.children;

        const numChildren = Children.count(children);

        if (columns.length !== numChildren) {
            console.warn('TableRow - received', numChildren, 'children, but', columns.length, 'columns!');
        }

        const newChildren = Children.map(children, (child, i) => {


            const oldStyle = child.props.style || {};
            const newStyle = {};
            const columnDescription = columns[i] || { width: 100, isFlexible: true };

            // newStyle.width = columnDescription.width + 'px';
            newStyle.flexBasis = columnDescription.width;
            newStyle.flexGrow = newStyle.flexShrink = columnDescription.isFlexible ? 100 : 0;

            if (i == 0) {
                console.log(newStyle)
            }

            return React.cloneElement(child, {style: newStyle});
        });

        const classNames = ['JTable-row'];

        return (
            <div className={classNames.join(' ')}>
                {newChildren}
            </div>
        );
    }
}




