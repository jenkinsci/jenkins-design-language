// @flow

import React, { Component, PropTypes, Children } from 'react';

import type {ColumnDescription} from './JTable';

// TODO: Docs
export class TableCell extends Component {

    static propTypes = {}; // TODO: propTypes

    render() {

        const {
            style,
            title,
            className,
            children
        } = this.props;

        const classNames = ['JTable-cell'];

        if (className) {
            classNames.push(className);
        }

        const outerProps = {
            className: classNames.join(' '),
            style,
            title
        };

        if (!title && typeof children === 'string') {
            outerProps.title = children;
        }

        return (
            <div {...outerProps}>
                <div className="JTable-cell-contents">
                    {children}
                </div>
            </div>
        );
    }
}

export const TableHeader = (props) => {

    const {
        className,
        children
    } = props;

    const classNames = ['JTable-header'];

    if (className) {
        classNames.push(className);
    }

    const newProps = {
        ...props,
        children: undefined,
        className: classNames.join(' ')
    };

    return <TableCell {...newProps}>{children}</TableCell>
};


