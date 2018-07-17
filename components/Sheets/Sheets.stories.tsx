import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { sheets, SheetChildProps, SheetContainer } from './Sheets';

const stories = storiesOf('Sheets', module);

export function StoryContainerDetail({ title }: SheetChildProps) {
    return (
        <>
            <h1>{title}</h1>
            <p>Some content here..</p>
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
            >
                Some content
            </StoryContainerDetail>
        );
    };

    return (
        <>
            <button onClick={addSheet}>Add Sheet</button>
            <SheetContainer />
        </>
    );
});
