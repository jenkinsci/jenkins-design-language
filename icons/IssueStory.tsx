import * as React from 'react';
import { IconProps } from './IconProps';
export function IssueStory({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" fillRule="evenodd" clipRule="evenodd"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#66BC07"></path><path d="M4 5.8S5 5 6 5s2 .8 2 .8S9 5 10 5s2 .8 2 .8V12s-1-1.4-2-1.4c-.8 0-1.8.6-1 1.4H7c.8-.8 0-1.4-1-1.4S4 12 4 12V5.8z" fill="#fff"></path></g></svg>
    );
}
