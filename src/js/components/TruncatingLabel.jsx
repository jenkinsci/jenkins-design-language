// @flow

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

type Props = *; // TODO: Actual props

function debug(...rest) {
    // TODO: Remove this
    console.log('TL-DBG', ...rest);
}

const RS_MEASURE = 'measure'; // Mounted, text/props changed, measurement needed.
const RS_FLUID = 'fluid'; // Text too big, in the process of trimming it down
const RS_STABLE = 'stable'; // Done measuring, until props change

// TODO: Docs
export class TruncatingLabel extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        debug("------------------------- componentWillMount() -------------------------");
        this.handleProps(this.props);
    }

    componentWillReceiveProps(nextProps:Props) {
        this.handleProps(nextProps);
    }

    handleProps(props) {

        let {children} = props;

        if ( typeof children !== "string") {
            console.warn("TruncatingLabel - Label children must be string for now", children);
            children = "Contents must be string";
        }

        this.renderState = RS_MEASURE;
        this.innerText = children;
        this.loopCount = 0;
        this.fluidTime = 0;
    }

    checkSize() {

        let element = ReactDOM.findDOMNode(this);

        let {
            scrollHeight,
            clientHeight
        } = element;

        const minLength = 5;

        if (this.innerText && this.innerText.length > minLength
            && scrollHeight > clientHeight && this.loopCount < 50) {

            // Text is currently too big!

            this.loopCount++;
            this.fluidTime = this.fluidTime || performance.now();
            this.renderState = RS_FLUID;

            // Guess how much we're over, based on the ratio of clientHeight:scrollHeight
            let newLength;

            let toRemove = Math.max(1, Math.floor((1 - clientHeight / scrollHeight) * this.innerText.length * 0.5));

            // debug('#' + this.loopCount);
            // debug('  scrollHeight', scrollHeight);
            // debug('  clientHeight', clientHeight);
            // debug('      toRemove', toRemove);

            newLength = Math.max(minLength, this.innerText.length - toRemove);
            this.innerText = this.innerText.substr(0, newLength) + '…';

            // We're bypassing react's rendering so we don't slow things down while adjusting
            element.innerText = this.innerText;
            requestAnimationFrame(() => this.checkSize());

        } else if (this.renderState === RS_MEASURE) {

            // First measurement, but it all fits
            this.renderState = RS_STABLE;
            this.forceUpdate(); // Re-render via react

        } else if (this.renderState === RS_FLUID) {

            // Last change to text has made it fit :)

            let duration = Math.round(performance.now() - this.fluidTime);
            debug('checkSize() stable after', this.loopCount, 'iterations', duration, 'ms');

            this.renderState = RS_STABLE;
            this.forceUpdate();
        }
    }

    render() {

        // debug('render()', this.innerText);

        let {
            style = {},
            className
        } = this.props;

        if (this.renderState !== RS_STABLE) {
            style.alpha = 0;
        }

        return (
            <div style={style} className={className}>{this.innerText}</div>
        );
    }

    componentDidMount() {
        if (this.renderState !== RS_STABLE) {
            requestAnimationFrame(() => this.checkSize());
        }
    }

    componentDidUpdate() {
        if (this.renderState !== RS_STABLE) {
            requestAnimationFrame(() => this.checkSize());
        }
    }
}
