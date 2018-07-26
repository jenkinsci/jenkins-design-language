import * as React from 'react';

type Props = {
    children: {
        label?: string;
        name?: string;
        placeholder?: string;
        htmlFor?: string;
    };
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {
    part: 'TextInput',
};

export class TextInput extends React.Component<Props> {
    static defaultProps = { part: 'TextInput' };

    render() {
        const { children } = this.props;

        if (!children) {
            throw new Error('Please provide children!');
        }

        const { label, name, placeholder, htmlFor } = children;
        return (
            <>
                {label ? <label htmlFor={htmlFor}>{label}</label> : null}
                <input type="text" name={name} id={name} placeholder={placeholder} />
            </>
        );
    }
}
