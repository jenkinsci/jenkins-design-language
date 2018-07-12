import * as React from 'react';
import { IconProps } from './IconProps';
export function JiraBug({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#E5493A"></path><path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#fff"></path></g></svg>
    );
}
