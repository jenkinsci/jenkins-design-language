import * as React from 'react';
import * as ReactModal from 'react-modal';
import * as classNames from 'classnames';

export interface DialogProps {
    readonly title?: string;
    readonly className?: string;
    readonly onDismiss?: () => void;
    readonly shouldCloseOnEsc?: boolean;
    children: JSX.Element;
}

export interface DialogState {
    readonly showModal: boolean;
}

export class Dialog extends React.Component<DialogProps, DialogState> {
    constructor(props: DialogProps) {
        super(props);

        this.state = { showModal: true };
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCloseModal() {
        this.setState({
            ...this.state,
            showModal: false,
        });

        if (this.props.onDismiss) {
            this.props.onDismiss();
        }
    }

    render() {
        const shouldCloseOnEsc = this.props.hasOwnProperty('shouldCloseOnEsc')
            ? this.props.shouldCloseOnEsc
            : true;

        const defaultProps = {
            className: classNames('Dialog', this.props.className),
            overlayClassName: 'Dialog-Overlay',
            onRequestClose: this.handleCloseModal,
            isOpen: this.state.showModal,
            shouldCloseOnEsc,
        };

        return (
            <div>
                <ReactModal {...defaultProps}>
                    {this.props.title && <DialogHeader title={this.props.title} />}
                    <DialogContent>{this.props.children}</DialogContent>
                    <DialogButtons>
                        <div className="Button" onClick={this.handleCloseModal}>
                            Close
                        </div>
                    </DialogButtons>
                </ReactModal>
            </div>
        );
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
    children: JSX.Element;
}

export function DialogContent(props: DialogContentProps) {
    return (
        <div className="Dialog-content-scroll">
            <div className="Dialog-content-margin">{props.children}</div>
        </div>
    );
}

export interface DialogButtonsProps {
    children: JSX.Element;
}

export function DialogButtons(props: DialogButtonsProps) {
    return <div className="Dialog-button-bar">{props.children}</div>;
}
