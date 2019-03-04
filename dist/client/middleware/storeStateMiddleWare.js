"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var storeStateMiddleWare = exports.storeStateMiddleWare = function storeStateMiddleWare(_ref) {
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      var returnValue = next(action);
      window.top.state = getState();
      return returnValue;
    };
  };
};