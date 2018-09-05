import * as React from 'react';
import { IconProps } from './IconProps';
export function Unchecked({ className, size = 20, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><rect width="20" height="20" rx="3" fill="white"></rect><rect x="0.5" y="0.5" width="19" height="19" rx="2.5" stroke="#4A4A4A" strokeOpacity="0.25"></rect></svg>
    );
}
