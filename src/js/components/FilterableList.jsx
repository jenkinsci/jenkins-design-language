// @flow

import React, { PropTypes } from 'react';
import debounce from 'lodash.debounce';

import { List } from './List';
import { TextInput } from './forms/TextInput';

type Props = {
    className?: string,
    children?: ReactChildren,
    style: Object,
    listStyle: Object,
    data?: Array<Object>,
    labelFunction?: Function,
    keyFunction?: Function,
    defaultStyles?: bool,
    defaultSelection?: Object,
    onItemSelect?: Function,

    filterFunction: Function,
    placeholder: string,
    emptyText: string,
}

type State = {
    text?: string,
};

function defaultFilterFunction(text, item) {
    return item && item.toString().indexOf(text) >= 0;
}


/**
 * Control that displays a List of items and allows for selection.
 * Functions like a list of radio buttons from a keyboard accessibility standpoint.
 * By default it uses a simple renderer that converts each object to a string.
 * A custom renderer can be provided as a single React child to the element, e.g.
 *      <List data={data}>
 *          <MyRenderer />
 *      </List>
 *
 *      function MyRenderer(props) {
 *          return (
 *              <div>{props.listIndex} {props.listItem}</div>
 *          );
 *      }
 * Custom render will receive three props: listIndex, listItem and labelFunction (from parent)
 * A keyFunction is encouraged to generate a React key for each row. Default is to use listIndex.
 *
 * @property {string} className additional "class" to add to outermost element (alongside "List")
 * @property {array} children React children
 * @property {Object} style React style object
 * @property {array} [data] data to render in the list.
 * @property {Function} [labelFunction] converts each object to a string in the default renderer.
 * @property {Function} [keyFunction]
 * @property {boolean} [defaultStyles] set "false" to remove all default styling from the List.
 * @property {Object} [defaultSelection] item to select in the list by default
 * @property {Function} [onItemSelect] callback when an item is selected, receiving listIndex and listItem.
 */
export class FilterableList extends React.Component {

    props: Props;
    state: State;

    static defaultProps: Props = {
        style: {},
        listStyle: {},
        filterFunction: defaultFilterFunction,
        placeholder: 'Search...',
        emptyText: 'No matches.'
    };

    constructor(props:Props) {
        super(props);

        this.state = {};
    }

    _onFilterChange = debounce(text => {
        this.setState({
            text,
        });
    }, 250);

    render() {
        const { data, emptyText, filterFunction, style } = this.props;
        const { text } = this.state;

        const filtered = data ? data.filter(item => !text || filterFunction(text, item)) : [];
        const noMatches = text && filtered.length === 0;

        const listProps = Object.assign({}, this.props, {
            className: null,
            children: null,
            style: null,
            filterFunction: null,
            placeholder: null,
            emptyText: null,
        });
        const listStyle = Object.assign({}, this.props.listStyle);

        if (filtered.length === 0) {
            listStyle.display = 'none';
        }

        return (
            <div className={`FilterableList`} style={style}>
                <TextInput
                    placeholder={this.props.placeholder}
                    onChange={text => this._onFilterChange(text)}
                />

                { noMatches && emptyText &&
                    <div className="FilterableList-empty">{emptyText}</div>
                }

                <List {...listProps} data={filtered} style={listStyle}>
                    {this.props.children}
                </List>
            </div>
        );
    }
}

FilterableList.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    style: PropTypes.object,
    filterFunction: PropTypes.func,
    placeholder: PropTypes.string,
    emptyText: PropTypes.string,
    listStyle: PropTypes.object,
    // from List
    data: PropTypes.array,
    labelFunction: PropTypes.func,
    keyFunction: PropTypes.func,
    defaultStyles: PropTypes.bool,
    defaultSelection: PropTypes.any,
    onItemSelect: PropTypes.func,
};
