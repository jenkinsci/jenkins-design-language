import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    onClick?: () => void;
    onClickOutside?: () => void;
}

export class ClickListener extends React.Component<Props> {
    private clickListener: React.EventHandler<any>; // tslint:disable-line

    componentDidMount() {
        const { onClick, onClickOutside } = this.props;
        document.addEventListener(
            'mousedown',
            (this.clickListener = (e: MouseEvent) => {
                const element = ReactDOM.findDOMNode(this);
                let parent = e.target as Element | null;
                while (parent) {
                    if (parent === element) {
                        if (onClick) {
                            onClick();
                        }
                        return;
                    }
                    parent = parent.parentElement;
                }
                if (onClickOutside) {
                    onClickOutside();
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
