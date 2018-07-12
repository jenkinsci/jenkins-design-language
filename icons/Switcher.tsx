import * as React from 'react';
import { IconProps } from './IconProps';
export function Switcher({ className, size = 24, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><g stroke="#343A3C" fill="none" clipPath="url(#icon24pxSwitcherClip0)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 9h9m0 0l-4-4m4 4l-4 4M13 15H4m0 0l4.32 4M4 15l4.32-4"></path></g><defs><clipPath id="icon24pxSwitcherClip0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
    );
}
