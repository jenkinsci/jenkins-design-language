import * as React from 'react';

export interface FormInputProps<T> {
    value: T;
    onChange: (value: T) => void;
}

export interface FormInputTextProps extends FormInputProps<string> {
    placeholder?: string;
}

export interface FormInputState<T> {
    value: T;
}

export class InputText extends React.Component<FormInputTextProps, FormInputState<string>> {
    state = { value: this.props.value }; // FIXME should not need state here, it's unclear why just relying on `this.props.value` doesn't work
    onChange(event: any) {
        // TODO not 'any'
        const value = event.target.value;
        this.props.onChange(value);
        this.setState({ value });
    }
    render() {
        const { value } = this.state;
        return (
            <input
                {...this.props} // don't do this normally
                type="text"
                value={value}
                onChange={event => this.onChange(event)}
            />
        );
    }
}
