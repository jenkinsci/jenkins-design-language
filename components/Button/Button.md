Buttons are one of the most basic types of controls.

```scss
.thing {
    .nested {
        color: red;
    }
}
```

```html
<div class="thing">
    <div class="nested">
        This is some text
    </div>
</div>
```

```js static
$('.thing .nested').each(i => {
    console.log('thing: ' + i.text());
});
```

```jsx
<Button>This is a basic button</Button>
```

```jsx
<Button primary={true}>This is a primary button</Button>
```
