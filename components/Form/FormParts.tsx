import * as React from 'react';
import { Checkbox } from './Parts/Checkbox';
import { InputText } from './Parts/InputText';
import { FormItem } from './Parts/FormItem';

export class FormParts extends React.Component {
    public static Checkbox = Checkbox;
    public static InputText = InputText;
    public static FormItem = FormItem;

    render() {
        return (
            <>
                {React.Children.map(this.props.children, (child: any, idx) => {
                    return React.cloneElement(child as React.ReactElement<any>, { key: idx });
                })}
            </>
        );
    }
}
