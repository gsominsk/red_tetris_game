'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('http').createServer();
var io = require('socket.io')(app);

var logerror = (0, _debug2.default)('tetris:error'),
    loginfo = (0, _debug2.default)('tetris:info');

var initApp = function initApp(params, cb) {
  var host = params.host,
      port = params.port;


  var handler = function handler(req, res) {
    var file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
    _fs2.default.readFile(__dirname + file, function (err, data) {
      if (err) {
        logerror(err);
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  };

  app.on('request', handler);

  app.listen({ host: host, port: port }, function () {
    loginfo('tetris listen on ' + params.url);
    cb();
  });
};

var initEngine = function initEngine() {
  io.on('connection', function (socket) {
    loginfo("Socket connected: " + socket.id);
    socket.on('action', function (action) {
      if (action.type === 'server/ping') socket.emit('action', { type: 'pong' });
    });
  });
};

function create(params) {
  var promise = new Promise(function (resolve, reject) {
    initApp(params, function () {
      var stop = function stop(cb) {
        io.close();
        app.close(function () {
          app.unref();
        });
        loginfo('Engine stopped.');
        cb();
      };

      initEngine();
      resolve({ stop: stop });
    });
  });
  return promise;
}