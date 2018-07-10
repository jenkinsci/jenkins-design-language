import * as React from 'react';
import { IconProps } from './IconProps';
export function Dashboard({className, size = 24, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><g data-name="Canvas"><g data-name="Icons / 24px / Dashboard" fill="none" clipPath="url(#icon24pxDashboardClip0)"><path d="M9 4H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM5 14V6h4v8H5zM15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 14V6h4v12h-4z" fill="#343A3C" data-name="Shape" fillRule="evenodd" clipRule="evenodd"></path></g></g><defs><clipPath id="icon24pxDashboardClip0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
    );
}
