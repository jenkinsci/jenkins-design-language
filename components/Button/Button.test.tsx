import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Button } from './Button';
const { describe, it } = require('../../.storybook/facade');

const name = 'Button';

describe(name, () => {
    it('should create and render a button with text', () => {
        const text = 'My Button';
        const e = <Button>{text}</Button>;
        const rendered = Enzyme.mount(e);
        expect(rendered.find('button').text()).toEqual(text);
    });

    // TODO figure out the issue with DONE
    // it('handles click events', done => {
    //     const e = <Button onClick={() => done()}>asdf</Button>;
    //     Enzyme.mount(e).simulate('click');
    // });

    it('works without onClick', () => {
        const e = <Button>asdf</Button>;
        Enzyme.mount(e).simulate('click');
    });
});

export { name as default };
