import * as React from 'react';
import { FormParts } from './FormParts';

export interface ChildProps {
    children: React.ReactNode | JSX.Element;
}

export class VerticalForm extends React.Component<ChildProps> {
    render() {
        return <div className="Form Form-DisplayVertical">{this.props.children}</div>;
    }
}

const initialState = {};
type State = Readonly<typeof initialState>;

export class Form extends React.Component<{}, State> {
    public static Vertical = VerticalForm;
    public static InputText = FormParts.InputText;
    public static Item = FormParts.FormItem;
    public static Checkbox = FormParts.Checkbox;

    render() {
        return <form className="Form" />;
    }
}
