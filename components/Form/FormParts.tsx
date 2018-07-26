import * as React from 'react';
import { TextInput } from './Parts/TextInput';
import { Checkbox } from './Parts/Checkbox';

export class FormParts extends React.Component {
    public static Input = TextInput;
    public static Checkbox = Checkbox;

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
