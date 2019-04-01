'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

var _newpass = require('./newpass');

var _newpass2 = _interopRequireDefault(_newpass);

var _rates = require('./rates');

var _rates2 = _interopRequireDefault(_rates);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _singlegame = require('./singlegame');

var _singlegame2 = _interopRequireDefault(_singlegame);

require('./app.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'app-container' },
                _react2.default.createElement(
                    'switch',
                    null,
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '', component: _game2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/singleplay', component: _singlegame2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/rates', component: _rates2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: _login2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login/register', component: _register2.default }),
                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login/newpass', component: _newpass2.default })
                )
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;