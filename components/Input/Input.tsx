import * as React from 'react';
import { css, CssProps } from '@jdl2/css-util';

export interface InputProps extends CssProps {
    onChange?: (value: string) => void;
}

export function Input(props: InputProps) {
    const { onChange } = props;
    return (
        <input
            className={css(props, 'InputText input-error')}
            type="text"
            onChange={e => {
                if (onChange) {
                    onChange(e.target.value);
                }
            }}
        />
    );
}
