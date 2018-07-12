import * as React from 'react';
import { IconProps } from './IconProps';
export function JiraStory({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#63BA3C"></path><path d="M10 4H6a1 1 0 0 0-1 1v6.5a.5.5 0 0 0 .5.5.49.49 0 0 0 .41-.231l.004.001L7.84 9.54a.2.2 0 0 1 .32 0l1.926 2.23.004-.001a.49.49 0 0 0 .41.231.5.5 0 0 0 .5-.5V5a1 1 0 0 0-1-1z" fill="#fff"></path></g></svg>
    );
}
