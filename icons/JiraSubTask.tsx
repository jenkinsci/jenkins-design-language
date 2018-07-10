import * as React from 'react';
import { IconProps } from './IconProps';
export function JiraSubTask({className, size = 16, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#4BAEE8"></path><path d="M4.8 9h3.4a.8.8 0 0 0 .8-.8V4.8a.8.8 0 0 0-.8-.8H4.8a.8.8 0 0 0-.8.8v3.4a.8.8 0 0 0 .8.8z" stroke="#fff"></path><path d="M7 7.8a.8.8 0 0 1 .8-.8h3.4a.8.8 0 0 1 .8.8v3.4a.8.8 0 0 1-.8.8H7.8a.8.8 0 0 1-.8-.8V7.8z" fill="#fff"></path><path d="M7.8 12h3.4a.8.8 0 0 0 .8-.8V7.8a.8.8 0 0 0-.8-.8H7.8a.8.8 0 0 0-.8.8v3.4a.8.8 0 0 0 .8.8z" stroke="#fff"></path></g></svg>
    );
}
