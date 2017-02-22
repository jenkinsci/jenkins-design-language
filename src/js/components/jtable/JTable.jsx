// @flow

import React, { Component, PropTypes, Children } from 'react';

export type ColumnDescription = {
    width: number,
    isFlexible: boolean
};

// TODO: Docs
export class JTable extends Component {

    static propTypes = {}; // TODO: propTypes

    static column(width: number, isFlexible: boolean = false): ColumnDescription {
        return {width, isFlexible};
    }

    render() {

        const {
            className,
            children,
            columns
        } = this.props;

        const classNames = ['JTable'];

        if (className) {
            classNames.push(...(className.split(/\s+/)));
        }

        const newChildProps = {
            columns
        };

        const newChildren = Children.map(children, child => {
            return React.cloneElement(child, newChildProps);
        });

        // TODO: Option to control this
        classNames.push('u-table-maxwidth');

        return (
            <div className={classNames.join(' ')}>
                {newChildren}
            </div>
        );
    }
}





