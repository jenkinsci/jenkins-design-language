import React, { PropTypes } from 'react';
import { Icon } from '@jenkins-cd/react-material-icons';
import { TextInput } from './TextInput';

export function IconTextInput(props) {
    const classLeft = props.iconLeft ? 'u-icon-left' : '';
    const classRight = props.iconRight ? 'u-icon-right': '';

    return (
        <div className={`IconTextInput ${classLeft} ${classRight}`}>
            { classLeft && <Icon className={`IconTextInput-Icon ${classLeft}`} icon={props.iconLeft} /> }
            <TextInput placeholder="Search..." />
            { classRight && <Icon className={`IconTextInput-Icon ${classRight}`} icon={props.iconRight} /> }
        </div>
    );
}

IconTextInput.propTypes = {
    iconLeft: PropTypes.string,
    iconRight: PropTypes.string,
};
