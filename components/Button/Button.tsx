import * as React from 'react';

export interface ButtonProps {
    /** Contents within the button */
    children: React.ReactNode;

    /** Indicates this button is primary
     * @default false
     */
    primary?: boolean;
}

/**
 * The basic button class to use in all contexts
 */
export function Button({ children, primary = false }: ButtonProps) {
    return (
        <button className={`btn ${primary && 'btn-primary'}`}>
            {children}
        </button>
    );
}
