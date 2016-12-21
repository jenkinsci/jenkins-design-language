import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '@jenkins-cd/react-material-icons';

import { FlyoutMenu } from './_FlyoutMenu';
import KeyCodes from '../../KeyCodes';

export class Dropdown extends React.Component {

    constructor(props) {
        super(props);

        this.buttonRef = null;
        this.thumbRef = null;
        this.menuRef = null;
        this.lastScrollTop = 0;

        this.state = {
            menuOpen: false,
            selectedOption: null,
        };
    }

    componentWillMount() {
        this._defaultSelection(this.props);
    }

    componentDidMount() {
        document.addEventListener('keydown', this._handleKeyEvent);
        document.addEventListener('mousedown', this._handleMouseEvent);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.menuOpen && !prevState.menuOpen) {
            this.menuRef.setInitialFocus();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKeyEvent);
        document.removeEventListener('mousedown', this._handleMouseEvent);
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

    _toggleDropdownMenu() {
        if (this.state.menuOpen) {
            this._closeDropdownMenu();
        } else {
            this._openDropdownMenu();
        }
    }

    _openDropdownMenu() {
        this.setState({
            menuOpen: true,
        });
    }

    _closeDropdownMenu() {
        this.setState({
            menuOpen: false,
        });
    }

    // (note: also triggered via spacebar press when button has focus)
    _onDropdownMouseEvent = (event) => {
        // console.log('_onDropdownMouseEvent');
        // prevent navigation if anchor was clicked
        event.preventDefault();
        this._toggleDropdownMenu();
    };

    _handleKeyEvent = (event) => {
        // console.log('_handleKeyEvent', this.state.menuOpen);
        if (!this.state.menuOpen) {
            return;
        }

        const { keyCode } = event;

        switch (keyCode) {
            case KeyCodes.TAB:
                // tabbing while open will advance to the next element after this Dropdown
                this._closeDropdownMenu();
                break;
            case KeyCodes.ESC:
                this._closeDropdownMenu();
                break;
            default:
                break;
        }
    };

    _handleMouseEvent = (event) => {
        // console.log("_handleMouseEvent");
        const { clientX, clientY } = event;

        if (this.state.menuOpen) {
            const element = document.elementFromPoint(clientX, clientY);

            // close the dropdown only if the user clicked "outside" of it
            // (only if the button, thumb and menu was not clicked)
            // clicking those elements will actually close the it via different means
            const clickedOutsideDropdown = !this.buttonRef.contains(element) &&
                !this.thumbRef.contains(element) &&
                !ReactDOM.findDOMNode(this.menuRef).contains(element);

            if (clickedOutsideDropdown) {
                this._closeDropdownMenu();
            }
        }
    };

    _onSelectionChange(option, index) {
        this.setState({
            selectedOption: option,
            menuOpen: false,
        });

        if (this.props.onChange) {
            this.props.onChange(option, index);
        }
    }

    _optionToLabel(option) {
        if (!option) {
            return '';
        }

        if (this.props.labelField) {
            return option[this.props.labelField];
        } else if (this.props.labelFunction) {
            return this.props.labelFunction(option);
        } else {
            return option.toString();
        }
    }

    render() {
        // console.log('render', this.state.menuOpen);
        const { options, labelField, labelFunction } = this.props;
        const selectedOption = this.state.selectedOption || this.props.defaultOption;
        const extraClass = this.props.className || '';
        const openClass = this.state.menuOpen ? 'Dropdown-menu-open' : 'Dropdown-menu-closed';
        const promptClass = !this.state.selectedOption ? 'Dropdown-placeholder' : '';
        const buttonLabel = this._optionToLabel(this.state.selectedOption) || this.props.placeholder;

        return (
            <div className={`Dropdown ${openClass} ${extraClass}`}>
                <button ref={button => { this.buttonRef = button; }}
                    className={`Dropdown-button ${promptClass}`}
                    disabled={this.props.disabled}
                    title={buttonLabel}
                    onClick={this._onDropdownMouseEvent}
                >
                    {buttonLabel}
                </button>

                <a ref={thumb => { this.thumbRef = thumb; }}
                    className="Dropdown-thumb"
                    onClick={this._onDropdownMouseEvent}
                >
                    <Icon icon="keyboard_arrow_down" size={16} />
                </a>

                { this.state.menuOpen &&
                    <FlyoutMenu
                        ref={menu => { this.menuRef = menu; } }
                        targetElement={this.buttonRef}
                        positionFunction={positionMenu}
                        onSelectionChange={(opt, index) => this._onSelectionChange(opt, index)}
                        { ... {
                            options,
                            selectedOption,
                            labelField,
                            labelFunction,
                        }}
                    />
                }
            </div>
        );
    }

}

const BORDER_OFFSET:number = 2;

// eslint-disable-next-line max-len, no-unused-vars
function positionMenu(selfWidth:number, selfHeight:number, targetWidth:number, targetHeight:number, targetLeft:number, targetTop:number, viewportWidth:number, viewportHeight:number) {
    return {
        newLeft: targetLeft,
        newTop: targetTop + targetHeight + BORDER_OFFSET,
    };
}

Dropdown.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    defaultOption: PropTypes.string,
    labelField: PropTypes.string,
    labelFunction: PropTypes.func,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    placeholder: 'Select an option',
};
