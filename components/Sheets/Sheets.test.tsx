import * as React from 'react';
import * as Enzyme from 'enzyme';
import { sheets, SheetChildProps, SheetContainer } from './Sheets';

export function StoryContainerDetail({ title }: SheetChildProps) {
    return (
        <>
            <h1>{title}</h1>
            <p>Some content here..</p>
        </>
    );
}

describe('Sheets', () => {
    let onDismiss = jest.fn();

    it('should fail with message', () => {
        const errorMessage = 'A SheetContainer must be added to the React Component tree';
        expect(() => {
            sheets.push(<div>Something here...</div>);
        }).toThrowError(errorMessage);
    });

    it('should render a sheet', () => {
        expect(sheets.size).toEqual(0);
        Enzyme.shallow(<SheetContainer />);
        sheets.push(<StoryContainerDetail title="My Story Title" onClose={onDismiss} />);
    });
});
