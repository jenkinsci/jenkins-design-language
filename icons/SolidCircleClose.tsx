import * as React from 'react';
import { IconProps } from './IconProps';
export function SolidCircleClose({className, size = 16, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" clipPath="url(#icon16pxSolidCircleCloseClip0)"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm2.121-11.534a1 1 0 0 1 1.415 1.414L9.414 8l2.122 2.121a1 1 0 1 1-1.415 1.415L8 9.415l-2.121 2.122a1 1 0 0 1-1.415-1.415l2.122-2.12L4.464 5.88A1 1 0 1 1 5.88 4.466L8 6.586l2.121-2.12z" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon16pxSolidCircleCloseClip0"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>
    );
}
