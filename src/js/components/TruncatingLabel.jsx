// @flow

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

type Props = *; // TODO: Actual props

function debug(...rest) {
    // TODO: Remove this
    console.log('TL-DBG', ...rest);
}

const MINLENGTH = 5; // Minimum size of cut-down text
const MAXLOOPS = 50; // Max no of iterations attempting to find the correct size text

const RS_MEASURE = 'measure'; // Mounted, text/props changed, measurement needed.
const RS_FLUID = 'fluid'; // Text too big, in the process of trimming it down
const RS_STABLE = 'stable'; // Done measuring, until props change

// TODO: Docs
export class TruncatingLabel extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.handleProps(this.props);
    }

    componentWillReceiveProps(nextProps:Props) {
        this.handleProps(nextProps);
    }

    handleProps(props) {

        const {children = ""} = props;

        if (typeof children === "string") {
            this.completeText = children;
        } else if (children === null || children === false) {
            this.completeText = ""; // Assume content has been boolean'd out
        } else {
            console.warn("TruncatingLabel - Label children must be string but is", typeof children, children);
            this.completeText = "Contents must be string";
        }

        this.renderState = RS_MEASURE;
        this.innerText = this.completeText;
        this.loopCount = 0;
        this.fluidTime = 0;
        this.longestGood = MINLENGTH;
        this.shortestBad = this.innerText.length;
    }

    invalidateSize() {
        if (!this.checkSizeRequest) {
            this.checkSizeRequest = requestAnimationFrame(() => this.checkSize());
        }
    }

    checkSize() {
        this.checkSizeRequest = 0;

        if (this.renderState === RS_STABLE) {
            return; // Nothing to check, no more checks to schedule
        }

        let thisElement = ReactDOM.findDOMNode(this);

        let {
            scrollHeight,
            clientHeight,
            scrollWidth,
            clientWidth
        } = thisElement;

        const tooBig = scrollHeight > clientHeight || scrollWidth > clientWidth;

        if (this.renderState === RS_MEASURE) {
            // First measurement since mount / props changed

            if (tooBig) {
                this.renderState = RS_FLUID;
                
                // Set initial params for binary search of length 
                this.longestGood = MINLENGTH;
                this.textCutoffLength = this.shortestBad = this.innerText.length;
            } else {
                this.renderState = RS_STABLE;
                this.forceUpdate(); // Re-render via react so it can update the alpha
            }
        }

        if (this.renderState === RS_FLUID) {
            this.loopCount++;
            this.fluidTime = this.fluidTime || performance.now();

            const lastLength = this.textCutoffLength;
            let keepMeasuring;

            if (this.loopCount >= MAXLOOPS) {
                // This really shouldn't happen!
                console.error('TruncatingLabel - TOO MANY LOOPS');
                keepMeasuring = false;
            } else if (lastLength <= MINLENGTH) {
                keepMeasuring = false;
            } else if (Math.abs(this.shortestBad - this.longestGood) < 2) {
                // debug('Found optimum length!', lastLength);
                keepMeasuring = false;
            } else {
                
                // Update search space
                if (tooBig) {
                    this.shortestBad = Math.min(this.shortestBad, lastLength);
                } else {
                    this.longestGood = Math.max(this.longestGood, lastLength);
                }

                // Calculate the next length and update the text
                this.textCutoffLength = Math.floor((this.longestGood + this.shortestBad) / 2);
                this.innerText = this.completeText.substr(0, this.textCutoffLength) + '…';

                // Bypass react's render loop during the "fluid" state for performance
                thisElement.innerText = this.innerText;

                // debug('-------- tooBig', tooBig);
                // debug('     lastLength', lastLength);
                // debug('    longestGood', this.longestGood);
                // debug('     textCutoff', this.textCutoffLength);
                // debug('    shortestBad', this.shortestBad);

                keepMeasuring = true;
            }

            if (keepMeasuring) {
                this.invalidateSize();
            } else {

                // let duration = Math.round(performance.now() - this.fluidTime);
                // debug('checkSize() stable after', this.loopCount, 'iterations', duration, 'ms');

                this.renderState = RS_STABLE;
                this.forceUpdate(); // Re-render via react so it knows about updated alpha and final content
            }
        }
    }

    render() {
        let {
            style = {},
            className = ''
        } = this.props;

        style = {
            overflow: 'hidden',
            wordWrap: 'break-word',
            ...style
        };

        if (this.renderState !== RS_STABLE) {
            style.opacity = 0;
        }

        return (
            <div style={style} className={'TruncatingLabel ' + className}>{this.innerText}</div>
        );
    }

    componentDidMount() {
        this.invalidateSize();
    }

    componentDidUpdate() {
        this.invalidateSize();
    }

    componentWillUnmount() {
        if (this.checkSizeRequest) {
            cancelAnimationFrame(this.checkSizeRequest);
            this.checkSizeRequest = 0;
        }
    }
}
