'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ALERT_POP = exports.ALERT_POP = 'ALERT_POP';

var alert = exports.alert = function alert(message) {
  return {
    type: ALERT_POP,
    message: message
  };
};