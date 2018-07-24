import * as React from 'react';
import { mount } from 'enzyme';
import { Sidebar } from './Sidebar';

class Team {
    label: string;
    url: string;

    constructor(label: string, url: string) {
        this.label = label;
        this.url = url;
    }
}

const team = new Team('CoreUX', 'http://google.com');
const team2 = new Team('Devoptics', 'http://google.com');
const team3 = new Team('Codeship', 'http://google.com');

export const teams = [team, team2, team3];

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
