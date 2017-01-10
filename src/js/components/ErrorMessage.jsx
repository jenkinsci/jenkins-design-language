import React, { PropTypes } from 'react';

export function ErrorMessage(props) {
    const extraClass = props.className;
    return (
        <div className={`ErrorMessage ${extraClass}`}>{props.children || props.text}</div>
    );
}

ErrorMessage.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    text: PropTypes.string,
};

ErrorMessage.defaultProps = {
    className: '',
    text: ''
};
