import * as React from 'react';

export interface IconProps {
    /** Contents within the button */
    children?: React.ReactNode;
}
/**
 * A basic icon component
 */
export function Icon(props: IconProps) {
    return <div>I'm an icon!</div>;
}
