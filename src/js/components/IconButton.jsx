import React, { PropTypes } from 'react';
import { Icon } from '@jenkins-cd/react-material-icons';

export function IconButton(props) {
    function onClick() {
        if (props.onClick) {
            props.onClick();
        }
    }

    const { children, className, style, label, iconName, iconFill, iconSize } = props;

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
    const materialClass = iconName ? 'u-material-spacing' : '';
    const spacingClass = label && icon ? 'u-inner-margin' : '';

    return (
        <button
            className={`IconButton ${className} ${iconNameClass} ${materialClass} ${spacingClass}`}
            style={style}
            onClick={onClick}
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
