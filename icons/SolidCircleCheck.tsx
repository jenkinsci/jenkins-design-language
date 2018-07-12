import * as React from 'react';
import { IconProps } from './IconProps';
export function SolidCircleCheck({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" clipPath="url(#icon16pxSolidCircleCheckClip0)"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm2.864-11.207a1 1 0 1 1 1.414 1.414l-4.95 4.95a1 1 0 0 1-1.414 0l-.707-.707-1.414-1.414A1 1 0 1 1 5.207 7.62l1.414 1.415 4.243-4.243z" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon16pxSolidCircleCheckClip0"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>
    );
}
