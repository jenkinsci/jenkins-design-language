import React, { Component, PropTypes } from 'react';


const DEFAULT_VALUE = 'value passed before mounting';


export default class TextInputHybridStory extends Component {

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
                <h1>Hybrid</h1>

                <span>
                    <TextInputHybrid onChange={value => this._onChange(value)} />
                    &nbsp; updates as you type without extra code, without an initial value set
                </span>

                <span>
                    <TextInputHybrid onChange={value => this._onChange(value)} value={this.state.value1} />
                    &nbsp; updates as you type without extra code, with an initial value set
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

                <span style={{ background: '#FF9999'}}>
                    <button onClick={() => this._setValue(DEFAULT_VALUE)}>Reset 'value' prop</button>
                    &nbsp; Doesn't work after typing, since the value of prop 'value' didn't change
                </span>

                <TextInputHybrid onChange={value => this._onChange(value)} value={this.state.value2} />
            </div>
        );
    }
}


class TextInputHybrid extends Component {

    propTypes: {
        value: PropTypes.string,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    componentWillMount() {
        this._setValue(this.props, true);
    }

    componentWillReceiveProps(nextProps) {
        this._setValue(nextProps);
    }

    _setValue(nextProps, forceUpdate) {
        const valueChanged = nextProps.value !== this.props.value;

        if (valueChanged || forceUpdate) {
            this.setState({
                value: nextProps.value || '',
            });
        }
    }

    _onChange(event) {
        this.setState({
            value: event.currentTarget.value,
        });

        if (this.props.onChange) {
            this.props.onChange(event.currentTarget.value);
        }
    }

    render() {
        return (
            <input type="text" style={{ width: 400 }} value={this.state.value} onChange={e => this._onChange(e)} />
        );
    }

}
