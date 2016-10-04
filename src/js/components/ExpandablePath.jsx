/**
 * Created by cmeyers on 10/4/16.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'react-material-icons-blue';

/**
 * ExpandablePath
 */
export class ExpandablePath extends Component {

    _renderPathList(pathElements) {
        const longPathClass = pathElements.length > 2 ? 'long-path' : '';

        return (
            <ul className={`path-list ${longPathClass}`}>
                { pathElements.map((pathElem, index) => (
                    <li key={index} className="path-item">
                        <Icon size={this.props.iconSize} icon="folder" style={ { fill: '#ccc' } } />
                        <span className="path-text">{pathElem}</span>
                        <span className="separator">&nbsp;/&nbsp;</span>
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        if (!this.props.path) {
            return null;
        }

        const extraClass = this.props.className || '';
        const pathElements = this.props.path.split('/');

        return (
            <span className={`expandable-path ${extraClass}`}>
                { this.props.link ?
                    <a className="link" href={this.props.link}>
                        {this._renderPathList(pathElements)}
                    </a>
                :
                    this._renderPathList(pathElements)
                }
            </span>
        );
    }
}

ExpandablePath.propTypes = {
    className: PropTypes.string,
    iconSize: PropTypes.number,
    path: PropTypes.string,
    link: PropTypes.string,
};

ExpandablePath.defaultProps = {
    iconSize: 16,
};
