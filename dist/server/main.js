'use strict';

var _params = require('../../params');

var _params2 = _interopRequireDefault(_params);

var _index = require('./index');

var server = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

server.create(_params2.default.server).then(function () {
  return console.log('Who in here tryna start a riot?');
});