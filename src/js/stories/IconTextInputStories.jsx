import React, { PropTypes } from 'react';
import { storiesOf } from '@kadira/storybook';
import { IconTextInput } from '../components/forms/IconTextInput';

storiesOf('IconTextInput', module)
    .add('general', () => <General />)
;

const style = {padding: 10};

function General() {
    return (
        <div>
            <div style={style}>
                <p>Default</p>

                <IconTextInput iconLeft="search" iconRight="close" />
            </div>
        </div>
    );
}
