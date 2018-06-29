export interface CssProps {
    /**
     * Indicates this should be displayed with an idication it is
     * a primary action
     */
    primary?: boolean;

    /**
     * Indicates this item should be rendered in a small form
     */
    small?: boolean;

    /**
     * Indicates this should be rendered in the large form
     */
    large?: boolean;

    /**
     * Indicates this item will result in a destructive action
     */
    destructive?: boolean;

    /**
     * indicates this item is disabled
     */
    disabled?: boolean;
}

export interface CssProp {
    /**
     * Built style classes
     */
    css: (styles: string) => string;
}

const cssClasses = {
    primary: 'is-primary',
    small: 'is-small',
    large: 'is-large',
    destructive: 'is-destructive',
    disabled: 'is-disabled',
};

/**
 * Function to apply known css classes & concatenate additional provided classes
 * @param props
 * @param classes
 */
export function css(props: CssProps, ...classes: string[]): string {
    let css = classes.length == 0 ? '' : classes.length === 1 ? classes[0] : classes.join(' ');
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
        const cls = cssClasses[keys[i]];
        if (cls) {
            css += ' ' + cls;
        }
    }
    return css;
}
