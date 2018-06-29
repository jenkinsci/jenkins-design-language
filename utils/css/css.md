Exports the `CssProps` interface to easily add css properties to component properties interfaces. For example:

```jsx static
import { css, CssProps } from '@jdl2/util/css';

export interface CompProps extends CssProps {
    children: React.ReactNode;
}

export function Comp(props: CompProps) {
    return <div className={css(this.props, 'Comp')}>{props.children}</div>;
}

<Comp primary small>
    ... stuff ...
</Comp>;
```
