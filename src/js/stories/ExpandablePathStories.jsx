/**
 * Created by cmeyers on 10/4/16.
 */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { ExpandablePath } from '../components';

storiesOf('ExpandablePath', module)
    .add('short', () => {
        const name = 'jenkins / pipeline';
        return (
            <ExpandablePath path={name} />
        );
    })
    .add('long', () => {
        const name = 'jenkins / folder1 / folder2 / pipeline';
        return (
            <ExpandablePath path={name} />
        );
    })
    .add('long, with wrap', () => {
        const name = 'jenkins / long-folder-name1 / long-folder-name2 / long-folder-name3 / long-folder-name4 / pipeline';
        return (
            <div style={ { width: 250 } }>
                <ExpandablePath path={name} />
            </div>
        );
    })
    .add('long, with link', () => {
        const name = 'jenkins / folder1 / folder2 / pipeline';
        return (
            <ExpandablePath path={name} link="http://jenkins.io" />
        );
    })
    .add('large', () => {
        const name = 'Jenkins / folder1 / folder2 / pipeline';
        return (
            <div style={ { fontSize: 24 } }>
                <ExpandablePath path={name} iconSize={28} />
            </div>
        );
    });
