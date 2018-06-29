import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Button } from './Button';

describe('Button', () => {
    it('should create and render a button with text', () => {
        const text = 'My Button';
        const e = <Button>{text}</Button>;
        const rendered = Enzyme.mount(e);
        expect(rendered.find('button').text()).toEqual(text);
    });

    // TODO figure out the issue with DONE
    it('handles click events', (done: any) => {
        const e = <Button onClick={() => done()}>asdf</Button>;
        Enzyme.mount(e).simulate('click');
    });

    it('works without onClick', () => {
        const e = <Button>asdf</Button>;
        Enzyme.mount(e).simulate('click');
    });
});
