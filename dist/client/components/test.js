'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = exports.Tetris = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tetris = exports.Tetris = function Tetris() {
  return _react2.default.createElement(Board, null);
};

var Board = exports.Board = function Board() {
  return _react2.default.createElement('div', null);
};