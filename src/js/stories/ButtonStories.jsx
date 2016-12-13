/* eslint-disable */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

storiesOf('Button', module)
    .add('general', General)
    .add('inverse', Inverse)
;

const titleCell = {
    width: 150,
};

const buttonCell = {
    display: 'flex',
    width: '33%',
    justifyContent: 'center',
};

const buttonRow = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10
};

function ButtonRow(props) {
    const label = props.label || 'Normal';
    const element = props.element || 'button';
    const text = props.text || 'Primary';

    const buttonProps = props.props || {};

    const layouts = ['layout-small', '', 'layout-large'];

    return (
        <div style={buttonRow}>
            <div style={titleCell}>{label}</div>

            {layouts.map(layout => (
                <div key={layout} className={layout} style={buttonCell}>
                    {React.createElement(element, { ...buttonProps }, text)}
                </div>
            ))}
        </div>
    );
}

function ButtonHeader(props) {
    return (
        <div style={{marginTop: 10}}>
            <h3>{props.title}</h3>
            <div style={buttonRow}>
                <div style={titleCell} />
                <div style={buttonCell}>Small</div>
                <div style={buttonCell}>Medium</div>
                <div style={buttonCell}>Large</div>
            </div>
        </div>
    )
}

function ButtonTable(props) {
    const className = props.className || '';
    const style = props.style || {};
    style.padding = 10;
    style.backgroundColor = style.backgroundColor || 'transparent';

    return (
        <div className={className} style={style}>
            {props.children}
        </div>
    )
}

function General() {
    return (
        <ButtonTable>
            <ButtonHeader title="Primary" />
            <ButtonRow label="Normal" />
            <ButtonRow label="Hover" props={{className:'hover'}} />
            <ButtonRow label="Active" props={{className:'active'}} />
            <ButtonRow label="Disabled" props={{disabled: true}} />
            <ButtonRow label="Focus" props={{className:'focus'}} />
            <ButtonRow label="Destructive" props={{className: 'btn-danger'}} />

            <ButtonHeader title="Secondary" />
            <ButtonRow label="Normal" text="Secondary" props={{className: 'btn-secondary'}}/>
            <ButtonRow label="Hover" text="Secondary" props={{className:'btn-secondary hover'}} />
            <ButtonRow label="Active" text="Secondary" props={{className:'btn-secondary active'}} />
            <ButtonRow label="Disabled" text="Secondary" props={{className: 'btn-secondary', disabled: true}} />
            <ButtonRow label="Focus" text="Secondary" props={{className:'btn-secondary focus'}} />
            <ButtonRow label="Destructive" text="Secondary" props={{className: 'btn-secondary btn-danger'}} />

            <ButtonHeader title="Link Button" />
            <ButtonRow label="Normal" element="a" text="Link Button" props={{className: 'btn', href: '#'}}/>
            <ButtonRow label="Hover" element="a" text="Link Button" props={{className: 'btn hover', href: '#'}}/>
            <ButtonRow label="Active" element="a" text="Link Button" props={{className: 'btn active', href: '#'}}/>
            <ButtonRow label="Focus" element="a" text="Link Button" props={{className: 'btn focus', href: '#'}}/>

            { /* <ButtonRow label="Disabled" element="a" text="Link Button" props={{href: '#', disabled: true}} /> */ }
        </ButtonTable>
    );
}

function Inverse() {
    return (
        <ButtonTable className="inverse" style={{color: '#FFF', backgroundColor: '#003054'}}>
            <ButtonHeader title="Primary" />
            <ButtonRow label="Normal" />
            <ButtonRow label="Hover" props={{className:'hover'}} />
            <ButtonRow label="Active" props={{className:'active'}} />
            <ButtonRow label="Disabled" props={{disabled: true}} />
            <ButtonRow label="Focus" props={{className:'focus'}} />
            <ButtonRow label="Destructive" props={{className: 'btn-danger'}} />

            <ButtonHeader title="Link Button" />
            <ButtonRow label="Normal" element="a" text="Link Button" props={{className: 'btn', href: '#'}}/>
            <ButtonRow label="Hover" element="a" text="Link Button" props={{className: 'btn hover', href: '#'}}/>
            <ButtonRow label="Active" element="a" text="Link Button" props={{className: 'btn active', href: '#'}}/>
            <ButtonRow label="Focus" element="a" text="Link Button" props={{className: 'btn focus', href: '#'}}/>
        </ButtonTable>
    )
}

/*
function buttonsLightBg() {
    return (
        <div>
            <span className="componentdoc" data-docfile="doc-buttons-default"></span>
            <div style={container}>
                <div style={buttons}>
                    <div>no class</div>
                    <button>Default Button</button>
                    <a href="#">Default Anchor</a>
                    <button disabled="disabled">Default Button Disabled</button>
                    <button className="small">Small Button</button>
                    <a href="#" className="small">Small Anchor</a>
                    <button className="small" disabled="disabled">Small Button Disabled</button>
                </div>
                <div style={buttons}>
                    <div>.btn, .btn-default, .btn-primary</div>
                    <button className="btn-primary">Primary Button</button>
                    <a href="#" className="btn-primary">Primary Anchor</a>
                    <button className="btn-primary" disabled="disabled">Primary Button Disabled</button>
                    <button className="btn-primary small">Small Button</button>
                    <a href="#" className="btn-primary small">Small Anchor</a>
                    <button className="btn-primary small" disabled="disabled">Small Button Disabled</button>
                </div>
                <div style={buttons}>
                    <div>.btn-secondary</div>
                    <button className="btn-secondary">Secondary Button</button>
                    <a href="#" className="btn-secondary">Secondary Anchor</a>
                    <button className="btn-secondary" disabled="disabled">Secondary Button Disabled</button>
                    <button className="btn-secondary small">Small Button</button>
                    <a href="#" className="btn-secondary small">Small Anchor</a>
                    <button className="btn-secondary small" disabled="disabled">Small Button Disabled</button>
                </div>
            </div>
        </div>
    );
}

function buttonsDarkBg() {
    const containerDark = {
        ... container,
        backgroundColor: '#4A90E2',
    };

    return (
        <div>
            <span className="componentdoc" data-docfile="doc-buttons-inverse"></span>
            <div style={containerDark}>
                <div style={buttons}>
                    <div>.inverse</div>
                    <button className="inverse">Default Button</button>
                    <a className="inverse">Default Anchor</a>
                    <button className="inverse" disabled="disabled">Default Button Disabled</button>
                </div>
                <div style={buttons}>
                    <div>.btn, .btn-default, .btn-primary with .inverse</div>
                    <button className="btn-primary inverse">Primary Button</button>
                    <a className="btn-primary inverse">Primary Anchor</a>
                    <button className="btn-primary inverse" disabled="disabled">Primary Button Disabled</button>
                </div>
                <div style={buttons}>
                    <div>.btn-secondary .inverse</div>
                    <button className="btn-secondary inverse">Secondary Button</button>
                    <a className="btn-secondary inverse">Secondary Anchor</a>
                    <button className="btn-secondary inverse" disabled="disabled">Secondary Button Disabled</button>
                </div>
            </div>
        </div>
    );
}
*/
