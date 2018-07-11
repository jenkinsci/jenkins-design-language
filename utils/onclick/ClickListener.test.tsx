import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ClickListener } from './ClickListener';

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

describe('ClickListener: ', () => {
    it('correctly handles inside and outside clicks', () => {
        let clickedInside = false;
        let clickedOutside = false;

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
                    <ClickListener onClick={() => { clickedInside = true }} onClickOutside={() => { clickedOutside = true }}>
                        <button className="inside">asdf</button>
                    </ClickListener>
                </RenderOrNot>
                <RenderOrNot me={e => { renderElem2 = e }}>
                    <ClickListener>
                        <button className="inside2">asdf</button>
                    </ClickListener>
                </RenderOrNot>
            </div>, document.getElementById('root'));

            expect(listenerCount).toBe(2);

            const makeClick = () => new MouseEvent('mousedown', { bubbles: true });

            document.querySelector('.outside').dispatchEvent(makeClick());
            expect(clickedInside).toBeFalsy();
            expect(clickedOutside).toBeTruthy();

            clickedInside = false;
            clickedOutside = false;

            document.querySelector('.inside').dispatchEvent(makeClick());
            expect(clickedInside).toBeTruthy();
            expect(clickedOutside).toBeFalsy();

            renderElem1.setState({ render: false });
            expect(listenerCount).toBe(1);

            clickedInside = false;
            clickedOutside = false;

            document.querySelector('.outside').dispatchEvent(makeClick());
            document.querySelector('.inside2').dispatchEvent(makeClick());
            expect(clickedInside).toBeFalsy();
            expect(clickedOutside).toBeFalsy();

            renderElem2.setState({ render: false });
            expect(listenerCount).toBe(0);

        } finally {
            document.addEventListener = addEventListener;
            document.removeEventListener = removeEventListener;
        }
    });
});
