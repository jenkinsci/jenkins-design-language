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

// TODO: Docs
export class JTable extends Component {

    static propTypes = {}; // TODO: propTypes

    static column(name: string, width: number, isFlexible: boolean = false): ColumnDescription {
        return {name, width, isFlexible};
    }

    render() {

        const {
            className,
            children,
            columns
        } = this.props;

        const classNames = ['JTable'];

        // TODO: Option to control this
        classNames.push('u-table-maxwidth');

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
            <div className={classNames.join(' ')}>
                {newChildren}
            </div>
        );
    }
}





