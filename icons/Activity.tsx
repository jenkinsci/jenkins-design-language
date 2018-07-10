import * as React from 'react';
import { IconProps } from './IconProps';
export function Activity({className, size = 24, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><g data-name="Canvas"><g data-name="Icons / 24px / Activity" fill="none" clipPath="url(#icon24pxActivityClip0)"><path d="M6.933 16.07a1 1 0 0 1-1.802.035L3.107 12.09a1 1 0 0 1 1.786-.9l1.086 2.154 2.23-4.887c.366-.803 1.517-.773 1.84.049l2.64 6.714 3.618-9.574c.319-.841 1.5-.867 1.855-.04l2.757 6.427a1 1 0 1 1-1.838.788l-1.78-4.148-3.658 9.68c-.323.856-1.531.864-1.866.013L9.05 11.431l-2.117 4.64z" fill="#343A3C" data-name="Shape"></path></g></g><defs><clipPath id="icon24pxActivityClip0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
    );
}
