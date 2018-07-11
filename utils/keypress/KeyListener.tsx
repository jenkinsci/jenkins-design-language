import * as React from 'react';

interface Props {
    onEscapePressed?: (e: KeyboardEvent) => void;
}

export class KeyListener extends React.Component<Props> {
    private keyDownListener: React.EventHandler<any>; // tslint:disable-line

    componentDidMount() {
        document.addEventListener(
            'keydown',
            (this.keyDownListener = (e: KeyboardEvent) => {
                /* istanbul ignore next */
                const ev = e || window.event;
                if (ev.keyCode === 27) {
                    if (this.props.onEscapePressed) {
                        this.props.onEscapePressed(e)
                    }
                }
            })
        );
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownListener);
    }

    render() {
        return this.props.children;
    }
}
