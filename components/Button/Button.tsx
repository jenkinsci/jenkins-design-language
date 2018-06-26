import * as React from 'react';

export interface ButtonProps {
    children: React.ReactNode;
}

export function Button({ children }: ButtonProps) {
    return <button className="btn">{children}</button>;
}
