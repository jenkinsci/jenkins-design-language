import * as React from 'react';

interface Props {
    onEscapePressed: () => void;
}

export class EscapeListener extends React.Component<Props> {
    private escapeListener: React.EventHandler<any>; // tslint:disable-line

    componentDidMount() {
        document.addEventListener(
            'keydown',
            (this.escapeListener = (e: KeyboardEvent) => {
                if ((e || window.event).keyCode === 27) {
                    this.props.onEscapePressed();
                }
            })
        );
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escapeListener);
    }

    render() {
        return this.props.children;
    }
}
