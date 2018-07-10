import * as React from 'react';
import { IconProps } from './IconProps';
export function ArrowLeft({className, size = 24, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><g fill="none" clipPath="url(#icon24pxArrowLeftClip0)"><path d="M10.707 6.707a1 1 0 0 0-1.414-1.414l-6 6a1 1 0 0 0 0 1.414l6 6a1 1 0 0 0 1.414-1.414L6.414 13H20a1 1 0 1 0 0-2H6.414l4.293-4.293z" fill="#969c9e" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon24pxArrowLeftClip0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
    );
}
