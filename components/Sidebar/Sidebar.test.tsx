import * as React from 'react';
import { mount } from 'enzyme';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    it('should render', () => {
        const nav = mount(
            <Sidebar
                main={
                    <>
                        <Sidebar.AppLogo
                            icon={'ICON'}
                            brand={'BRAND'}
                            name={'NAME'}
                            onClick={() => 'nothing'}
                        />
                    </>
                }
            />
        );

        expect(nav.find(Sidebar.AppLogo)).toBeDefined();
    });
});
