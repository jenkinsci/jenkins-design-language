import * as React from 'react';
import { css, CssProps } from '@jdl2/css-util';

export interface InputTextProps extends CssProps {
    onChange?: (value: string) => void;
}

export function InputText(props: InputTextProps) {
    const { onChange } = props;
    return (
        <input
            className={css(props, 'InputText')}
            type="text"
            onChange={e => {
                if (onChange) {
                    onChange(e.target.value);
                }
            }}
        />
    );
}
