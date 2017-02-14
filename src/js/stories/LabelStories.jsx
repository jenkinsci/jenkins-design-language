import React, {Component, PropTypes} from 'react';
import {storiesOf} from '@kadira/storybook';
import {TruncatingLabel} from '../components/TruncatingLabel';
import {hgw} from './data/textdata';

storiesOf('Label', module)
    .add('Basic', basic)
    .add('Many', many)
;

function basic() {
    return (
        <div style={{margin:'1em'}}>
            {example(210, 121)}
        </div>
    )
}

function many() {
    return (
        <div style={{margin:'1em'}}>
            {example(100, 100)}
            <br/>
            {example(180, 100)}
            <br/>
            {example(200, 100)}
            <br/>
            {example(50, 180)}
            <br/>
            {example(80, 80)}
            <br/>
            {example(180, 180)}
        </div>
    );
}

function example(width, height) {

    const w = width + 'px';
    const h = height + 'px';

    const outer = { // We'll put the bg on this, because it's got a fixed size instead of max
        width: w,
        height: h,
        background: '#eee'
    };

    const style2 = {
        maxWidth: w,
        maxHeight: h,
        overflow: 'hidden'
    };

    return (
        <div style={outer}>
            <TruncatingLabel style={style2}>
                {hgw}
            </TruncatingLabel>
        </div>
    );
}
