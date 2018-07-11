import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    onClick?: (e: MouseEvent) => void;
    onClickOutside?: (e: MouseEvent) => void;
}

export class ClickListener extends React.Component<Props> {
    private clickListener: React.EventHandler<any>; // tslint:disable-line

    componentDidMount() {
        document.addEventListener(
            'mousedown',
            (this.clickListener = (e: MouseEvent) => {
                const element = ReactDOM.findDOMNode(this);
                let parent = e.target as Element | null;
                while (parent) {
                    if (parent === element) {
                        if (this.props.onClick) {
                            this.props.onClick(e);
                        }
                        return;
                    }
                    parent = parent.parentElement;
                }
                if (this.props.onClickOutside) {
                    this.props.onClickOutside(e);
                }
            })
        );
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.clickListener);
    }

    render() {
        return this.props.children;
    }
}
