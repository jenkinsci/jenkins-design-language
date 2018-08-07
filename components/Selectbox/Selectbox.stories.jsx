'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var react_1 = require('@storybook/react');
var Selectbox_1 = require('./Selectbox');
var options = [{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }];
react_1
    .storiesOf('Selectbox', module)
    .add('should display a selectbox', function() {
        return <Selectbox_1.Selectbox options={options} value={options[0].value} />;
    })
    .add('should alert on change', function() {
        var handleChange = function(e) {
            return alert('changed to value: ' + e.value);
        };
        return (
            <Selectbox_1.Selectbox
                options={options}
                value={options[0].value}
                onChange={handleChange}
            />
        );
    });
