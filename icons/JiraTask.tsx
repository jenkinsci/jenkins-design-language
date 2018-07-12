import * as React from 'react';
import { IconProps } from './IconProps';
export function JiraTask({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#4BADE8"></path><path d="M7 10.5l4-5m-4 5l-2-2" stroke="#fff" strokeWidth="2" strokeLinecap="round"></path></g></svg>
    );
}
