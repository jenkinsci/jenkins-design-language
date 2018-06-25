import * as React from 'react';
import { configure, storiesOf } from '@storybook/react';

// // import styles
// import '../src/css/App.scss';

// Provide global unit testing capabilites
import { specs, describe, it } from 'storybook-addon-specifications';
import { configure as configureEnzyme, mount } from 'enzyme';
import expect from 'expect';
window.describe = describe;
window.it = it;
window.expect = expect;
window.specs = specs;
window.mount = mount;
import * as Adapter from 'enzyme-adapter-react-16';
configureEnzyme({ adapter: new Adapter() });

// automatically require all .tsx files in stories
const req = require.context('../stories', true, /\.tsx$/);
function addSourceLink(path, component) {
    path = path.substring(2); // starts with ./
    return React.createElement(
        'div',
        { style: { padding: '2em' } },
        React.createElement(
            'a',
            { href: repositoryBase + path, target: '_blank' },
            repositoryBase + path
        ),
        React.createElement('hr'),
        React.createElement('div', { style: { paddingTop: '1em' } }, component)
    );
}

// // Bootstrap the app services
// import '../src/js/Module';

function space(camelCase) {
    return camelCase.replace(/([A-Z])/g, ' $1').trim();
}

function loadStories() {
    req.keys().forEach(filename => {
        const story = req(filename);
        const path = filename.split('/');
        const dir = path[path.length - 2];
        const fname = path[path.length - 1].replace(/\.tsx$/, '');
        const theExport = story.__esModule && story.default;
        if (theExport && theExport.$$typeof) {
            // just return React components, but what is the right test here?
            storiesOf(space(dir), theExport).add(space(fname), function() {
                return addSourceLink(filename, theExport);
            });
        } else if (
            typeof theExport === 'function' ||
            theExport instanceof Function
        ) {
            // also, automatically name and return functions
            storiesOf(space(dir), theExport).add(space(fname), () =>
                addSourceLink(filename, theExport())
            );
        }
        return story;
    });
}

configure(loadStories, module);
