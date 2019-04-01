'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _rates = require('./rates');

var _rates2 = _interopRequireDefault(_rates);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    game: _game2.default,
    user: _user2.default,
    rates: _rates2.default
});