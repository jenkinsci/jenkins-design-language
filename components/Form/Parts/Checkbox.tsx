import * as React from 'react';
import { Checked } from '@jdl2/icons/Checked';
import { Unchecked } from '@jdl2/icons/Unchecked';

const initialState = { isChecked: false };
type State = Readonly<typeof initialState>;

type Props = {
    name?: string;
    value?: string;
    description?: React.ReactNode | string;
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

export const defaultProps = {
    formPart: true,
};

export class Checkbox extends React.Component<Props, State> {
    static defaultProps = defaultProps;
    readonly state: State = initialState;

    render() {
        const { name, value, description } = this.props;
        const renderCheckboxProps = {
            checked: this.state.isChecked,
            onChange: this.toggle,
            name: name,
            value: value,
        };
        return (
            <>
                <input type="checkbox" id="option" {...renderCheckboxProps} />
                <label htmlFor="option">
                    <span>{this.state.isChecked ? <Checked /> : <Unchecked />}</span> {description}
                </label>
            </>
        );
    }

    private toggle = () => this.setState(updateCheckedState);
}

const updateCheckedState = (prevState: State) => ({ isChecked: !prevState.isChecked });
