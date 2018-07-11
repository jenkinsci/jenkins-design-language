import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { KeyListener } from './KeyListener';

const { domSymbolTree } = require("jsdom/lib/jsdom/living/helpers/internal-constants")

class RenderOrNot extends React.Component<{me: (inst: any) => void}, {render: boolean}> {
    constructor(props) {
        super(props);
        this.state = { render: true };
    }
    render() {
        this.props.me(this);
        return !this.state.render ? null : this.props.children;
    }
}

describe('KeyListener: ', () => {
    it('correctly handles inside and outside clicks', () => {
        let escPressed = false;

        const addEventListener = document.addEventListener;
        const removeEventListener = document.removeEventListener;

        try {
            let listenerCount = 0;
            document.addEventListener = function(type, fn) {
                listenerCount++;
                addEventListener.apply(this, arguments);
            };
            document.removeEventListener = function(type, fn) {
                listenerCount--;
                removeEventListener.apply(this, arguments);
            };

            document.body.innerHTML = '<div id="root"></div>';

            let renderElem1 = null;
            let renderElem2 = null;
            ReactDOM.render(<div>
                <button className="outside">asdf</button>
                <RenderOrNot me={e => { renderElem1 = e }}>
                    <KeyListener onEscapePressed={() => { escPressed = true }}>
                        <button className="inside1">asdf</button>
                    </KeyListener>
                </RenderOrNot>
                <RenderOrNot me={e => { renderElem2 = e }}>
                    <KeyListener>
                        <button className="inside2">asdf</button>
                    </KeyListener>
                </RenderOrNot>
            </div>, document.getElementById('root'));

            expect(listenerCount).toBe(2);

            const keyPress = (code: number) => new KeyboardEvent('keydown', { keyCode: code, bubbles: true } as any);

            const ESC = 27;
            document.dispatchEvent(keyPress(ESC));
            expect(escPressed).toBeTruthy();

            escPressed = false;

            document.querySelector('.inside1').dispatchEvent(keyPress(ESC));
            expect(escPressed).toBeTruthy();

            escPressed = false;

            document.querySelector('.inside1').dispatchEvent(keyPress(26));
            expect(escPressed).toBeFalsy();

            renderElem1.setState({ render: false });
            expect(listenerCount).toBe(1);

            escPressed = false;

            document.dispatchEvent(keyPress(ESC));
            expect(escPressed).toBeFalsy();

            document.querySelector('.inside2').dispatchEvent(keyPress(ESC));
            expect(escPressed).toBeFalsy();

            renderElem2.setState({ render: false });
            expect(listenerCount).toBe(0);

        } finally {
            document.addEventListener = addEventListener;
            document.removeEventListener = removeEventListener;
        }
    });
});
