import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Button } from './Button';

describe('Button', () => {
    it('should create and render a button with text', () => {
        const text = 'My button.';
        const element = <Button>{text}</Button>;
        const tree = renderer.create(element).toJSON();
        expect(tree.children[0]).toEqual(text);
    });
});
