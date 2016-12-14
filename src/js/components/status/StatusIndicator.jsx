// @flow

import React, {Component, PropTypes} from 'react';
import SvgSpinner from './SvgSpinner';
import SvgStatus from './SvgStatus';

const validResultValues = {
    success: 'success',
    failure: 'failure',
    running: 'running',
    queued: 'queued',
    paused: 'paused',
    unstable: 'unstable',
    aborted: 'aborted',
    not_built: 'not_built',
    unknown: 'unknown'
};

// Enum type from const validResultValues
export type Result = $Keys<typeof validResultValues>;

// Clean up result value, or return "invalid" value
export function decodeResultValue(resultMaybe: any):Result {
    if (resultMaybe) {
        const lcResult = String(resultMaybe).toLowerCase();
        if (validResultValues.hasOwnProperty(lcResult)) {
            return validResultValues[lcResult];
        }
    }
    return 'unknown';
}

// Returns the correct <g> element for the result / progress percent
export function getGroupForResult(result: Result, percentage: number, radius: number) {
    if (usesSvgSpinner(result)) {
        return <SvgSpinner radius={radius} result={result} percentage={percentage}/>;
    } else {
        return <SvgStatus radius={radius} result={result}/>;
    }
}

// indicates whether result should use the Spinner (or Status)
function usesSvgSpinner(result: Result) {
    switch (result) {
        case 'running':
        case 'queued':
        case 'not_built':
            return true;
        default:
            return false;
    }
}

class StatusIndicator extends Component {

    static validResultValues:typeof validResultValues;

    render() {
        const {
            result,
            percentage,
            width = '24px',
            height = '24px',
            noBackground,
        } = this.props;

        const groupClasses = [
            'svgResultStatus',
            noBackground ?
                'no-background' : null
        ];

        const radius = 12; // px.
        const resultClean = decodeResultValue(result);

        const translate = `translate(${radius} ${radius})`;
        // SvgStatus needs to be scaled up to fill the available space when no bg is used
        const scale = noBackground && !usesSvgSpinner(resultClean) ?
            'scale(2,2)' : null;

        const transforms = [
            translate,
            scale,
        ];

        return (
            <svg className={groupClasses.join(' ')} xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${2 * radius} ${2 * radius}`} width={width} height={height}
            >
                <title>{resultClean}</title>
                <g transform={transforms.join(' ')}>
                    {getGroupForResult(resultClean, percentage, radius)}
                </g>
            </svg>
        );
    }
}

StatusIndicator.propTypes = {
    result: PropTypes.string,
    percentage: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string,
    noBackground: PropTypes.bool,
};

StatusIndicator.validResultValues = validResultValues;

export {StatusIndicator, SvgSpinner, SvgStatus};
