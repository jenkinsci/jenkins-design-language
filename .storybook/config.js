const { configure } = require('@storybook/react');

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /.stories.(ts|tsx)$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
