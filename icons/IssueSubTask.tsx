import * as React from 'react';
import { IconProps } from './IconProps';
export function IssueSubTask({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#2A78E4" fillRule="evenodd" clipRule="evenodd"></path><path d="M5.5 6.5L7 8l3.5-3.5m-5 5.5L7 11.5 10.5 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
    );
}
