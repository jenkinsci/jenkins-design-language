import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as ReactModal from 'react-modal';
import { DialogContent, DialogButtons, dialogs } from './Dialog';

describe('Dialog', () => {
    let content = <span>Modal content</span>;
    let dialogShallow: Enzyme.ShallowWrapper;
    let onDismiss = jest.fn();

    beforeEach(() => {
        dialogs.addDialog('My first dialog', 'my-first-dialog', content, onDismiss);
        dialogs.addDialog('My Second dialog', '', content);
        dialogShallow = Enzyme.shallow(dialogs.render());
    });

    it('should render dialogs with content', () => {
        expect(dialogShallow.find(ReactModal)).toHaveLength(2);
    });

    it('should include additional classes if defined', () => {
        expect(
            dialogShallow
                .find(ReactModal)
                .at(0)
                .props().className
        ).toEqual('Dialog my-first-dialog');
        expect(
            dialogShallow
                .find(ReactModal)
                .at(1)
                .props().className
        ).toEqual('Dialog');
    });

    it('should render dialog content', () => {
        const dialogContent = Enzyme.shallow(<DialogContent>{content}</DialogContent>);
        expect(dialogContent.find('span').getElement()).toEqual(content);
    });

    it('should be able to dismiss a dialog', () => {
        const dialog = dialogShallow.find(ReactModal).at(0);
        expect(dialog.props().isOpen).toBe(true);
        dialog
            .find(DialogButtons)
            .find('.Button')
            .simulate('click');

        expect(onDismiss).toBeCalled();
    });
});
