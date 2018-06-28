import * as React from 'react';

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
    primary: 'primary',
    small: 'small',
    large: 'large',
    destructive: 'destructive',
    disabled: 'is-disabled',
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
export function withCss<P>(
    Component: React.ComponentType<P & CssProp>
): React.ComponentType<P & CssProps> {
    return class StandardPropsComponent extends React.Component<P & CssProps> {
        static displayName = 'Css(' + Component.displayName + ')';
        constructor(props: P) {
            super(props);
        }
        render() {
            const styledProps = {
                css: (s: string) => {
                    let css = s || '';
                    const keys = Object.keys(this.props);
                    for (let i = 0; i < keys.length; i++) {
                        const cls = cssClasses[keys[i]];
                        if (cls) {
                            css += ' ' + cls;
                        }
                    }
                    return css;
                },
            };
            Object.assign(styledProps, this.props);
            return <Component {...styledProps} />;
        }
    };
}
