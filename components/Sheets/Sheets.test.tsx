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
    it('should fail with message', () => {
        let onDismiss = jest.fn();
        let sheet = <StoryContainerDetail title="My Story Title" onClose={onDismiss} />;
        const addSheet = () => {
            sheets.push(sheet);
        };
        const content = (
            <div>
                <SheetContainer />
                <button onClick={addSheet}>Add Sheet</button>
            </div>
        );

        const errorMessage = 'A SheetContainer must be added to the React Component tree';
        expect(sheets.size).toEqual(0);
        expect(() => {
            sheets.push(<div>Something here...</div>);
        }).toThrowError(errorMessage);
    });

    it('should render a sheet', () => {
        let onDismiss = jest.fn();
        let sheet = <StoryContainerDetail title="My Story Title" onClose={onDismiss} />;
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

    it('should test a sheet container', () => {
        let onDismiss = jest.fn();
        let sheet = <StoryContainerDetail title="My Story Title" onClose={onDismiss} />;
        const addSheet = () => {
            sheets.push(sheet);
        };
        const content = (
            <div>
                <SheetContainer />
                <button onClick={addSheet}>Add Sheet</button>
            </div>
        );

        const sheetContainer = new SheetContainer({ transitionClass: 'som' });
        sheetContainer.componentDidMount();
        sheetContainer.popTopSheet();
        sheetContainer.popAllSheets();
        sheetContainer.componentWillUnmount();
        const title = sheetContainer.getSheetTitle(sheet);
        expect(title).toEqual('My Story Title');
    });
});
