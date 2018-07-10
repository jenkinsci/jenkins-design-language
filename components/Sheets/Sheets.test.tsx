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
    let onDismiss = jest.fn();
    let sheet = <StoryContainerDetail title="My Story Title" onClose={onDismiss} />;

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

        const wrapper = Enzyme.mount(content);
        const button = wrapper.find('button');
        button.simulate('click');
        wrapper.update();
        const currentSheet = wrapper.find('.Sheet');
        expect(currentSheet.find('h5').text()).toEqual('My Story Title');
        wrapper.update();
        const sheetCloseBtn = wrapper.find('.Sheet-Close');
        sheetCloseBtn.simulate('click');
        expect(onDismiss).toBeCalled();
    });
});
