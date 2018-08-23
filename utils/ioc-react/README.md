# ioc-react

This is ioc-react documentation

To configure injection in your React project, simply
create an `Injector` instance and pass it to an
`InjectorContext` component:

```typescript jsx
import * as React from 'react';
import { Injector } from '@jdl2/ioc';
import { InjectorContext } from '@jdl2/ioc-react';

// Create and configure an injector
const injector = new Injector();

export class App extends React.Component {
    render() {
        return (
            <InjectorContext injector={injector}>
                <div>... your app ...</div>
            </InjectorContext>
        );
    }
}
```
