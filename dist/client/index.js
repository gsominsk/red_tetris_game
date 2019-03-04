'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _storeStateMiddleWare = require('./middleware/storeStateMiddleWare');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _app = require('./containers/app');

var _app2 = _interopRequireDefault(_app);

var _alert = require('./actions/alert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};

var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)()));

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_app2.default, null)
), document.getElementById('tetris'));

store.dispatch((0, _alert.alert)('Soon, will be here a fantastic Tetris ...'));