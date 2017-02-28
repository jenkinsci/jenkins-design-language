// @flow

import React, { Component, PropTypes } from 'react';

// TODO: Docs
export class TableCell extends Component {

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

        if (typeof title === 'undefined' && typeof children === 'string') {
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

TableCell.propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
};

export const TableHeader = (props: $PropertyType<TableCell, 'props'> ) => {

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

    return <TableCell {...newProps}>{children}</TableCell>;
};

TableHeader.propTypes = TableCell.propTypes;
