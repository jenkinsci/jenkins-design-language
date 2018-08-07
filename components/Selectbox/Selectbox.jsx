'use strict';
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
                function(d, b) {
                    d.__proto__ = b;
                }) ||
            function(d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    Object.assign ||
    function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var react_select_1 = require('react-select');
require('react-select/dist/react-select.css');
var Selectbox = /** @class */ (function(_super) {
    __extends(Selectbox, _super);
    function Selectbox() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.state = {
            selectedOption: _this.props.value || '',
        };
        _this.handleChange = function(selectedOption) {
            _this.setState(
                __assign({}, _this.state, { selectedOption: selectedOption.value || '' })
            );
            if (_this.props.onChange) {
                _this.props.onChange(selectedOption);
            }
        };
        return _this;
    }
    Selectbox.prototype.render = function() {
        var defaults = {
            className: 'Dropdown',
            clearable: false,
        };
        return (
            <react_select_1.Creatable
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.props.options}
                {...defaults}
            />
        );
    };
    return Selectbox;
})(React.Component);
exports.Selectbox = Selectbox;
