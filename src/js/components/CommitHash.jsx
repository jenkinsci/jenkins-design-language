// @flow

import React, {Component, PropTypes} from 'react';

const GIT_HASH_REGEX = /\b[0-9a-f]{5,40}\b/;

/**
 * Displays a commit hash in the proper style.
 */
export class CommitHash extends Component {
    render() {
        let displayValue;
        if (GIT_HASH_REGEX.test(this.props.commitId)) {
            displayValue = this.props.commitId.substring(0, 7);
        } else {
            displayValue = this.props.commitId;
        }
        return (<code className="hash">{displayValue}</code>);
    }
}

CommitHash.propTypes = {
    commitId: PropTypes.string,
};
