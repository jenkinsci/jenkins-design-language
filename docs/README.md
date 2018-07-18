# Github Pages Site

Documentation for this project consists of a basic [Github pages](https://pages.github.com/) site and a style guide based on [React Styleguidist](https://react-styleguidist.js.org/) component documentation area.

## Run Github Pages locally

To run this locally, easiest is to use Docker and run:

```
docker run --rm -it -v "$(pwd)":/usr/src/app -p 4000:4000 starefossen/github-pages
```

## Run Style Guide locally

```
npm run styleguide
```

To publish updated styleguidist docs, run:

```
npm run styleguide-build
```

## Randon Notes

Is this any good? http://typedoc.org/
