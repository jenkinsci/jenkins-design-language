import * as React from 'react';
import { IconProps } from './IconProps';
export function GitCommit({ className, size = 16, width = size, height = size }: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" clipPath="url(#icon16pxGitCommitClip0)"><path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm1.9 1a5.002 5.002 0 0 1-9.8 0H1a1 1 0 0 1 0-2h2.1a5.002 5.002 0 0 1 9.8 0H15a1 1 0 1 1 0 2h-2.1z" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon16pxGitCommitClip0"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>
    );
}
