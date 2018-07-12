import * as React from 'react';
import { IconProps } from './IconProps';
export function Applications({ className, size = 24, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm4 12V6H4v12h2zM20 6H8v12h12V6z" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></svg>
    );
}
