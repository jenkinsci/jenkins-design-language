import * as React from 'react';
import { IconProps } from './IconProps';
export function Close({className, size = 24, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><g fill="none" clipPath="url(#icon24pxCloseClip0)"><path d="M6.343 4.929A1 1 0 1 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414L12 13.414l5.657 5.657a1 1 0 1 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586 6.343 4.929z" fill="#969c9e" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon24pxCloseClip0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
    );
}
