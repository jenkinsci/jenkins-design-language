import * as React from 'react';
import { IconProps } from './IconProps';
export function IssueEpic({className, size = 16, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" fillRule="evenodd" clipRule="evenodd"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#9327E8"></path><path d="M8.297 3.5a.5.5 0 0 0-.44.26l-2.454 4.5a.5.5 0 0 0 .44.74H7.5l-.818 2.863a.5.5 0 0 0 .48.637h.541a.5.5 0 0 0 .44-.26l2.454-4.5a.5.5 0 0 0-.44-.74H8.5l.818-2.863a.5.5 0 0 0-.48-.637h-.541z" fill="#fff"></path></g></svg>
    );
}
