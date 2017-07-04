import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Dropdown, Dialog } from '../components';
import Utils from './Utils';

storiesOf('Dropdown', module)
    .add('general', () => <General />)
    .add('footer', () => <Footer />)
    .add('In Dialog', () => <InDialog />)
    .add('labeling', () => <LabelOptions />)
    .add('keyboard & focus', () => <KeyboardFocus />)
    .add('callbacks', () => <Callbacks />)
;

const style = {
    padding: 10,
    width: 200,
};

const a2z = 'ABCDEFGHIJKLM NOPQRSTUVWXYZ';

function createOptions(text = 'Option', asObject = false) {
    const options = [];

    for (let index = 0; index < 200; index++) {
        const label = `${text} ${options.length + 1}`;
        options.push(!asObject ? label : { label });
    }
    return options;
}

function InDialog() {
    return (
        <div>
            <p>Background page.</p>

            <Dialog title="Not testing the Dialog">
                <div style={{maxWidth: '40em'}}>
                    <p>
                        Class condimentum augue sapien sed a fermentum purus mi a fusce ridiculus
                        ultricies vel vivamus vestibulum nullam consequat et suspendisse montes
                        consectetur enim nam phasellus id faucibus elementum malesuada. Elit
                        aenean dolor adipiscing duis.
                    </p>
                    <General/>
                </div>
            </Dialog>
        </div>
    );
}


function General() {
    Utils.createCssRule(
        '.Dropdown-Default .Dropdown-placeholder',
        'font-style: italic', 'text-transform: uppercase'
    );

    return (
        <div>
            <div style={style}>
                <p>Default</p>

                <Dropdown
                    options={createOptions()}
                />
            </div>

            <div style={style}>
                <p>Disabled</p>

                <Dropdown
                    options={createOptions()}
                    disabled
                />
            </div>

            <div style={style}>
                <p>Default Value</p>

                <Dropdown
                    options={createOptions()}
                    defaultOption="Option 3"
                />
            </div>

            <div className="Dropdown-Default" style={style}>
                <p>Placeholder Styling</p>

                <Dropdown
                    options={createOptions()}
                />
            </div>

            <div style={{...style, maxWidth: 150}}>
                <p>Truncation</p>

                <Dropdown
                    placeholder="Truncated because the text is too long"
                    options={createOptions(a2z)}
                />
            </div>
        </div>
    );
}
function Footer() {
    Utils.createCssRule(
        '.Dropdown-Default .Dropdown-placeholder',
        'font-style: italic', 'text-transform: uppercase'
    );
    const footerStyle = {
        padding: '5px',
        borderBottom: '1px solid rgba(73, 73, 73, 0.5)',
        borderLeft: '1px solid rgba(73, 73, 73, 0.5)',
        borderRight: '1px solid rgba(73, 73, 73, 0.5)',
        borderColor: '#4A90E2'
    };

    return (
        <div>
            <div style={style}>
                <p>With footer</p>

                <Dropdown
                    defaultOption="Option 3"
                    footer={<div style={footerStyle}>This is a custom footer</div>}
                    options={createOptions()}
                />
            </div>
        </div>
    );
}

function LabelOptions() {
    return (
        <div>
            <div style={style}>
                <p>Using labelField=label</p>

                <Dropdown
                    labelField="label"
                    options={createOptions('Option', true)}
                />
            </div>
            <div style={style}>
                <p>Using labeFunction</p>

                <Dropdown
                    labelFunction={val => `\\m/ ${val.label} \\m/`}
                    options={createOptions('Option', true)}
                />
            </div>
        </div>
    );
}

function KeyboardFocus() {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
        width: 300,
        height: 400,
    };

    const options = createOptions();
    options.unshift(a2z);

    return (
        <div style={style}>
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
    const options = createOptions();

    const style = {
        padding: 10,
    };

    const refs = {
        dropdown: null,
    };

    function changeHandler(val, index) {
        console.log(`onChange val=${val}, index=${index}`);
    }

    function selectedHandler() {
        console.log('selectedOption=', refs.dropdown.selectedOption);
    }

    return (
        <div style={style}>
            <Dropdown
                ref={dropdown => refs.dropdown = dropdown}
                style={{ width: 200, marginRight: 10}}
                options={options}
                onChange={changeHandler}
            />

            <button onClick={selectedHandler}>Log Selected</button>
        </div>
    );
}
