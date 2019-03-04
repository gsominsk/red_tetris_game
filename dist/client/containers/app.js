'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var message = _ref.message;

  return _react2.default.createElement(
    'span',
    null,
    message
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    message: state.message
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(App);