# Jenkins Design Language (JDL)

Reusable [React] components and design elements that adhere to the Jenkins Design Language (Blue Ocean edition).
 
License is MIT. Other licenses in /licenses

## NPM installing

```bash
$ npm install --save @jenkins-cd/design-languages
```

## Using in a Jenkins plugin

Once installed, you can use the JDL components in the [React] components in your plugin e.g.
  
```javascript
import { WeatherIcon } from '@jenkins-cd/design-language';

export default class WeatherIconBox extends Component {
  render() {
    return (<div className="weather-icon-box">
        <WeatherIcon score="31" />
      </div>);
  }
}
```

It is assumed that you will be creating a browser `.js` bundle and including it in your plugin's
HPI artifact. The best/easiest way to do this is to use the [js-builder], including it in your
plugin's maven build. Building with [js-builder] will ensure that your plugin bundle gets a proper
reference to Blue Ocean's `@jenkins-cd/design-language` and other React components

> __Note__: Not using [js-builder] will mean that you will need to take care of all of this in your
> plugin bundles build scripts, implementing lower level [js-modules] code to async load Blue Ocean
> shared dependencies. While that's a lot of fun, you'd probably prefer to be spending your time
> adding value in other places Vs solving problems that have already been solved for you.

## Developing and testing

If you are working on adding features to the JDL, you'll probably want to do that in an iterative
way i.e you will not want to have to publish changes after every change (or use relative `package.json` paths)
and then run `npm install`.

At the moment, the most sane way of doing that is to simply use `npm link` and change-watches to trigger
rebundling where necessary e.g. in the `blueocean-web` plugin.

### Step 1: `npm link` the JDL code

In the `jenkins-design-language` folder, run `npm link`.

### Step 2: `watch` for JDL code changes

In the `jenkins-design-language` folder, run `gulp watch`.

### Step 3: `npm link` the JDL code into `blueocean-web`

In the `blueocean-web` folder, run `npm link @jenkins-cd/design-language`.

It may seem strange that you need to do this, but there's a good reason. Blue Ocean does not load and
instantiate multiple instances of `react` (and `react-dom`) and `@jenkins-cd/design-language` for every plugin. That simply
would not work (for a number of reasons). Instead, `blueocean-web` is responsible for creating and `export`ing
shared instances of these modules via [js-modules]. Then, other plugins that need access to these shared component
instances `import` them via [js-modules]. For that reason, `blueocean-web` needs to know about ("watch for")
changes in the `@jenkins-cd/design-language` as you are working on it.

> To reiterate a point made earlier in this doc, if you use [js-builder] to build your plugin's `.js` bundle, then all
> of the above runtime pluming is done for you automatically.

### Step 4: `watch` for `blueocean-web` changes (and rebundle)

In the `blueocean-web` folder, run `gulp bundle:watch`.

This will watch for changes not only in `blueocean-web` code, but also in the linked `@jenkins-cd/design-language`
code, triggering a rebundle of `blueocean-web` code, making it available to the browser.

> As you might notice, there's a `watch` + `rebundle` cascading effect going on here i.e. changes in
> `@jenkins-cd/design-language` are watched for and rebundled (Step 2), which triggers the `blueocean-web`
> watch and rebundle (Step 4).

### Steps 5 + 6: `npm link` the JDL code into other HPI plugin projects + `bundle:watch` there too

Basically ... repeating Steps 3 and 4 in other HPI plugins that you are working on.

### Publish a new version of `@jenkins-cd/design-language`

Once your changes have been made (and through the PR contribution process), we need to publish a new version
of the `@jenkins-cd/design-language` package to the NPM registry (to the `jenkins-cd` organization).

If you're not already a member of the `jenkins-cd` organization, please ping us and we'll add you. Otherwise,
someone else can publish a new version of the package for you.

[React]: https://reactjs.org/
[js-builder]: https://github.com/jenkinsci/js-builder
[js-samples]: https://github.com/jenkinsci/js-samples
[js-modules]: https://github.com/jenkinsci/js-modules

# Repo

This current repository was filtered from https://github.com/cloudbees/blueocean.git at 99f14895c448eb7303d2eaa29f369ce50f4fb674
on 2016-05-09.
