import * as React from 'react';
import { IconProps } from './IconProps';
export function IssueBug({className, size = 16, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#CF292B" fillRule="evenodd" clipRule="evenodd"></path><path d="M5.5 6h5l.286 4.008a2.793 2.793 0 1 1-5.572 0L5.5 6z" fill="#fff"></path><rect width="4.5" height="7" rx="2.25" transform="translate(5.75 3)" fill="#fff"></rect><path d="M4 4.75c.5.417 1.6 1 4 1s3.5-.583 4-1" stroke="#CF292B" strokeLinecap="round"></path><path d="M3.5 5.5s2 1 4.5 1 4.5-1 4.5-1m-9 6s2-1 4.5-1 4.5 1 4.5 1m0-3h-9" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
    );
}
