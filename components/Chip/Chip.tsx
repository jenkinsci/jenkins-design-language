import * as React from 'react';
import { css, CssProps } from '@jdl2/css-util';

export interface ChipProps extends CssProps {}

export function Chip(props: ChipProps) {
    return <div className={css(props, 'Chip')}>Chip</div>;
}
