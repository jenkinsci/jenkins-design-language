import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Dropdown } from '../components';
import Utils from './Utils';

storiesOf('Dropdown', module)
    .add('default', () => <Default />)
    .add('labeling', () => <LabelOptions />)
    .add('keyboard & focus', () => <KeyboardFocus />)
    .add('callbacks', () => <Callbacks />)
;

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
};

function createOptions(count, asObject) {
    const options = [];

    for (let index = 0; index < count; index++) {
        const label = `Option ${options.length + 1}`;
        options.push(!asObject ? label : { label });
    }
    return options;
}

function Default() {
    Utils.createCssRule(
        '.Dropdown-Default .Dropdown-placeholder',
        'font-style: italic; text-transform: uppercase'
    );

    const style = {
        display: 'flex',
        justifyContent: 'space-around',
    };

    return (
        <div style={style}>
            <div>
                <p>Default</p>

                <Dropdown
                    options={createOptions(200)}
                />
            </div>

            <div className="Dropdown-Default">
                <p>Placeholder Styling</p>

                <Dropdown
                    options={createOptions(200)}
                />
            </div>
        </div>
    );
}

function LabelOptions() {
    const style = {
        display: 'flex',
        justifyContent: 'space-around',
    };

    return (
        <div style={style}>
            <div>
                <p>Using label field</p>

                <Dropdown
                    labelField="label"
                    options={createOptions(50, true)}
                />
            </div>
            <div>
                <p>Using label function</p>

                <Dropdown
                    labelFunction={val => `\\m/ ${val.label} \\m/`}
                    options={createOptions(50, true)}
                />
            </div>
        </div>
    );
}

function KeyboardFocus() {
    const options = createOptions(200);
    options.unshift('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

    return (
        <div style={{...style, height: 400}}>
            <p>This Layout is useful for demonstrating keyboard accessibility and focus behavior,
            especially as compared to a standard select box.</p>

            <button>Test 1</button>

            <select>
                <option disabled selected>- Select -</option>
                { options.map((opt, index) =>
                    <option key={index}>{opt}</option>
                )}
            </select>

            <button>Test 2</button>

            <Dropdown
                options={options}
            />

            <button>Test 3</button>
        </div>
    );
}

function Callbacks() {
    return (
        <div style={{...style, height: 100}}>
            <Dropdown
                options={createOptions(200)}
                onChange={(val, index) => console.log(`onChange val=${val}, index=${index}`)}
            />
        </div>
    );
}
