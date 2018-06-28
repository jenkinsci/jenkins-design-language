import * as React from 'react';
import * as Enzyme from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { Button } from './Button';

describe('Button', () => {
    it('should create and render a button with text', () => {
        const text = 'My Button';
        const element = <Button>{text}</Button>;
        const tree = renderer.create(element).toJSON();
        expect(tree.children[0]).toEqual(text);
    });

    it('handles click events', done => {
        const e = <Button onClick={() => done()}>asdf</Button>;
        Enzyme.mount(e).simulate('click');
    });

    it('works without onClick', () => {
        const e = <Button>asdf</Button>;
        Enzyme.mount(e).simulate('click');
    });
});
