import '../css/index.scss';
import 'storybook-addon-specifications/register';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const addon = require('storybook-addon-specifications');
const { specs, describe, it } = addon;

window.specs = specs;
window.describe = describe;
window.it = it;

// BELOW CAME FROM STORYBOOK --------------

const { configure } = require('@storybook/react');

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /.stories.(ts|tsx)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
