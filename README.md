# Jenkins Design Language (JDL)

The Jenkins Design Language is a React component library and associated styles available to use with [Jenkins Blue Ocean](https://github.com/jenkinsci/blueocean-plugin) and extensions, as well as any other project you may choose to use this library with.

## Building

This uses `lerna` to build, but needs some specific options, so they're baked into the `package.json`:

```
npm install
npm run bootstrap
```

To run storybook:

```
npm start
```

Then go to: http://localhost:9001/
