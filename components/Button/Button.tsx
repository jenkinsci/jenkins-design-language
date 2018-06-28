import * as React from 'react';
import { withCss, CssProps, CssProp } from '../utils/withCss';

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
export const Button = withCss<ButtonProps>(function Button({
    css,
    children,
    onClick,
    disabled,
}: ButtonProps & CssProp) {
    return (
        <button
            className={css('Button')}
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
});
