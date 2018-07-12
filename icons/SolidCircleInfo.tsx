import * as React from 'react';
import { IconProps } from './IconProps';
export function SolidCircleInfo({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" clipPath="url(#icon16pxSolidCircleInfoClip0)"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM9.909 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-2.43 1.991h.706a1 1 0 0 1 .968 1.252L8.846 8.42s-.384 1.266-.802 2.632c-.278.907.073.886.42.865.176-.01.35-.021.443.09.274.328-.413.994-1.323.994-.91 0-1.892-.589-1.492-1.949.136-.463.254-.853.361-1.21l.002-.007c.207-.687.378-1.255.58-2.002.186-.69-.111-.992-.72-1.325-.164-.09-.207-.516.233-.516h.931z" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon16pxSolidCircleInfoClip0"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>
    );
}
