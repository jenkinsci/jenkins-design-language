import * as React from 'react';
import { IconProps } from './IconProps';
export function Plus({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M5 0C4.44771 0 4 0.447708 4 1V4H1C0.447708 4 0 4.44771 0 5C0 5.55229 0.447708 6 1 6H4V9C4 9.55229 4.44771 10 5 10C5.55229 10 6 9.55229 6 9V6H9C9.55229 6 10 5.55229 10 5C10 4.44771 9.55229 4 9 4H6V1C6 0.447708 5.55229 0 5 0Z" transform="translate(3 3)" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></svg>
    );
}
