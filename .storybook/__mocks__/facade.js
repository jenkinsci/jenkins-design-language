function storiesOf() {
    var api = {};
    api.add = (name, func) => {
        func();
        return api;
    };
    api.addWithInfo = (name, func) => {
        func();
        return api;
    };
    return api;
}

function action() {}
function linkTo() {}
function specs(spec) {
    spec();
}
const { describe, it } = jasmine.currentEnv_;

module.exports = {
    storiesOf,
    action,
    linkTo,
    specs,
    describe,
    it,
};
