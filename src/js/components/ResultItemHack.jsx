import React, { Component } from 'react';
import { ResultItem } from './ResultItem';

export class ResultItemHack extends Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            children: <span>oh Mann</span>,
            expanded: true,
        };
    }

    render() {

        return (<ResultItem
            result="success"
            label="Change children"
            extraInfo="wuTang"
            onExpand={() => this.setState({
                children: <div>geh!</div>,
                expanded: true,
            })}
            expanded={this.state.expanded}
           >
            {this.state.children}
        </ResultItem>);
    }
}
