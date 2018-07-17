import * as React from 'react';

export class Sheet extends React.Component {
    root: HTMLElement;

    componentDidMount() {
        this.root = document.createElement('div');
        document.appendChild(this.root);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}
