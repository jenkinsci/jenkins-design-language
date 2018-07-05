# Dialog

A dialog based on `react-modal`. You may define more than one modal at any given time.

```JSX
addDialog(title: string, className: string, children: JSX.Element, onDismiss?: () => void)

const title = 'My Dialog'
const additionalClass = 'outline'
const content = <span>Some modal content</span>
const onDismiss = jest.fn()

// Add dialog(s). Note, additional dialogs will appear above previous.
dialogs.addDialog(title, additionalClass, content, onDismiss);
dialogs.addDialog(title, additionalClass, content, onDismiss);
setTimeout(() => {
    dialogs.addDialog(title, additionalClass, content, onDismiss); // 3rd on top of stack
}, 5000);
dialogs.render();
```
