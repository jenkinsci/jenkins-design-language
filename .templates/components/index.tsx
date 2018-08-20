import * as React from 'react';
import { css, CssProps } from '@jdl2/css-util';

export interface [componentName]Props extends CssProps {
}

export function [componentName](props: [componentName]Props) {
    return (
        <div className={css('[componentName]')}>
            [componentName]
        </div>
    );
}
