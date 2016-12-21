import React, { PropTypes } from 'react';
import debounce from 'lodash.debounce';

import { FloatingElement } from '../FloatingElement';
import KeyCodes from '../../KeyCodes';

const POSITION = {
    FIRST: 'first',
    PREV: 'prev',
    NEXT: 'next',
    LAST: 'last',

    values: () => {
        return [POSITION.FIRST, POSITION.PREV, POSITION.NEXT, POSITION.LAST];
    }
};

export class FlyoutMenu extends React.Component {

    constructor(props) {
        super(props);

        this.menuRef = null;
        this.lastScrollTop = 0;
    }

    componentDidMount() {
        this.menuRef.addEventListener('keydown', this._handleKeyEvent);
    }

    componentWillUnmount() {
        this.menuRef.removeEventListener('keydown', this._handleKeyEvent);
    }

    setInitialFocus() {
        console.log('setInitialFocus', this.props);
        if (this.props.selectedOption) {
            const selectedIndex = this.props.options.indexOf(this.props.selectedOption);
            const selectedListItem = this.menuRef.children[selectedIndex];
            this._focusListItem(selectedListItem);
        } else {
            this._changeFocusPosition(POSITION.FIRST);
        }
    }

    _defaultSelection(props) {
        if (!this.props.selectedOption && props.defaultOption) {
            this.setState({
                selectedOption: props.defaultOption,
            });
        }
    }

    _handleKeyEvent = (event) => {
        // console.log('_handleKeyEvent');

        const { keyCode } = event;

        switch (keyCode) {
            // don't let arrow keys scroll the content; focus change will do that for us
            case KeyCodes.ARROW_DOWN:
                event.preventDefault();
                this._changeFocusPosition(POSITION.NEXT);
                break;
            case KeyCodes.ARROW_UP:
                event.preventDefault();
                this._changeFocusPosition(POSITION.PREV);
                break;
            // page/up down scrolls as normal but applies focus
            case KeyCodes.PAGE_DOWN:
            case KeyCodes.PAGE_UP:
                this._syncFocusAfterScroll();
                break;
            case KeyCodes.HOME:
                this._changeFocusPosition(POSITION.FIRST);
                break;
            case KeyCodes.END:
                this._changeFocusPosition(POSITION.LAST);
                break;
            case KeyCodes.SPACEBAR:
            case KeyCodes.ENTER:
                event.preventDefault();
                this._selectFocusedItem();
                break;
            default:
                break;
        }
    };

    _onMenuScrollEvent = () => {
        this._syncFocusAfterScroll();
    };

    _syncFocusAfterScroll = debounce(() => {
        if (this.menuRef.scrollTop === this.lastScrollTop) {
            return;
        }

        const scrollDown = this.menuRef.scrollTop > this.lastScrollTop;
        this.lastScrollTop = this.menuRef.scrollTop;
        const rect = this.menuRef.getBoundingClientRect();
        const nextFocusItem = scrollDown ?
            document.elementFromPoint(rect.left + 1, rect.top + rect.height - 2) :
            document.elementFromPoint(rect.left + 1, rect.top + 1);

        this._focusListItem(nextFocusItem.parentNode);
    }, 200);

    _changeFocusPosition(position) {
        if (POSITION.values().indexOf(position) === -1) {
            return;
        }

        if (position === POSITION.FIRST || !this.menuRef.contains(document.activeElement)) {
            const listItem = this.menuRef.children[0];
            this._focusListItem(listItem);
            return;
        }

        const allListItems = [].slice.call(this.menuRef.children);

        if (position === POSITION.NEXT || position === POSITION.PREV) {
            const focusedListItem = document.activeElement.parentNode;
            const focusedIndex = allListItems.indexOf(focusedListItem);
            const nextFocusIndex = focusedIndex + (position === POSITION.NEXT ? 1 : -1);

            if (0 <= nextFocusIndex && (nextFocusIndex <= allListItems.length - 1)) {
                const nextListItem = allListItems[nextFocusIndex];
                this._focusListItem(nextListItem);
            }
        } else if (position === POSITION.LAST) {
            this._focusListItem(allListItems[allListItems.length - 1]);
        }
    }

    _focusListItem(listItemNode) {
        // console.log('_focusListItem', listItemNode);
        if (this.menuRef.contains(listItemNode)) {
            // need to delay ~1 frame for the focus and scroll to be reliable
            setTimeout(() => {
                listItemNode.children[0].focus();

                const listItemRect = listItemNode.getBoundingClientRect();
                const menuRect = this.menuRef.getBoundingClientRect();

                // make the focused item "stick" to top or bottom edge
                if (listItemRect.top < menuRect.top) {
                    this.menuRef.scrollTop = listItemNode.offsetTop;
                } else if (listItemRect.bottom > menuRect.bottom) {
                    this.menuRef.scrollTop += listItemRect.bottom - menuRect.bottom;
                }
            }, 1000/60);
        }
    }

    /**
     * Updates the dropdown's state such that its selectedOption corresponds to the item which currently has focus.
     * @private
     */
    _selectFocusedItem() {
        if (this.menuRef.contains(document.activeElement)) {
            const allListItems = [].slice.call(this.menuRef.children);
            const focusedListItem = document.activeElement.parentNode;
            const focusedIndex = allListItems.indexOf(focusedListItem);
            const selectedOption = this.props.options[focusedIndex];
            this._applySelection(selectedOption, focusedIndex);
        }
    }

    _onMenuItemClick(event, option, index) {
        // prevent any navigation resulting from click
        event.preventDefault();
        this._applySelection(option, index);
    }

    _applySelection(option, index) {
        this.setState({
            selectedOption: option,
        });

        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(option, index);
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
        const { targetElement, positionFunction } = this.props;

        return (
            <FloatingElement targetElement={targetElement} positionFunction={positionFunction}>
                <ul
                    ref={list => { this.menuRef = list; }}
                    className="Flyout-menu"
                    onWheel={this._onMenuScrollEvent}
                >
                    { this.props.options.map((option, index) => {
                        const selectedClass = this.props.selectedOption === option ? 'Flyout-menu-item-selected' : '';
                        const optionLabel = this._optionToLabel(option);

                        return (
                            <li key={index} data-position={index}>
                                <a className={`Flyout-menu-item ${selectedClass}`}
                                   href="#"
                                   onClick={event => this._onMenuItemClick(event, option, index)}
                                >
                                    {optionLabel}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </FloatingElement>
        );
    }
}

FlyoutMenu.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    selectedOption: PropTypes.string,
    labelField: PropTypes.string,
    labelFunction: PropTypes.func,
    targetElement: PropTypes.node,
    positionFunction: PropTypes.func,
    onSelectionChange: PropTypes.func,
};
