import * as React from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';
import { Card } from './Card';

describe('Card', () => {
    const title = 'My Card';
    const children = (
        <div className="child-item">
            <h5>Sub header</h5>Some content below..
        </div>
    );
    let card: ReactWrapper = mount(shallow(<Card title={title} children={children} />).get(0));

    it('should render', () => {
        const cardHeader = card.find('.Card-Header').text();
        expect(cardHeader).toEqual(title);
        const cardChild = card.find('.child-item h5').text();
        expect(cardChild).toEqual('Sub header');
    });

    it('should change focus state', () => {
        expect(card.state()['focused']).toBeFalsy();
        card.simulate('click');
        expect(card.state()['focused']).toBeTruthy();
    });

    it('should render without children', () => {
        let card: ReactWrapper = mount(shallow(<Card title={title} />).get(0));
        expect(card.find('.child-item')).toHaveLength(0);
    });
});
