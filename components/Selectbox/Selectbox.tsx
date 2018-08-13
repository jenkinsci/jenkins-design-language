import * as React from 'react';
import { Creatable, Options, Option, OptionValues } from 'react-select';

export interface SelectboxProps {
    readonly options: Options<OptionValues>;
    readonly value?: OptionValues;
    readonly onChange?: (selectedOption: Option) => void;
}

export interface SelectboxState {
    readonly selectedOption: OptionValues;
}

export class Selectbox extends React.Component<SelectboxProps, SelectboxState> {
    readonly state: SelectboxState = {
        selectedOption: this.props.value || '',
    };

    handleChange = (selectedOption: Option<OptionValues>) => {
        this.setState({
            ...this.state,
            selectedOption: selectedOption.value || '',
        });

        if (this.props.onChange) {
            this.props.onChange(selectedOption);
        }
    };

    render() {
        const defaults = {
            className: 'Selectbox',
            clearable: false,
        };

        return (
            <Creatable
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.props.options}
                {...defaults}
            />
        );
    }
}
