import React, { Component, PropTypes } from 'react';


const DEFAULT_VALUE = 'default value passed before mounting';


export default class TextInputClassicStory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            defaultValue: DEFAULT_VALUE,
        };

        this.textRef = null;
    }

    _setDefaultValue(value) {
        console.log('_setDefaultValue:', value);
        // this doesn't work since defaultValue is only read from when TextInputClassic mounts
        this.setState({
            defaultValue: value,
        });
    }

    _setValue(value) {
        console.log('_setValue:', value);
        this.textRef.setValue(value);
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: 300, justifyContent: 'space-between', padding: 10 }}>
                <h1>Classic</h1>

                <span>
                    <TextInputClassic />
                    &nbsp; updates as you type without extra code, without an initial value set
                </span>

                <span>
                    <TextInputClassic defaultValue={this.state.defaultValue} />
                    &nbsp; updates as you type without extra code, with an initial value set
                </span>

                <br />

                <span style={{ background: '#FF9999'}}>
                    <button onClick={() => this._setDefaultValue(new Date().toString())}>Set defaultValue</button>
                    &nbsp; Won't work, since defaultValue is only read by text control when mounting
                </span>

                <span>
                    <button onClick={() => this._setValue(new Date().toString())}>Update w/ setValue</button>
                    &nbsp; Will work, but requires a ref, and is less "reactive"
                </span>

                <span>
                    <button onClick={() => this._setValue('')}>Clear w/ setValue</button>
                    &nbsp; Will work, but requires a ref, and is less "reactive"
                </span>

                <span>
                    <button onClick={() => this._setValue(DEFAULT_VALUE)}>Reset w/ setValue</button>
                    &nbsp; Will work, but requires a ref, and is less "reactive"
                </span>

                <TextInputClassic ref={ref => this.textRef = ref} defaultValue={this.state.defaultValue} />
            </div>
        );
    }
}


class TextInputClassic extends Component {

    propTypes: {
        defaultValue: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    componentWillMount() {
        this._initialize(this.props);
    }

    _initialize(newProps) {
        if (!this.state.value && newProps.defaultValue) {
            this.setState({
                value: newProps.defaultValue,
            });
        }
    }

    _onChange(event) {
        this.setState({
            value: event.currentTarget.value,
        });
    }

    setValue(value) {
        this.setState({
            value,
        });
    }

    render() {
        return (
            <input type="text" style={{ width: 400 }} value={this.state.value} onChange={e => this._onChange(e)} />
        );
    }


}
