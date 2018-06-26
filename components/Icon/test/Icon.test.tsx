import * as React from 'react';
import * as renderer from 'react-test-renderer';
import '../Button.scss';
import { Icon } from '../Icon';

describe('<Icon />', () => {
    it('should render an icon component.', () => {
        const element = <Icon />;
        const tree = renderer.create(element).toJSON();
        expect(tree).toMatchSnapshot();
        debugger;
        return element;
    });
});
