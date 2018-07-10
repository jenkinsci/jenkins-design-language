import * as React from 'react';
import { IconProps } from './IconProps';
export function IssueTask({className, size = 16, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#2A78E4" fillRule="evenodd" clipRule="evenodd"></path><path d="M5 8.5l2 2 4-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
    );
}
