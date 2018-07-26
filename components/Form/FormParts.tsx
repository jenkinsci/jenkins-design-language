import * as React from 'react';
import { TextInput } from './Parts/TextInput';

export enum FormPart {
    TEXT_INPUT = 'TextInput',
    CHECKBOX = 'Checkbox',
    RADIO_BUTTON = 'RadioButton',
    SELECT = 'Select',
    NUMBER_INPUT = 'NumberInput',
}

export class FormParts extends React.Component {
    public static Input = TextInput;

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
