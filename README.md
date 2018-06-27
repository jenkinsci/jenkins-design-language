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

## Testing Components

Navigate to the components directory and enter the component you would like to test. E.g. (components/Button)

##### Testing options:

To view test data in the browser you must first generate test data.

```
npm run test:generate-output
```

During development execute in watch-mode

```
npm run test:generate-output -- --watch
```

For tests via command line

```
npm run test
```

Debugging in the browser :

```
node --inspect-brk node_modules/.bin/jest --runInBand
```
