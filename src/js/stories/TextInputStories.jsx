import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { TextInput } from '../components/forms/TextInput';

storiesOf('TextInput', module)
    .add('general', () => <General />)
    .add('callbacks', () => <Callbacks />)
    .add('sizes', () => <Sizes />)
;

const style = {padding: 10};
const name= { name: 'testTextInput' };

function General() {
    return (
        <div>
            <div style={style}>
                <p>Default</p>

                <TextInput />
            </div>

            <div style={style}>
                <p>Disabled</p>

                <TextInput disabled />
            </div>

            <div style={style}>
                <p>Placeholder</p>

                <TextInput placeholder="This is a placeholder." />
            </div>

            <div style={style}>
                <p>Placeholder</p>

                <TextInput defaultValue="I have a default value." />
            </div>
        </div>
    );
}

function Callbacks() {
    return (
        <div style={style}>
            <TextInput
                { ...name }
                onChange={val => console.log('onChange', val)}
                onBlur={val => console.log('onBlur', val)}
            />
        </div>
    );
}

function Sizes() {
    return (
        <div>
            <div style={style}>
                <TextInput placeholder="Using no layout" { ...name } />
            </div>
            <div className="layout-small" style={style}>
                <TextInput placeholder="Using layout-small" { ...name } />
            </div>
            <div className="layout-medium" style={style}>
                <TextInput placeholder="Using layout-medium" { ...name } />
            </div>
            <div className="layout-large" style={style}>
                <TextInput placeholder="Using layout-large" { ...name } />
            </div>
        </div>
    );
}
