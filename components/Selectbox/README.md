# Selectbox

The Selectbox component renders a simple Selectbox based on user defined options.

```jsx static
const options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];
const handleChange = (e: HTMLInputElement) => alert('changed to value: ' + e.value);

<Selectbox options={options} value={options[0].value} onChange={handleChange} />;
```
