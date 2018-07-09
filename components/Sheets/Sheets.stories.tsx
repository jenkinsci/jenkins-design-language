import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { sheets, SheetChildProps, SheetContainer } from './Sheets';

const stories = storiesOf('Sheets', module);

export interface StoryContainerProps extends SheetChildProps {
    title: string;
}

export function StoryContainerDetail({ title }: StoryContainerProps) {
    return (
        <>
            <h1>{title}</h1>
            <p>Some content here..</p>
            <SheetContainer />
        </>
    );
}

stories.add('should display a sheet', () => {
    const addSheet = () => {
        sheets.push(
            <StoryContainerDetail
                title="My Story Title"
                onClose={() => {
                    console.log('closing sheet...');
                }}
            />
        );
    };

    return (
        <>
            <button onClick={addSheet}>Add Sheet</button>
            <SheetContainer />
        </>
    );
});
