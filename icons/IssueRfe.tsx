import * as React from 'react';
import { IconProps } from './IconProps';
export function IssueRfe({className, size = 16, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#FC9535" fillRule="evenodd" clipRule="evenodd"></path><path d="M8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="#fff" fillRule="evenodd" clipRule="evenodd"></path><path d="M7.866 9.125c0-1.125 2.433-2.213 2.231-3.687-.149-1.087-1.176-1.631-2.256-1.556-1.08.075-1.676.701-1.962 1.019" stroke="#fff" strokeWidth="1.75" strokeLinecap="round"></path></g></svg>
    );
}
