import * as React from 'react';
import { IconProps } from './IconProps';
export function Clear({ className, size = 18, width = size, height = size }: IconProps) {
    return (
        <svg
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
        >
            <g fill="none" clipPath="url(#icon24pxClearClip0)">
                <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    fill="#fff"
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </g>
            <defs>
                <clipPath id="icon24pxClearClip0">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}
