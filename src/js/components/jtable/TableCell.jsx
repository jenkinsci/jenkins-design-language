// @flow

import React, { Component, PropTypes } from 'react';

import type {ColumnDescription} from './JTable';

// TODO: Docs
export class TableCell extends Component {

    static propTypes = {}; // TODO: propTypes

    render() {

        const {
            style
        } = this.props;

        const classNames = ['JTable-cell'];

        return (
            <div className={classNames.join(' ')} style={style}>
                {this.props.children}
            </div>
        );
    }
}




