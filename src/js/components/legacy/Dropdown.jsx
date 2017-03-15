import React, { PropTypes } from 'react';
import { Dropdown as ComposedDropdown } from '../controls/Dropdown';


export class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,
        };
    }

    componentWillMount() {
        this._defaultSelection(this.props);
    }

    get selectedOption() {
        return this.state.selectedOption;
    }

    _defaultSelection(props) {
        if (!this.state.selectedOption && props.defaultOption) {
            this.setState({
                selectedOption: props.defaultOption,
            });
        }
    }

    _onChange(option, index) {
        this.setState({
            selectedOption: option,
        });

        if (this.props.onChange) {
            this.props.onChange(option, index);
        }
    }

    render() {
        const { selectedOption } = this.state;

        return (
            <ComposedDropdown
                { ...this.props}
                selectedOption={selectedOption}
                onChange={(option, index) => this._onChange(option, index)}
            />
        );
    }

}

Dropdown.propTypes = {
    ...ComposedDropdown.propTypes,
    defaultOption: PropTypes.object,
};

Dropdown.defaultProps = {
    ...ComposedDropdown.defaultProps
};
