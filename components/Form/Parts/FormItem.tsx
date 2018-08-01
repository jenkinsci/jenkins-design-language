import * as React from 'react';

export interface ChildProps {
    children: React.ReactNode | JSX.Element;
}

export interface UserNotification {
    type: 'Success' | 'Info' | 'Warning' | 'Error'; // enum?
    message: string;
    actions?: React.ReactNode[];
}

export interface FormItemProps extends ChildProps {
    label: string;
    notifications?: UserNotification[];
}

export class FormItem extends React.Component<FormItemProps> {
    render() {
        const { label, notifications, children } = this.props;
        return (
            <>
                <div className="Form-Label">{label}</div>
                {notifications &&
                    notifications.map(notification => (
                        <div className={`Form-Message Form-Message-${notification.type}`}>
                            <div className="Form-Message-Text">{notification.message}</div>
                            {notification.actions &&
                                notification.actions.map(action => (
                                    <div className="Form-Action">{action}</div>
                                ))}
                        </div>
                    ))}
                <div className="Form-FormItem">{children}</div>
            </>
        );
    }
}
