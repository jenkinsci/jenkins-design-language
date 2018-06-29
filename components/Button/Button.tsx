import * as React from 'react';
import { css, CssProps } from '@jdl2/css-util';

export interface ButtonProps extends CssProps {
    /** Contents within the button */
    children: React.ReactNode;

    /**
     * Called when this item is clicked
     */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * The basic button class to use in all contexts
 */
export function Button(props: ButtonProps) {
    const { children, onClick, disabled } = props;
    return (
        <button
            className={css(props, 'Button')}
            onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                if (onClick) {
                    onClick(e);
                }
            }}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
