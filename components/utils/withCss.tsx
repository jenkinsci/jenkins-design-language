import * as React from 'react';

export interface CssProps {
    /**
     * Built style classes
     */
    css: (styles: string) => string;

    /**
     * Indicates this item is primary
     */
    primary?: boolean;

    /**
     * Indicates this item is primary
     */
    small?: boolean;

    /**
     * Indicates this item is primary
     */
    large?: boolean;

    /**
     * Indicates this item is primary
     */
    destructive?: boolean;
}

const cssClasses = {
    primary: 'primary',
    small: 'small',
    large: 'large',
    destructive: 'destructive',
};

/**
 * Provides standard CSS properties to provided components and a `css` method,
 * to enable plugins to have a simple function to call to get all the appropriate
 * css class names, e.g.:
```jsx
export const SomeComponent = withCss(({css, children}) =>
    <div className={css('SomeComponent')}>{children}</div>;
```
 */
export function withCss<P extends CssProps>(Component: React.ComponentType<P>) {
    return function StandardPropsComponent(props: P) {
        let css = '';
        const keys = Object.keys(props);
        for (let i = 0; i < keys.length; i++) {
            const cls = cssClasses[keys[i]];
            if (cls) {
                css += ' ' + cls;
            }
        }
        const styledProps = {
            css: (s: string) => (s || '') + css,
        };
        Object.assign(styledProps, props);
        return <Component {...styledProps} />;
    };
}
