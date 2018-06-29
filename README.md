# Jenkins Design Language (JDL)

For end-user documentation, visit: http://jenkinsci.github.io/jenkins-design-language/

The Jenkins Design Language is a React component library with associated assets and styles available to use with [Jenkins Blue Ocean](https://github.com/jenkinsci/blueocean-plugin) and extensions, as well as any other project you may choose to use this library with.

## Building

This uses `lerna` to build, but needs some specific options, so they're baked into the `package.json`:

```
npm install
npm run bootstrap
```

### Clean

```
npm run clean
```

## Generating a new Component

This will provide options for generating a new component within the /components.

```
$ npm run generate
```

## Storybook

React Storybook is an easy way to develop components with real-time feedback, run in the browser. To run Storybook, just run:

```
npm start
```

Then go to: http://localhost:9001/

### Tests within storybook

Storybook may embed test results from Jest tests. For an example, see: [Button.stories.tsx](./components/Button/Button.stories.tsx#L11). In particular, note the fact that you must return the name of the suite, e.g. `require('./Button.test') && 'Button'`.

### Testing Components

```
npm test
```

Test may run for the entire set of components by running `npm test` at the root level, or you may navigate to the components directory and enter the component you would like to test (e.g. components/Button).

This project should have 100% test coverage, as there are no difficult tests such as connecting to external APIs and such that often prove problematic to reliably unit test.

### Documentation

This is currently using Github pages. See: [/docs](./docs)

Enjoy!
