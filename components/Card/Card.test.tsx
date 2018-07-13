import * as React from 'react';
import { mount } from 'enzyme';
import { Card } from './Card';

describe('Card', () => {
    it('should render', () => {
        const title = 'My Card';
        const children = (
            <div className="child-item">
                <h5>Sub header</h5>Some content below..
            </div>
        );
        const card = mount(<Card title={title} children={children} />);
        const cardHeader = card.find('.Card-Header').text();
        expect(cardHeader).toEqual(title);
        const cardChild = card.find('.child-item h5').text();
        expect(cardChild).toEqual('Sub header');
    });
});
