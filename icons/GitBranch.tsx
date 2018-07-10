import * as React from 'react';
import { IconProps } from './IconProps';
export function GitBranch({className, size = 16, width = size, height = size}: IconProps) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}><g fill="none" clipPath="url(#icon16pxGitBranchClip0)"><path d="M5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2-1a2 2 0 0 1-1 1.732V9.24c.55-.31 1.132-.504 1.61-.663l.074-.025c.793-.264 1.333-.46 1.714-.798.228-.203.446-.502.546-1.054A1.999 1.999 0 0 1 11 3a2 2 0 0 1 .956 3.757c-.132 1.087-.56 1.896-1.23 2.49-.717.639-1.638.945-2.336 1.177l-.074.025c-.793.264-1.333.46-1.714.798-.228.203-.446.502-.546 1.054A1.999 1.999 0 0 1 5 16a2 2 0 0 1-1-3.732V3.732A2 2 0 1 1 7 2zm4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-6 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="#343A3C" fillRule="evenodd" clipRule="evenodd"></path></g><defs><clipPath id="icon16pxGitBranchClip0"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>
    );
}
