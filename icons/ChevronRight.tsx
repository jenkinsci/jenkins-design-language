import * as React from 'react';
import { IconProps } from './IconProps';
export function ChevronRight({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g data-name="Canvas"><g data-name="Icons / 16px / Chevron Right"><path d="M6 4l4 4-4 4" stroke="#969c9e" data-name="Vector" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g></g></svg>
    );
}
