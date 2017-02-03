import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { List } from '../components';

storiesOf('List', module)
    .add('general', () => <General />)
    .add('renderers', () => <RendererOptions />)
    .add('keyboard & focus', () => <KeyboardFocus />)
    .add('constraining', () => <Constraining />)
    .add('callbacks', () => <Callbacks />)
;

const simpleData = ['A', 'B', 'C', 'D', 'EFGHIJKLMNOPQRSTUV', 'W', 'X', 'Y', 'Z'];

const column = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
};


function General() {
    const style = {
        padding: 10,
        maxWidth: 300,
    };

    return (
        <div>
            <div style={style}>
                <p>Default</p>

                <List data={simpleData} />
            </div>

            <div style={style}>
                <p>No Default Styles</p>

                <List data={simpleData} defaultStyles={false} />
            </div>

            <div style={style}>
                <p>Default Value</p>

                <List data={simpleData} defaultSelection="C" />
            </div>
        </div>
    );
}

// renderers

function Renderer1(props) {
    /* eslint-disable react/prop-types */
    return (
        <div style={{padding: 20, fontSize: 20}}>Large {props.listItem}</div>
    );
    /* eslint-enable react/prop-types */
}


function RendererOptions() {
    const style = {
        display: 'flex',
        justifyContent: 'space-around',
    };

    /* eslint-disable react/prop-types */
    return (
        <div style={style}>
            <div>
                <p>inline renderer w/ default styles</p>

                <List data={simpleData}>
                    {React.createElement((props) => (<div>#{props.listIndex} - {props.listItem}</div>))}
                </List>
            </div>
            <div>
                <p>custom renderer w/ no styles</p>

                <List data={simpleData} defaultStyles={false}>
                    <Renderer1 />
                </List>
            </div>
        </div>
    );
    /* eslint-enable react/prop-types */
}

function KeyboardFocus() {
    const buttonStyle = { margin: 10, flexShrink: 0 };

    return (
        <div style={{...column, height: 400}}>
            <p>This layout is useful for demonstrating keyboard accessibility and focus behavior.</p>

            <button style={buttonStyle}>Test 1</button>

            <List data={simpleData} style={{width: 300}} />

            <button style={buttonStyle}>Test 2</button>
        </div>
    );
}

const WIDTH = 150;
const HEIGHT = 200;

function Constraining() {
    const constrain = {maxWidth: WIDTH, maxHeight: HEIGHT};
    const explicit = {width: WIDTH, height: HEIGHT};
    const style = { display: 'flex' };
    const style2 = { width: WIDTH + 50, padding: 10 };

    return (
        <div>
            <div style={style}>
                <div style={style2}>
                    <p>width / height directly on List</p>

                    <List data={simpleData} style={explicit} />
                </div>

                <div style={style2}>
                    <p>maxWidth / maxHeight directly on List</p>

                    <List data={simpleData} style={constrain} />
                </div>

                <div style={style2}>
                    <p>List anchored to parent via absolute positioning</p>

                    <div style={{...constrain, height: HEIGHT, position: 'relative'}}>
                        <List data={simpleData} style={{position: 'absolute', top: 0, bottom: 0}} />
                    </div>
                </div>

                <div style={style2}>
                    <p>maxWidth / maxHeight on parent container (flexbox)</p>

                    <div style={{...constrain, display: 'flex'}}>
                        <List data={simpleData} />
                    </div>
                </div>
            </div>
            <div style={style}>
                <div style={style2}>
                    <p>maxWidth / maxHeight on parent container (not flexbox)</p>

                    <div style={constrain}>
                        <List data={simpleData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Callbacks() {
    return (
        <div style={{...column, width: 300}}>
            <p>onItemSelect</p>

            <List data={simpleData} onItemSelect={(index, item) => console.log(index, item)} />
        </div>
    );
}
