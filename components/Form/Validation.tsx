import * as React from 'react';
import { isEmail, isEmpty, isInt } from 'validator';

const validators = {
    numeric: {
        message: () => 'This is a numeric field.',
        isValid: (value: string) => isInt(value, { min: 0 }),
    },
    email: {
        message: () => 'Please enter a valid email address.',
        isValid: (value: string) => isEmpty(value) || isEmail(value),
    },
    required: {
        message: () => 'This field is required.',
        isValid: (value: string) => !isEmpty(value),
    },
};

const stripTags = (value: string) => value.replace(/(<([^>]+)>)|(\`)|(\*)/gi, '');

const handleState = (
    component: React.Component,
    currentValidator: any,
    value: any,
    isDisabled: boolean
) => {
    if (!isDisabled && currentValidator) {
        let message = validators[currentValidator].message();
        component.setState({
            isValid: false,
            message,
            value,
        });
    } else {
        component.setState({
            isValid: true,
            message: '',
            value,
        });
    }
};

export const validateInput = (
    val: string,
    component: React.Component | any,
    isDisabled = false
) => {
    const value = val === undefined || val === null ? '' : String(stripTags(val));
    const validation = component.props.validation;
    if (validation) {
        const currentValidator = validation.find((item: string) => {
            if (!validators[item]) {
                console.error('Invalid validator <"' + item + '">');
                return false;
            }
            return !validators[item].isValid(value);
        });
        handleState(component, currentValidator, value, isDisabled);
    }
};
