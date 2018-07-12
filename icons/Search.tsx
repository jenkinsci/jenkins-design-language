import * as React from 'react';
import { IconProps } from './IconProps';
export function Search({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" clipPath="url(#icon16pxSearchClip0)"><path d="M4.333 7a2.667 2.667 0 1 1 5.334 0 2.667 2.667 0 0 1-5.334 0zM7 2.333a4.667 4.667 0 1 0 2.517 8.598l2.443 2.443a1 1 0 0 0 1.414-1.414L10.93 9.517A4.667 4.667 0 0 0 7 2.334z" fill="#969c9e" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon16pxSearchClip0"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>
    );
}
