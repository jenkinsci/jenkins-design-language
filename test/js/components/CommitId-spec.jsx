import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import { CommitHash } from '../../../src/js/components';

describe("CommitHash", () => {

    it("renders dash with no data", () => {
        const wrapper = shallow(<CommitHash />);

        assert.isTrue(wrapper.equals(
            <span>-</span>
        ));
    });

    it("renders if does not match git regexp", () => {
        const wrapper = shallow(<CommitHash commitId="123" />);

        assert.isTrue(wrapper.equals(
            <span>123</span>
        ));
    });

    it("renders sha-1 char hash with proper length", () => {
        const wrapper = shallow(<CommitHash commitId="676b757ecb542a44dd6f63fd1fb08b659f7a7b03" />);

        assert.isTrue(wrapper.is('code'));
        assert.equal(wrapper.text().length, 7);
        assert.equal(wrapper.text(), '676b757');

    });

});
