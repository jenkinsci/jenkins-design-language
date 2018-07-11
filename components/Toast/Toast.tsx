import * as React from 'react';
import { Clear } from '@jdl2/icons/Clear';

interface Props extends ToastCaptionProps {
    text: string;
    style?: string;
    action: string;
    onActionClick: () => void;
    onDismiss: () => void;
}

interface ToastCaptionProps {
    caption?: JSX.Element | string;
}

export function ToastCaption({ caption }: ToastCaptionProps) {
    if (!caption) {
        return null;
    }
    return <h4 className="caption">{caption}</h4>;
}

export class Toast extends React.Component<Props> {
    public static defaultProps: Partial<Props> = {
        style: 'default',
    };

    onActionClick() {
        const { onActionClick } = this.props;
        if (onActionClick) {
            onActionClick();
        }
    }

    onDismissClick() {
        const { onDismiss } = this.props;
        if (onDismiss) {
            onDismiss();
        }
    }

    render() {
        const { caption, text, action, style } = this.props;
        return (
            <>
                <div className={`toast ${style}`}>
                    <span className="text">
                        <ToastCaption caption={caption} />
                        {text}
                    </span>
                    <a className="action" onClick={() => this.onActionClick()}>
                        {action}
                    </a>
                    <a className="dismiss" onClick={() => this.onDismissClick()}>
                        <Clear />
                    </a>
                </div>
            </>
        );
    }
}
