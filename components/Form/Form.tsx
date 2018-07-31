import * as React from 'react';
import { FormParts } from './FormParts';

export interface ChildProps {
    children: React.ReactNode | JSX.Element;
}

export class VerticalForm extends React.Component<ChildProps> {
    render() {
        return (
            <div className="Form Form-DisplayVertical">
                {this.props.children}
            </div>
        );
    }
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
                <div className="Form-Label">
                    {label}
                </div>
                {notifications && notifications.map(notification => (
                    <div className={`Form-Message Form-Message-${notification.type}`}>
                        <div className="Form-Message-Text">
                            {notification.message}
                        </div>
                        {notification.actions && notification.actions.map(action => (
                            <div className="Form-Action">
                                {action}
                            </div>
                        ))}
                    </div>
                ))}
                <div className="Form-FormItem">
                    {children}
                </div>
            </>
        );
    }
}

export interface FormInputProps<T> {
    value: T;
    onChange: (value: T) => void; // maybe this should be any|boolean and returning false could prevent the change, but validators
}

export interface FormInputTextProps extends FormInputProps<string> {
    placeholder?: string;
}

export interface FormInputState<T> {
    value: T;
}

export class FormInputText extends React.Component<FormInputTextProps, FormInputState<string>> {
    state = { value: this.props.value }; // FIXME should not need state here, it's unclear why just relying on `this.props.value` doesn't work
    onChange(event: any) { // TODO not 'any'
        const value = event.target.value;
        this.props.onChange(value);
        this.setState({ value });
    }
    render() {
        const { value } = this.state;
        return (
            <input
                {...this.props} // don't do this normally
                type="text"
                value={value}
                onChange={event => this.onChange(event)}
            />
        );
    }
}




const FormHeader: React.SFC<ChildProps> = ({ children }) => <h4>{children}</h4>;

const initialState = {};
type State = Readonly<typeof initialState>;

export class Form extends React.Component<{}, State> {
    public static Vertical = VerticalForm;
    public static Item = FormItem;
    public static InputText = FormInputText;


    public static Header = FormHeader;
    public static Input = FormParts.Input;
    public static Checkbox = FormParts.Checkbox;

    render() {
        const { children } = this.props;

        if (!children) {
            throw new Error('Please provide form fields!');
        }

        const header = (
            <>
                {React.Children.map(children, (child: any, idx) => {
                    return child.props.header
                        ? React.cloneElement(child as React.ReactElement<any>, { key: idx })
                        : '';
                })}
            </>
        );

        const formParts = (
            <>
                {React.Children.map(children, (child: any, idx) => {
                    return child.props.formPart
                        ? React.cloneElement(child as React.ReactElement<any>, { key: idx })
                        : '';
                })}
            </>
        );

        return (
            <form className="Form">
                {header}
                {formParts}
            </form>
        );
    }
}
