import 'jest-storybook-facade/storybook-facade.js';
import '../css/index.scss';
import 'storybook-addon-specifications/register';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const { configure } = require('@storybook/react');

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /.stories.(ts|tsx)$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
