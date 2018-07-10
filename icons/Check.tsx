import * as React from 'react';
import { IconProps } from './IconProps';
export function Check({className, size = 16, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" clipPath="url(#icon16pxCheckClip0)"><path d="M13.686 3.786a1 1 0 0 0-1.415 0l-6.364 6.363-2.121-2.12a1 1 0 1 0-1.414 1.413L5.2 12.271a1 1 0 0 0 1.414 0L13.686 5.2a1 1 0 0 0 0-1.414z" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon16pxCheckClip0"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>
    );
}
