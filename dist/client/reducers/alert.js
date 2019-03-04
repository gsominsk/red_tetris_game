'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alert = require('../actions/alert');

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _alert.ALERT_POP:
      return { message: action.message };
    default:
      return state;
  }
};

exports.default = reducer;