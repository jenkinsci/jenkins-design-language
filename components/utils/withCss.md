### Example Usage

Given a `withCss` definition like this:

```jsx static
export const SomeComponent = withCss(({css, children}) =>
    <div className={css('SomeComponent')}>{children}</div>;
```

And usage like this:

```jsx static
<SomeComponent primary small>Hello!</div>;
```

Outputs:

```html
    <div class="SomeComponent is-primary is-small">Hello!</div>;
```
