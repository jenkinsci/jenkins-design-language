import * as React from 'react';
import { IconProps } from './IconProps';
export function Star({className, size = 24, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}><g data-name="Canvas"><g data-name="Icons / 24px / Star" fill="none" clipPath="url(#icon24pxStarClip0)"><path d="M16.525 19.932l.002.001a.317.317 0 0 0 .39-.001.455.455 0 0 0 .143-.492l-1.499-4.81-.208-.67.56-.425 3.922-2.972a.454.454 0 0 0 .144-.492c-.06-.192-.213-.28-.34-.28h-5.584l-.218-.703-1.499-4.808C12.278 4.087 12.126 4 12 4c-.128 0-.28.09-.338.277v.002l-1.499 4.809-.219.702H4.361c-.129 0-.28.09-.339.278v.002a.454.454 0 0 0 .143.492l3.922 2.973.559.424-.209.67-1.498 4.81v.002a.454.454 0 0 0 .143.49m4.917-3.43l.604.457 3.922 2.974M12 16.5l-.604.458zm-4.528 3.433l.002-.001 3.922-2.974m-3.924 2.975a.317.317 0 0 1-.193.067zM7.278 20a.323.323 0 0 1-.196-.069z" stroke="#343A3C" data-name="Vector" clipRule="evenodd" strokeWidth="2"></path></g></g><defs><clipPath id="icon24pxStarClip0"><path fill="#fff" d="M0 0h24v24H0z"></path></clipPath></defs></svg>
    );
}
