import * as React from 'react';
import { FormParts } from './FormParts';

export interface ChildProps {
    children: React.ReactNode | JSX.Element;
}

const FormHeader: React.SFC<ChildProps> = ({ children }) => <h4>{children}</h4>;

const initialState = {};
type State = Readonly<typeof initialState>;

export class Form extends React.Component<{}, State> {
    public static Header = FormHeader;
    public static Input = FormParts.Input;

    render() {
        const header = (
            <>
                {React.Children.map(this.props.children, (child: any, idx) => {
                    // TODO handle better
                    return !child.props.part
                        ? React.cloneElement(child as React.ReactElement<any>, { key: idx })
                        : '';
                })}
            </>
        );

        const formParts = (
            <>
                {React.Children.map(this.props.children, (child: any, idx) => {
                    return child.props.part
                        ? React.cloneElement(child as React.ReactElement<any>, { key: idx })
                        : '';
                })}
            </>
        );
        return (
            <form>
                {header}
                {formParts}
            </form>
        );
    }
}
