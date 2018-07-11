import * as React from 'react';
import { Creatable, Options, Option, OptionValues } from 'react-select';
import 'react-select/dist/react-select.css';

export interface DropdownProps {
    readonly options: Options<OptionValues>;
    readonly value?: OptionValues;
    readonly onChange?: (selectedOption: Option) => void;
}

export interface DropdownState {
    readonly selectedOption?: OptionValues;
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
    constructor(props: DropdownProps) {
        super(props);

        this.state = {
            selectedOption: this.props.value || '',
        };
    }

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
            className: 'Dropdown',
            isValidNewOption: () => false,
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
