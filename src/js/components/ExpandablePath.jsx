/**
 * Created by cmeyers on 10/4/16.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'react-material-icons-blue';

const NUM_LABELS_TO_SHOW = 3;

/**
 * ExpandablePath displays a list of path elements with built-in truncation logic.
 * By default the first, last and second-to-last path items will always be shown as labels.
 * Intermediate path items will be displayed as folder icons and expand to show labels on hover.
 *
 * Props:
 *      className: CSS class to put on root element
 *      iconSize: for folder icons, in pixels
 *      path: a forward-slash delimited string of a path, e.g. 'folder1/folder2/pipeline'
 *      hideFirst: set to true to display the first path element as a folder.
 */
export class ExpandablePath extends Component {

    render() {
        if (!this.props.path) {
            return null;
        }

        const pathElements = this.props.path.split('/');
        const showFolders = this.props.hideFirst || pathElements.length > NUM_LABELS_TO_SHOW;
        const extraClass = this.props.className || '';
        let foldersClass = showFolders ? 'show-folders' : '';
        foldersClass += this.props.hideFirst ? ' first-folder' : '';

        return (
            <span className={`expandable-path ${extraClass}`}>
                <ul className={`path-list ${foldersClass}`}>
                    { pathElements.map((pathElem, index) => (
                        <li key={index} className="path-item">
                            <Icon size={this.props.iconSize} icon="folder" style={ { fill: '#ccc' } } />
                            <span className="path-text">{pathElem}</span>
                            <span className="separator">/</span>
                        </li>
                    ))}
                </ul>
            </span>
        );
    }
}

ExpandablePath.propTypes = {
    className: PropTypes.string,
    iconSize: PropTypes.number,
    path: PropTypes.string,
    hideFirst: PropTypes.bool,
};

ExpandablePath.defaultProps = {
    iconSize: 16,
    hideFirst: false,
};
