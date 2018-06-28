import * as React from 'react';
import * as renderer from 'react-test-renderer';
import '../Button.scss';
import { Button } from './Button';

describe('<Button />', () => {
    it('should create and render a button with text.', () => {
        const text = 'My button.';
        const element = <Button>{text}</Button>;
        const tree = renderer.create(element).toJSON();
        expect(tree).toMatchSnapshot();
        console.log('tree.children[0] ', tree.children[0]);
        debugger;
        return element;
    });
});
