import React, { Component, PropTypes } from 'react';


const DEFAULT_VALUE = 'value passed before mounting';


export default class TextInputStatelessStory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value1: DEFAULT_VALUE,
            value2: DEFAULT_VALUE,
        };
    }

    _onChange(value) {
        console.log('_onChange:', value);
    }

    _setValue(value) {
        console.log('_setValue:', value);
        this.setState({
            value2: value,
        });
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: 300, justifyContent: 'space-between', padding: 10 }}>
                <h1>Stateless</h1>

                <span>
                    <TextInputStateless onChange={value => this._onChange(value)} />
                    &nbsp; updates as you type without extra code, without an initial value set
                </span>

                <span style={{ background: '#FF9999'}}>
                    <TextInputStateless value={this.state.value1} />
                    &nbsp; <b>will not update</b> as you type without extra code, because an initial value set
                </span>

                <br />

                <span>
                    <button onClick={() => this._setValue(new Date().toString())}>Update 'value' prop</button>
                    &nbsp; Works fine, since parent has full control over text's state
                </span>

                <span>
                    <button onClick={() => this._setValue('')}>Clear 'value' prop</button>
                    &nbsp; Works fine, since parent has full control over text's state
                </span>

                <span>
                    <button onClick={() => this._setValue(DEFAULT_VALUE)}>Reset 'value' prop</button>
                    &nbsp; Works fine after typing, since parent has full control over text's state
                </span>

                <TextInputStateless onChange={value => this._setValue(value)} value={this.state.value2} />
            </div>
        );
    }
}


class TextInputStateless extends Component {

    propTypes: {
        value: PropTypes.string,
        onChange: PropTypes.func,
    };

    _onChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event.currentTarget.value);
        }
    }

    render() {
        return (
            <input type="text" style={{ width: 400 }} value={this.props.value} onChange={e => this._onChange(e)} />
        );
    }

}
