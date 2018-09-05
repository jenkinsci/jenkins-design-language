import * as React from 'react';
import { validateInput } from '../Validation';

export interface FormInputProps<T> {
    value: T;
    onChange: (value: T) => void;
    validation?: string[];
}

export interface FormInputTextProps extends FormInputProps<string> {
    placeholder?: string;
}

export interface FormInputState<T> {
    value: T;
    isValid: boolean;
    message: string;
}

export class InputText extends React.Component<FormInputTextProps, FormInputState<string>> {
    state = {
        value: this.props.value,
        isValid: false,
        message: '',
    };

    onChange(e: React.FormEvent<HTMLInputElement>) {
        const { value } = e.currentTarget;
        this.props.onChange(value);
        validateInput(value, this);
    }

    render() {
        const { value } = this.state;
        return (
            <>
                <input
                    {...this.props} // don't do this normally
                    type="text"
                    value={value}
                    onChange={event => this.onChange(event)}
                />
                <span>{this.state.message}</span>
            </>
        );
    }
}
