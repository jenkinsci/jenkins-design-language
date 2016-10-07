/**
 * Created by cmeyers on 10/4/16.
 */
import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import { ExpandablePath } from '../../../src/js/components';

describe("ExpandablePath", () => {

    it("renders nothing with no data", () => {
        const wrapper = shallow(<ExpandablePath />);

        assert.isTrue(wrapper.equals(null));
    });

    it("renders basic elements", () => {
        const name = 'jenkins / pipeline';
        const wrapper = shallow(<ExpandablePath path={name} />);

        assert.equal(wrapper.text(), `<Icon />jenkins  / <Icon /> pipeline / `);
    });

});
