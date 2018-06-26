import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../Button';
import { mount } from 'enzyme';
import expect from 'expect';
// import { specs as specsReal, describe as describeReal, it as itReal } from 'storybook-addon-specifications'
import { specsReal, describeReal } from '../../../.storybook/facade';
import '../Button.scss';

let stories = storiesOf('Button', module);

stories.add('should display text', function() {
    const story = <Button>some-text</Button>;

    specsReal(() =>
        describeReal('Hello World', function() {
            it('Should have the Hello World label', function() {
                // let output = mount(story);
                // const wrapper = enzyme.shallow(<div/>);
                // expect(output.text()).toContain('Hello World');
            });
        })
    );

    return story;
});
