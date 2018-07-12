import * as React from 'react';
import { IconProps } from './IconProps';
export function ThreeVerticalDots({ className, size = 24, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><g fill="none" clipPath="url(#icon24pxThreeVerticalDotsClip0)"><path d="M12 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm1.5 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon24pxThreeVerticalDotsClip0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
    );
}
