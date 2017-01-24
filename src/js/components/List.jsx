import React, { PropTypes } from 'react';
import Utils from '../Utils';

type Props = {
    className?: string,
    children?: ReactChildren,
    style?: Object,
    data?: Array<Object>,
    labelFunction?: Function,
    defaultStyles: bool,
    defaultContainerClass: bool,
    defaultItemClass: bool,
    defaultSelection?: Object,
    onItemSelect?: Function,
}

type State = {
    selectedItem?: Object,
};

// TODO: fix a few flow errors
/*
type RendererProps = {
    listIndex: number,
    listItem: string | Object,
    labelFunction: Function,
}
*/


export class List extends React.Component {

    props: Props;
    state: State;

    static defaultProps: Props = {
        style: {},
        defaultStyles: true,
        defaultContainerClass: true,
        defaultItemClass: true,
    };

    constructor(props:Props) {
        super(props);

        this.state = {
            selectedItem: null,
        };

        this.groupId = Utils.randomId('List');
    }

    componentWillReceiveProps(nextProps:Props) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                selectedItem: null,
            });
        }

        this._defaultSelection(nextProps);
    }

    componentDidMount() {
        this._defaultSelection(this.props);
    }

    get selectedIndex():number {
        return this.props.data ? this.props.data.indexOf(this.state.selectedItem) : -1;
    }

    get selectedItem():Object {
        return this.state.selectedItem;
    }

    _defaultSelection(nextProps:Props) {
        if (!this.state.selectedItem && nextProps.defaultSelection) {
            this.setState({
                selectedItem: nextProps.defaultSelection,
            });
        }
    }

    _onClickListItem(event:Event, index:number, item:Object) {
        event.preventDefault();

        this._selectItem(index, item);
    }

    _onChangeSelection(index:number, item:Object) {
        this._selectItem(index, item);
    }

    _selectItem(index:number, item:Object) {
        this.setState({
            selectedItem: item
        });

        if (this.props.onItemSelect) {
            this.props.onItemSelect(index, item);
        }
    }

    render() {
        const { children, data, keyFunction, labelFunction } = this.props;

        const childCount = React.Children.count(children);

        let childTemplate = null;

        if (childCount === 0) {
            childTemplate = <DefaultRenderer />;
        } else if (childCount === 1) {
            childTemplate = React.Children.only(children);
        } else {
            console.error(`'children' supplied to List must be zero or one elements`);
            return null;
        }

        const listClass = this.props.className || '';
        const selectedClass = this.state.selectedItem ? 'List-selected' : '';
        const containerClass = this.props.defaultStyles ? 'u-default-list-container' : '';

        const labelFunc = labelFunction || itemToLabel;

        return (
            <div className={`List ${selectedClass} ${listClass}`} style={this.props.style}>
                <div className={`List-ItemContainer ${containerClass}`}>
                { data && data.map((item, index) => {
                    const itemSelectedClass = item === this.state.selectedItem ? 'List-Item-selected' : '';
                    const keyValue = keyFunction ? keyFunction(item) : index;

                    return (
                        <div className="List-Row" key={keyValue}>
                            <input
                                type="radio"
                                name={this.groupId}
                                className="List-Radio cloak"
                                onChange={() => this._onChangeSelection(index, item)}/>

                            <div className={`List-Item ${itemSelectedClass}`}
                                 onClick={e => this._onClickListItem(e, index, item)}
                            >
                                {React.cloneElement(childTemplate, {
                                    listIndex: index,
                                    listItem: item,
                                    labelFunction: labelFunc,
                                })}
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        );
    }
}

List.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    style: PropTypes.object,
    data: PropTypes.array,
    labelFunction: PropTypes.func,
    keyFunction: PropTypes.func,
    defaultStyles: PropTypes.bool,
    defaultSelection: PropTypes.any,
    onItemSelect: PropTypes.func,
};

function itemToLabel(item) {
    if (typeof item === 'string') {
        return item;
    } else if (item.toString) {
        return item.toString();
    }

    return '';
}


function DefaultRenderer(props) {
    return (
        <div className="List-DefaultRenderer">
            <span className="List-DefaultRenderer-text">{props.labelFunction(props.listItem)}</span>
        </div>
    );
}

DefaultRenderer.propTypes = {
    listIndex: PropTypes.number,
    listItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    labelFunction: PropTypes.func,
};
