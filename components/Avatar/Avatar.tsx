import * as React from 'react';
import { css, CssProps } from '@jdl2/css-util';

export interface AvatarProps extends CssProps {}

export function Avatar(props: AvatarProps) {
    return <div className={css(props, 'Avatar')}>Avatar</div>;
}
