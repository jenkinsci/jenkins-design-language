import * as React from 'react';

type Props = {
    children: {
        name?: string;
        value?: string;
        description?: React.ReactNode | string;
        isChecked?: boolean;
    };
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

export const defaultProps = {
    formPart: true,
    isChecked: true,
};

export class Checkbox extends React.Component<Props> {
    static defaultProps = defaultProps;

    render() {
        const { children } = this.props;

        if (!children) {
            throw new Error('Please provide children!');
        }

        const { name, value, description, isChecked } = children;
        return (
            <>
                <input type="checkbox" name={name} value={value} checked={isChecked} />{' '}
                {description}
                <br />
            </>
        );
    }
}
