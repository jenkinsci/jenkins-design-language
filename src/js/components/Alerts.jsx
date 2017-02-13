// @flow

import React, { Component, PropTypes } from 'react';


export class Alerts extends Component {
    render() {
        const { type = 'Info', message='Please pass a message', title=type } = this.props;
        const classNames = `Alert ${type}`;
        return (<div className={classNames}>
            <div className="title">{title}</div>
            <div className="message">{message}</div>
        </div>);
    }

    static defaultProps = {
        size: "default"
    };

    static propTypes = {
        type: PropTypes.oneOfType(['Warning', 'Error', 'Success', 'Info']),
        title: PropTypes.string,
        message: PropTypes.string
    };
}
