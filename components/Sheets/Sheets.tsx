import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { WindowClose } from '@jdl2/icons/WindowClose';
import { ClickListener } from '@jdl2/onclick';
import { EscapeListener } from '@jdl2/util/EscapeListener';

export interface SheetChildProps {
    // return false to prevent the sheet from being popped
    onClose?: () => void | boolean;
    title: JSX.Element | string;
}

export interface SheetChild extends React.ReactElement<SheetChildProps> {
    title?: string;
    key: string | number | null;
}

export class SheetManager {
    private _containers: SheetContainer[] = [];

    _pushContainer(container: SheetContainer) {
        this._containers = [...this._containers, container];
    }

    _popContainer(container: SheetContainer) {
        const idx = this._containers.indexOf(container);
        this._containers = [...this._containers.slice(0, idx), ...this._containers.slice(idx + 1)];
    }

    get top() {
        const top = this._containers[this._containers.length - 1];
        if (!top) {
            throw new Error('A SheetContainer must be added to the React Component tree');
        }
        return top;
    }

    push(view: SheetChild) {
        const { top } = this;
        const { _sheets } = top.state;
        top.setState({ _sheets: [..._sheets, view] });
    }

    pop(view?: SheetChild) {
        const { top } = this;
        const { _sheets } = top.state;

        let selectedView = view;

        if (!selectedView) {
            selectedView = _sheets[_sheets.length - 1];
            if (!selectedView) {
                return;
            }
        }
        const idx = _sheets.indexOf(selectedView);
        top.setState({
            _sheets: [..._sheets.slice(0, idx), ..._sheets.slice(idx + 1)],
        });
    }

    get size(): number {
        return top.length;
    }
}

export const sheets = new SheetManager() as {
    push: (view: SheetChild) => void;
    pop: (view?: SheetChild) => void;
    size: number;
};

export interface SheetContainerProps {
    transitionDuration?: number;
    transitionClass?: string;
    single?: boolean;
}

export interface SheetContainerState {
    _sheets: SheetChild[];
}

export class SheetContainer extends React.Component<SheetContainerProps, SheetContainerState> {
    constructor(props: SheetContainerProps) {
        super(props);
        this.state = { _sheets: [] };
    }
    componentDidMount() {
        (sheets as SheetManager)._pushContainer(this);
    }
    componentWillUnmount() {
        (sheets as SheetManager)._popContainer(this);
    }
    popTopSheet() {
        const { _sheets } = this.state;
        this.onClose(_sheets[_sheets.length - 1]);
    }
    popAllSheets() {
        const { _sheets } = this.state;
        for (const sheet of _sheets.reverse()) {
            this.onClose(sheet);
        }
    }
    onClose(child: SheetChild) {
        if (!child) {
            return;
        }
        if (child.props.onClose) {
            if (child.props.onClose() !== false) {
                sheets.pop(child);
            }
        } else {
            sheets.pop(child);
        }
    }

    getSheetTitle(child: SheetChild) {
        const title = child.props.title;
        return title || '';
    }

    render() {
        const { _sheets } = this.state;
        const { transitionDuration = 400, transitionClass = 'sheet' } = this.props;
        return (
            <EscapeListener onEscapePressed={() => this.popTopSheet()}>
                <div className="SheetContainer">
                    <ClickListener onClickOutside={() => this.popAllSheets()}>
                        <ReactCSSTransitionGroup
                            transitionName={transitionClass}
                            transitionAppear
                            transitionLeave
                            transitionAppearTimeout={transitionDuration}
                            transitionEnterTimeout={transitionDuration}
                            transitionLeaveTimeout={transitionDuration}
                        >
                            {_sheets.map((child: SheetChild, idx: number) => (
                                <div className="Sheet" key={child.key || idx}>
                                    <div className="flex-row mb4">
                                        {child.props.onClose && (
                                            <a
                                                className="Sheet-Close"
                                                onClick={() => this.onClose(child)}
                                            >
                                                <WindowClose size={24} />
                                            </a>
                                        )}
                                        <h5 className="h5 text-semibold ml1">
                                            {this.getSheetTitle(child)}
                                        </h5>
                                    </div>
                                    <div className="sheet-body">{child}</div>
                                </div>
                            ))}
                        </ReactCSSTransitionGroup>
                    </ClickListener>
                </div>
            </EscapeListener>
        );
    }
}
