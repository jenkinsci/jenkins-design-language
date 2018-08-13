import * as React from 'react';
import { Tabs, Tab } from './Tabs';
import { mount, ReactWrapper } from 'enzyme';

describe('Tabs', () => {
    it('should fail with message', () => {
        const onDismiss: any = jest.fn();
        const tabs: ReactWrapper = mount(
            <Tabs>
                <Tab title="Tab1"><div className="tab-1-content">Tab 1 Content</div></Tab>
                <Tab title="Tab2"><div className="tab-2-content">Tab 2 Content</div></Tab>
            </Tabs>
        );

        expect(tabs.find('.tab-1-content').text()).toBe("Tab 1 Content");

        tabs.find('.Tabs a').last().simulate('click');

        expect(tabs.find('.tab-2-content').text()).toBe("Tab 2 Content");
    });
});
