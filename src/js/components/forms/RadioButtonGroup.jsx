/**
 * Created by cmeyers on 11/1/16.
 */
import React, { PropTypes } from 'react';

/**
 * Renders a group of radio buttons for the provided 'options'
 * By default the radio buttons are arranged vertically
 *
 * Props:
 *      className: additional class name(s) to add to root element.
 *          Use 'horizontal-layout' to change layout direction.
 *      options: an array of options to map to radio buttons. Can be strings or objects.
 *      defaultOption: option to select/check by default if no selection was already made by user.
 *      labelField: if using objects for options, name of property to use for label.
 *      labelFunction: a function that receives the option and returns a string for label.
 *      onChange: handler func calls when user changes selection, receiving 'option' as only arg.
 */
export class RadioButtonGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,
        };
    }

    componentWillMount() {
        this._defaultSelection(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._defaultSelection(nextProps);
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

    _onChange(option) {
        this.setState({
            selectedOption: option,
        });

        if (this.props.onChange) {
            this.props.onChange(option);
        }
    }

    render() {
        const extraClass = this.props.className || '';

        return (
            <div className={`radio-button-group ${extraClass}`}>
                <div className="radio-button-wrapper">
                    { this.props.options.map((option, index) => {
                        const checked = option === this.state.selectedOption;

                        let labelValue = '';

                        if (this.props.labelField) {
                            labelValue = option[this.props.labelField];
                        } else if (this.props.labelFunction) {
                            labelValue = this.props.labelFunction(option);
                        } else {
                            labelValue = option.toString();
                        }

                        return (
                            <label
                              key={index}
                              className="radio-item"
                            >
                                <input
                                  className="radio-button"
                                  type="radio"
                                  checked={checked}
                                  onChange={() => this._onChange(option)}
                                />
                                <span className="radio-text">{labelValue}</span>
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    }

}

RadioButtonGroup.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    defaultOption: PropTypes.any,
    labelField: PropTypes.string,
    labelFunction: PropTypes.func,
    onChange: PropTypes.func,
};