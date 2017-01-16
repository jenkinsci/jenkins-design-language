import React, { PropTypes } from 'react';
import { Icon } from '@jenkins-cd/react-material-icons';

/**
 * button element with icon.
 * Use "iconName" for standard material-ui icons
 * Use "children" for custom icon. Provide element (e.g. raw svg), or React component
 *
 * @param {object} [children] - React element or custom component to render as icon
 * @param {string} [className] - custom class name for outer element
 * @param {object} [style] - custom style object
 * @param {string} [label] - button text
 * @param {string} [iconName] - name of material-ui icon to display
 * @param {number} [iconSize] - width/height of icon
 * @param {string} [iconFill] - color code to apply as fill
 * @param {function} [onClick] - onclick callback function
 * @constructor
 */
export function IconButton({children, className, style, label, iconName, iconSize, iconFill, onClick}) {
    function _onClick() {
        if (onClick) {
            onClick();
        }
    }

    let icon = null;

    if (iconName) {
        // use react-material-icons and adapt IconButton props to Icon's API
        const materialProps = {
            size: iconSize,
            style: {
                fill: iconFill
            }
        };
        icon = <Icon icon={iconName} {...materialProps} />;
    } else if (children) {
        // pass down props of interest to the child so it can react
        const iconProps = {
            width: iconSize,
            height: iconSize,
            size: iconSize,
            fill: iconFill,
        };

        icon = React.cloneElement(children, iconProps);
    }

    const iconNameClass = iconName ? `u-icon-${iconName}` : '';
    const materialClass = iconName ? 'u-material-icon' : '';
    const spacingClass = label && icon ? 'u-inner-margin' : '';

    return (
        <button
            className={`IconButton ${className} ${iconNameClass} ${materialClass} ${spacingClass}`}
            style={style}
            onClick={_onClick}
        >
            { icon &&
            <span className="IconButton-icon">{icon}</span>
            }
            { label &&
            <span className="IconButton-text">{label}</span>
            }
        </button>
    );
}

IconButton.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    style: PropTypes.object,
    label: PropTypes.string,
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    iconFill: PropTypes.string,
    onClick: PropTypes.func,
};

IconButton.defaultProps = {
    className: '',
};
