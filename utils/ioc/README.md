# ioc

This is ioc documentation

If you want to have control over how instances are created,
it's possible to implement and register a provider. For example.
to automatically create logger instances with the name of a class
when `@inject Logger log`, you would do something like this:

```typescript
import { createLogger, Logger } from '@jdl2/log';
import { KeyMap } from '@jdl2/log';
import { Injector } from '@jdl2/ioc';

export function configure(injector: Injector) {
    const loggerInstances = new KeyMap();
    function LoggerProvider(i: Injector, obj: object): Logger {
        return loggerInstances.getOrCreate(obj.constructor, () => createLogger(obj.constructor.name));
    }
    injector.bind(Logger).toProvider(LoggerProvider);
}
```
