import * as React from 'react';
import { IconProps } from './IconProps';
export function JiraEpic({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none"><path d="M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3z" fill="#904EE2"></path><path d="M10.923 7.757l-.002-.004a.479.479 0 0 0 .08-.253.5.5 0 0 0-.5-.5H8V4.5a.5.5 0 0 0-.5-.5.49.49 0 0 0-.406.223.498.498 0 0 0-.066.13L5.081 8.237l.002.003A.489.489 0 0 0 5 8.5a.5.5 0 0 0 .5.5H8v2.5a.493.493 0 1 0 .918.259h.003l.013-.025c.011-.021.023-.04.031-.062l1.958-3.915z" fill="#fff"></path></g></svg>
    );
}
