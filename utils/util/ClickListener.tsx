import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    onClickOutside: () => void;
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
                        // don't do anything if clicked within the element
                        return;
                    }
                    parent = parent.parentElement;
                }
                this.props.onClickOutside();
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
