import * as React from 'react';
import * as ReactModal from 'react-modal';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

export type Props = ButtonActionProps & ButtonComponentProps;

export type ButtonActionProps = Partial<{
    readonly onDismiss: () => void;
    readonly shouldCloseOnEsc: boolean;
    store: any;
}>;

export type ButtonComponentProps = Partial<{
    readonly title: string;
    readonly className: string;
    children: JSX.Element;
}>;

@observer
export class Dialog extends React.Component<Props> {
    render() {
        const store = this.props.store;
        // TODO - shouldCloseOnEsc: should close one esc is not working as intended.
        const defaultProps = {
            overlayClassName: 'Dialog-Overlay',
            onRequestClose: store.closeDialog,
        };
        return (
            <>
                {store.dialogs.map((dialog: any, idx: number) => (
                    <ReactModal
                        {...defaultProps}
                        className={classNames('Dialog', dialog.className)}
                        isOpen={store.getCurrentDialogState(idx)}
                        key={idx}
                        ariaHideApp={false}
                    >
                        {dialog.title && <DialogHeader title={dialog.title} />}
                        <DialogContent>{dialog.children}</DialogContent>
                        <DialogButtons>
                            <div className="Button" onClick={() => store.closeDialog(idx)}>
                                Close
                            </div>
                        </DialogButtons>
                    </ReactModal>
                ))}
            </>
        );
    }
}

export class DialogActions {
    render() {
        return <Dialog store={dialogs} />;
    }
}

export class DialogManager extends DialogActions {
    @observable showDialog = true;

    @observable dialogs: any[] = [];

    closeDialog(idx: number) {
        this.dialogs[idx].showDialog = false;
        if (this.dialogs[idx].onDismiss) {
            this.dialogs[idx].onDismiss();
        }
    }

    getCurrentDialogState(idx: number): boolean {
        return this.dialogs[idx].showDialog;
    }

    addDialog(title: string, className: string, children: JSX.Element, onDismiss?: () => void) {
        this.dialogs.push({
            title: title,
            className: className,
            children: children,
            showDialog: this.showDialog,
            onDismiss: onDismiss,
        });
    }
}

export interface DialogHeaderProps {
    title: string;
}

export function DialogHeader(props: DialogHeaderProps) {
    return (
        <div className="Dialog-header">
            <h3>{props.title}</h3>
        </div>
    );
}

export interface DialogContentProps {
    children?: JSX.Element;
}

export function DialogContent(props: DialogContentProps) {
    return (
        <div className="Dialog-content-scroll">
            <div className="Dialog-content-margin">{props.children}</div>
        </div>
    );
}

export interface DialogButtonsProps {
    children?: JSX.Element;
}

export function DialogButtons(props: DialogButtonsProps) {
    return <div className="Dialog-button-bar">{props.children}</div>;
}

export const dialogs = new DialogManager();
