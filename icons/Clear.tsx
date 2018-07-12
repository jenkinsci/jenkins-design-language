import * as React from 'react';
import { IconProps } from './IconProps';
export function Clear({ className, size = 24, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><g data-name="Canvas"><g data-name="Icons / 18px / Clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" stroke="#fff" data-name="Vector" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></g></g></svg>
    );
}
