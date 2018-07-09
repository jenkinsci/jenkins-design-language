import * as React from 'react';
import * as Enzyme from 'enzyme';
import { sheets, SheetChildProps, SheetContainer, SheetManager } from './Sheets';

export function StoryContainerDetail({ title }: SheetChildProps) {
    return (
        <>
            <h1>{title}</h1>
            <p>Some content here..</p>
        </>
    );
}

describe('Sheets', () => {
    let sheet = (
        <StoryContainerDetail
            title="My Story Title"
            onClose={() => {
                console.log('closing sheet...');
            }}
        />
    );
    let onDismiss = jest.fn();

    it('should fail with message', () => {
        const errorMessage = 'A SheetContainer must be added to the React Component tree';
        expect(() => {
            sheets.push(<div>Something here...</div>);
        }).toThrowError(errorMessage);
    });

    it('should render a sheet', () => {
        const addSheet = () => {
            sheets.push(sheet);
        };

        const content = (
            <div>
                <SheetContainer />
                <button onClick={addSheet}>Add Sheet</button>
            </div>
        );
        const wrapper = Enzyme.render(content);
        const sheetContainer = wrapper.find('.SheetContainer');
        const button = wrapper.find('button');
        expect(sheetContainer).toHaveLength(1);
        expect(button.text()).toEqual('Add Sheet');
    });
});
