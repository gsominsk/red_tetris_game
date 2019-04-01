'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.start = start;

var _to = require('./utils/to');

var _to2 = _interopRequireDefault(_to);

var _mailer = require('./utils/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _hashGenerator = require('./utils/hashGenerator');

var _hashGenerator2 = _interopRequireDefault(_hashGenerator);

var _Game = require('./utils/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var socketServer = require('socket.io');
var mongoose = require('mongoose');

var User = require('./models/User');

var app = express();

var server = http.createServer(app);
var io = socketServer(server);

start({
    port: 3000
});

connectToDatabase();

function start(data) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    server.listen(data.port, function () {
        console.log('[+] Server is running on port: ' + data.port);
    });
}

function connectToDatabase() {
    mongoose.set('debug', true);
    mongoose.connect('mongodb://localhost:27017/rtg', { useNewUrlParser: true });

    var db = mongoose.connection;
    db.on('error', function () {
        console.error('[!] Connection to database failed.');
    });
    db.once('open', function () {
        console.log('[+] Connection to database successful.');
    });
}

var connections = [];

/*
* =========== GAME WAITING ROOM ===========
*
* Представление того как выглядит комната ожидания.
*
* {
*     loggedIn: false, // anonymous player
*     userKey: '...' // socket id key
* },{
*     loggedIn: true, // registered player
*     userKey: '...' // session key
* }
*
* =========================================
* */

var gameWaitingPlayers = [];

/*
* =========== GAME PLAYING ROOM ===========
*
* Представление того как выглядит созданная
* игровая комната.
*
* 'gameKey': { //generated game key from hashGenerator
*     firstPlayer: {
*         key: '', // socket or session key
*         loggedIn: false, // anonymous player
*         socketId: 'key' // socketId of user
*     },
*     secondPlayer: {
*         key: '', // socket or session key
*         loggedIn: true, // registered player
*         socketId: 'key' // socketId of user
*     }
* }
*
* =========================================
* */

var gamePlayingRooms = {};

io.on('connection', function (socket) {
    console.log("[+] Connected to Socket : ", socket.id);
    connections.push(socket);

    socket.on('disconnect', function () {
        console.log('=============== DISCONNECTING USER FROM WAITING ROOM =================');
        for (var i = 0; i < gameWaitingPlayers.length; i++) {
            console.log('[+] gameWaitingPlayer : ', gameWaitingPlayers[i]);
            if (gameWaitingPlayers[i].socketId === socket.id) {
                console.log('[+] user disconnected from waiting room : ', gameWaitingPlayers[i]);
                gameWaitingPlayers.splice(i, 1);
            }
        }
        console.log('======================================================================');

        console.log('=============== DISCONNECTING USER FROM GAMING ROOM =================');
        deleteRoom(socket);
        console.log('=====================================================================');
        console.log('[+] Disconnected : ', socket.id);
    });

    socket.on('single.game.create', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
            var err, user, _ref2, _ref3, player, gameKey;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            err = void 0, user = void 0;

                            if (!data.sessionKey) {
                                _context.next = 8;
                                break;
                            }

                            _context.next = 4;
                            return (0, _to2.default)(User.findOne({
                                session: data.sessionKey
                            }));

                        case 4:
                            _ref2 = _context.sent;
                            _ref3 = _slicedToArray(_ref2, 2);
                            err = _ref3[0];
                            user = _ref3[1];

                        case 8:

                            // Создаем игрока, если зарегестрирован то вводим ключ сессии, если не зарегестрирован
                            // вводим айди сокета.
                            player = {
                                loggedIn: !data.sessionKey ? false : true,
                                key: !data.sessionKey ? socket.id : data.sessionKey,
                                socketId: socket.id,
                                login: user ? user.login : 'Anonymous',
                                score: user ? user.score : '0'
                            };
                            gameKey = (0, _hashGenerator2.default)(11);

                            gamePlayingRooms[gameKey] = {
                                firstPlayer: {
                                    loggedIn: player.loggedIn,
                                    socketId: player.socketId,
                                    key: player.key
                                },
                                roomName: (0, _hashGenerator2.default)(12),
                                game: new _Game2.default([player.socketId])
                            };

                            socket.emit('single.game.created', {
                                firstPlayer: {
                                    login: player.login,
                                    score: player.score,
                                    figures: gamePlayingRooms[gameKey].game.getFiguresPosition('one')
                                },
                                gameKey: gameKey
                            });

                            socket.emit('single.game.start.success', { gameKey: gameKey });

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());

    socket.on('single.game.start', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
            var gameLoop;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            console.log('[+] SINGLE GAME START');
                            // console.log('[+] already start : ')

                            if (!gamePlayingRooms[data.gameKey].game.alreadyStart()) {
                                _context2.next = 3;
                                break;
                            }

                            return _context2.abrupt('return');

                        case 3:

                            gamePlayingRooms[data.gameKey].game.start();

                            gameLoop = setInterval(function () {
                                console.log('[+] SINGLE GAME LOOP');
                                if (gamePlayingRooms[data.gameKey]) {
                                    gamePlayingRooms[data.gameKey].game.step('one');

                                    // Кто то достиг потолка и игра закончилась
                                    if (gamePlayingRooms[data.gameKey].game.checkEndGame()) {
                                        clearInterval(gameLoop);
                                        socket.emit('single.game.end', {
                                            winner: gamePlayingRooms[data.gameKey].game.getWinner(),
                                            end: true,
                                            msg: 'End Game'
                                        });
                                        deleteRoom(socket);
                                        return;
                                    }

                                    var res = {
                                        firstPlayer: {
                                            figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition('one')
                                        }
                                    };

                                    socket.emit('single.game.update.success', res);
                                } else {
                                    clearInterval(gameLoop);
                                }
                            }, 1000);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        return function (_x2) {
            return _ref4.apply(this, arguments);
        };
    }());

    socket.on('single.game.move', function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(data) {
            var player, res;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!(!gamePlayingRooms[data.gameKey] || gamePlayingRooms[data.gameKey].game.checkEndGame())) {
                                _context3.next = 2;
                                break;
                            }

                            return _context3.abrupt('return');

                        case 2:
                            player = 'one';

                            gamePlayingRooms[data.gameKey].game.move(data.move, player);
                            res = {
                                firstPlayer: {
                                    figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition(player)
                                }
                            };


                            socket.emit('single.game.update.success', res);

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        return function (_x3) {
            return _ref5.apply(this, arguments);
        };
    }());

    socket.on('single.game.disconnect.push', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var room;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        console.log('=============== SINGLE DISCONNECTING USER FROM GAMING ROOM =================');
                        for (room in gamePlayingRooms) {
                            if (gamePlayingRooms[room].firstPlayer.socketId == socket.id) {
                                delete gamePlayingRooms[room];
                            }
                        }
                        console.log('=============================================================================');

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    })));

    socket.on('game.disconnect.push', _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var i;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        console.log('=============== DISCONNECTING USER FROM WAITING ROOM =================');
                        for (i = 0; i < gameWaitingPlayers.length; i++) {
                            console.log('[+] gameWaitingPlayer : ', gameWaitingPlayers[i]);
                            if (gameWaitingPlayers[i].socketId === socket.id) {
                                console.log('[+] user disconnected from waiting room : ', gameWaitingPlayers[i]);
                                gameWaitingPlayers.splice(i, 1);
                            }
                        }
                        console.log('======================================================================');

                        console.log('=============== DISCONNECTING USER FROM GAMING ROOM =================');
                        deleteRoom(socket);
                        console.log('=====================================================================');

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    })));

    socket.on('game.find', function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(data) {
            var err, user, _ref9, _ref10, player, _hash, playerToConnect, i, _roomName, _gameKey, _hash2, roomName, gameKey, hash;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            err = void 0, user = void 0;

                            if (!data.sessionKey) {
                                _context6.next = 8;
                                break;
                            }

                            _context6.next = 4;
                            return (0, _to2.default)(User.findOne({
                                session: data.sessionKey
                            }));

                        case 4:
                            _ref9 = _context6.sent;
                            _ref10 = _slicedToArray(_ref9, 2);
                            err = _ref10[0];
                            user = _ref10[1];

                        case 8:

                            console.log('==================== GAME FIND ===========================');
                            // Создаем игрока, если зарегестрирован то вводим ключ сессии, если не зарегестрирован
                            // вводим айди сокета.
                            player = {
                                loggedIn: !data.sessionKey ? false : true,
                                key: !data.sessionKey ? socket.id : data.sessionKey,
                                socketId: socket.id,
                                login: user ? user.login : 'Anonymous',
                                score: user ? user.score : '0'
                            };

                            if (!(data.hash && data.hash.length > 0)) {
                                _context6.next = 33;
                                break;
                            }

                            _hash = data.hash.split('#')[1].split('[')[0];
                            playerToConnect = false;
                            i = 0;

                        case 14:
                            if (!(i < gameWaitingPlayers.length)) {
                                _context6.next = 21;
                                break;
                            }

                            if (!(gameWaitingPlayers[i].room == _hash)) {
                                _context6.next = 18;
                                break;
                            }

                            playerToConnect = gameWaitingPlayers[i];
                            return _context6.abrupt('break', 21);

                        case 18:
                            i++;
                            _context6.next = 14;
                            break;

                        case 21:
                            if (playerToConnect) {
                                _context6.next = 24;
                                break;
                            }

                            socket.emit('game.notfound', { notFound: true, msg: 'Game not found.' });
                            return _context6.abrupt('return');

                        case 24:
                            _roomName = playerToConnect.room;


                            socket.join(_roomName);

                            // Создаем комнату
                            _gameKey = (0, _hashGenerator2.default)(11);

                            gamePlayingRooms[_gameKey] = {
                                firstPlayer: {
                                    loggedIn: player.loggedIn,
                                    socketId: player.socketId,
                                    key: player.key
                                },
                                secondPlayer: {
                                    loggedIn: playerToConnect.loggedIn,
                                    socketId: playerToConnect.socketId,
                                    key: playerToConnect.key
                                },
                                roomName: _roomName,
                                game: new _Game2.default([player.socketId, playerToConnect.socketId])
                            };

                            _hash = _roomName + '[' + playerToConnect.login + ']';
                            io.to(_roomName).emit('game.find.success', {
                                firstPlayer: {
                                    login: player.login,
                                    score: player.score,
                                    figures: gamePlayingRooms[_gameKey].game.getFiguresPosition('one')
                                },
                                secondPlayer: {
                                    login: playerToConnect.login,
                                    score: playerToConnect.score,
                                    figures: gamePlayingRooms[_gameKey].game.getFiguresPosition('two')
                                },
                                gameKey: _gameKey,
                                hash: _hash
                            });

                            socket.emit('game.start.success', {
                                gameKey: _gameKey
                            });

                            // Удаляем второго игрока из списка ожидания
                            gameWaitingPlayers.splice(0, 1);

                            return _context6.abrupt('return');

                        case 33:
                            if (!(gameWaitingPlayers.length == 0)) {
                                _context6.next = 39;
                                break;
                            }

                            player.room = (0, _hashGenerator2.default)(12);
                            socket.join(player.room);
                            gameWaitingPlayers.push(player);

                            _hash2 = player.room + '[' + player.login + ']';
                            return _context6.abrupt('return', socket.emit('game.find.loading', {
                                loading: true,
                                hash: _hash2
                            }));

                        case 39:
                            roomName = gameWaitingPlayers[0].room;


                            socket.join(roomName);

                            // Создаем комнату
                            gameKey = (0, _hashGenerator2.default)(11);

                            gamePlayingRooms[gameKey] = {
                                firstPlayer: {
                                    loggedIn: player.loggedIn,
                                    socketId: player.socketId,
                                    key: player.key
                                },
                                secondPlayer: {
                                    loggedIn: gameWaitingPlayers[0].loggedIn,
                                    socketId: gameWaitingPlayers[0].socketId,
                                    key: gameWaitingPlayers[0].key
                                },
                                roomName: roomName,
                                game: new _Game2.default([player.socketId, gameWaitingPlayers[0].socketId])
                            };

                            hash = roomName + '[' + gameWaitingPlayers[0].login + ']';

                            io.to(roomName).emit('game.find.success', {
                                firstPlayer: {
                                    login: player.login,
                                    score: player.score,
                                    figures: gamePlayingRooms[gameKey].game.getFiguresPosition('one')
                                },
                                secondPlayer: {
                                    login: gameWaitingPlayers[0].login,
                                    score: gameWaitingPlayers[0].score,
                                    figures: gamePlayingRooms[gameKey].game.getFiguresPosition('two')
                                },
                                gameKey: gameKey,
                                hash: hash
                            });

                            socket.emit('game.start.success', {
                                gameKey: gameKey,
                                login: gameWaitingPlayers[0].login
                            });

                            // Удаляем второго игрока из списка ожидания
                            gameWaitingPlayers.splice(0, 1);

                            console.log('[+] creating room : ', gamePlayingRooms[gameKey].roomName);
                            console.log('==========================================================');

                        case 49:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        return function (_x4) {
            return _ref8.apply(this, arguments);
        };
    }());

    socket.on('game.start', function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(data) {
            var gameLoop;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            console.log('================== GAME START ======================');
                            console.log('[+] game key : ', data.gameKey);
                            console.log('[+] socket id : ', socket.id);
                            console.log('[+] playing room : ', gamePlayingRooms[data.gameKey].roomName);

                            if (!gamePlayingRooms[data.gameKey].game.alreadyStart()) {
                                _context7.next = 6;
                                break;
                            }

                            return _context7.abrupt('return');

                        case 6:

                            gamePlayingRooms[data.gameKey].game.start();

                            gameLoop = setInterval(function () {
                                console.log('[+] LOOP ');
                                if (gamePlayingRooms[data.gameKey]) {
                                    gamePlayingRooms[data.gameKey].game.step();

                                    // Кто то достиг потолка и игра закончилась
                                    if (gamePlayingRooms[data.gameKey].game.checkEndGame()) {
                                        clearInterval(gameLoop);
                                        var winner = gamePlayingRooms[data.gameKey].game.getWinner();
                                        io.to(gamePlayingRooms[data.gameKey].roomName).emit('game.end', {
                                            winner: winner,
                                            end: true,
                                            msg: 'End Game'
                                        });
                                        deleteRoom(socket);
                                        return;
                                    }

                                    var res = {
                                        firstPlayer: {
                                            figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition('one')
                                        },
                                        secondPlayer: {
                                            figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition('two')
                                        }
                                    };

                                    io.to(gamePlayingRooms[data.gameKey].roomName).emit('game.update.success', res);
                                } else {
                                    clearInterval(gameLoop);
                                }
                            }, 1000);


                            if (!gamePlayingRooms[data.gameKey]) clearInterval(gameLoop);
                            console.log('====================================================');

                        case 10:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        }));

        return function (_x5) {
            return _ref11.apply(this, arguments);
        };
    }());

    socket.on('game.move', function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(data) {
            var player, res;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            if (!(!gamePlayingRooms[data.gameKey] || gamePlayingRooms[data.gameKey].game.checkEndGame())) {
                                _context8.next = 2;
                                break;
                            }

                            return _context8.abrupt('return');

                        case 2:
                            player = gamePlayingRooms[data.gameKey].firstPlayer.socketId == socket.id ? 'one' : 'two';

                            gamePlayingRooms[data.gameKey].game.move(data.move, player);
                            res = {
                                firstPlayer: {
                                    figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition('one')
                                },
                                secondPlayer: {
                                    figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition('two')
                                }
                            };


                            io.to(gamePlayingRooms[data.gameKey].roomName).emit('game.update.success', res);

                        case 6:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        }));

        return function (_x6) {
            return _ref12.apply(this, arguments);
        };
    }());

    socket.on('login', function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee9(data) {
            var err, user, userSave, _ref14, _ref15, _ref16, _ref17;

            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            err = void 0, user = void 0, userSave = void 0;
                            _context9.next = 3;
                            return (0, _to2.default)(User.findOne({
                                email: data.email,
                                password: data.password
                            }));

                        case 3:
                            _ref14 = _context9.sent;
                            _ref15 = _slicedToArray(_ref14, 2);
                            err = _ref15[0];
                            user = _ref15[1];

                            if (!err) {
                                _context9.next = 9;
                                break;
                            }

                            return _context9.abrupt('return', socket.emit('login.fetched', { err: 'Something goes wrong. Try again or later.' }));

                        case 9:
                            if (user) {
                                _context9.next = 11;
                                break;
                            }

                            return _context9.abrupt('return', socket.emit('login.fetched', { err: 'Wrong email or password.' }));

                        case 11:

                            user.session = (0, _hashGenerator2.default)(10);
                            _context9.next = 14;
                            return (0, _to2.default)(user.save());

                        case 14:
                            _ref16 = _context9.sent;
                            _ref17 = _slicedToArray(_ref16, 2);
                            err = _ref17[0];
                            userSave = _ref17[1];

                            if (!err) {
                                _context9.next = 20;
                                break;
                            }

                            return _context9.abrupt('return', socket.emit('login.fetched', { err: 'Something goes wrong. Try again or later.' }));

                        case 20:
                            if (!userSave) {
                                _context9.next = 22;
                                break;
                            }

                            return _context9.abrupt('return', socket.emit('login.fetched', { success: true, successMsg: 'Logged in.', session: user.session }));

                        case 22:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        }));

        return function (_x7) {
            return _ref13.apply(this, arguments);
        };
    }());

    socket.on('logout', function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee10(data) {
            var err, user, userSave, _ref19, _ref20, _ref21, _ref22;

            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            err = void 0, user = void 0, userSave = void 0;
                            _context10.next = 3;
                            return (0, _to2.default)(User.findOne({
                                session: data.sessionKey
                            }));

                        case 3:
                            _ref19 = _context10.sent;
                            _ref20 = _slicedToArray(_ref19, 2);
                            err = _ref20[0];
                            user = _ref20[1];

                            if (!(err || !user)) {
                                _context10.next = 9;
                                break;
                            }

                            return _context10.abrupt('return', socket.emit('logout.fetched', { err: 'Something goes wrong. Try again or later.' }));

                        case 9:

                            user.session = null;
                            _context10.next = 12;
                            return (0, _to2.default)(user.save());

                        case 12:
                            _ref21 = _context10.sent;
                            _ref22 = _slicedToArray(_ref21, 2);
                            err = _ref22[0];
                            userSave = _ref22[1];

                            if (!(err || !userSave)) {
                                _context10.next = 18;
                                break;
                            }

                            return _context10.abrupt('return', socket.emit('logout.fetched', { err: 'Something goes wrong. Try again or later.' }));

                        case 18:

                            socket.emit('logout.fetched', { success: true });

                        case 19:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        }));

        return function (_x8) {
            return _ref18.apply(this, arguments);
        };
    }());

    socket.on('newpass.email', function () {
        var _ref23 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee11(data) {
            var err, emailCodeSave, emailFind, _ref24, _ref25, hashCode, _ref26, _ref27;

            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            err = void 0, emailCodeSave = void 0, emailFind = void 0;
                            _context11.next = 3;
                            return (0, _to2.default)(User.findOne({
                                email: data
                            }));

                        case 3:
                            _ref24 = _context11.sent;
                            _ref25 = _slicedToArray(_ref24, 2);
                            err = _ref25[0];
                            emailFind = _ref25[1];

                            if (!err) {
                                _context11.next = 9;
                                break;
                            }

                            return _context11.abrupt('return', socket.emit('newpass.email', { err: 'Something goes wrong. Try again or later.' }));

                        case 9:
                            if (emailFind) {
                                _context11.next = 11;
                                break;
                            }

                            return _context11.abrupt('return', socket.emit('newpass.email', { err: 'This email is not registered.' }));

                        case 11:
                            hashCode = (0, _hashGenerator2.default)(4);
                            _context11.next = 14;
                            return (0, _to2.default)(User.findOneAndUpdate({
                                email: emailFind.email
                            }, {
                                hashCode: hashCode
                            }));

                        case 14:
                            _ref26 = _context11.sent;
                            _ref27 = _slicedToArray(_ref26, 2);
                            err = _ref27[0];
                            emailCodeSave = _ref27[1];

                            if (!err) {
                                _context11.next = 20;
                                break;
                            }

                            return _context11.abrupt('return', socket.emit('newpass.email', { err: 'Something goes wrong. Try again or later.' }));

                        case 20:

                            _mailer2.default.send(emailFind.email, {
                                from: 'matcha.unitschool@gmail.com',
                                to: emailFind.email,
                                subject: 'Red Tetris. Hash code to reset password.',
                                html: '<td align="right">' + '<table border="0" cellpadding="0" cellspacing="0" style=\"width: 75%;max-width:600px;display: block;margin: 0 auto;height: 100%;\">' + '<tbody style="width: 100%;display: block;margin: 0 auto; background: #557780;padding: 10px;">' + '<tr>' + '<td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>' + '<td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>' + '<td>' + '<h1 style="margin: 0; color: #fff;">RED TETRIS</h1>' + '</td>' + '</tr>' + '</tbody>' + '<tbody style="display:block;height: 200px; background: #EBE1E2;width:100%;padding:10px;padding-top:100px;">' + '<tr style="width: 100%;display: block;text-align: -webkit-center;">' + ('<td><h2 style="font-weight: 800;margin:0;">Your hash code to reset password : ' + hashCode + '</h2></td>') + '</tr>' + '<tr style="width:100%;display:block;text-align:-webkit-center;text-align:center;">' + '</tr>' + '</tbody>' + '</table>' + '</td>'
                            });

                            socket.emit('newpass.email.success', {
                                successMsg: 'Your hash code sented on Email.',
                                code: hashCode,
                                emailSent: true,
                                email: emailFind.email
                            });

                        case 22:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, this);
        }));

        return function (_x9) {
            return _ref23.apply(this, arguments);
        };
    }());

    socket.on('newpass.reset', function () {
        var _ref28 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee12(data) {
            var err, userFind, userPassSave, _ref29, _ref30, _ref31, _ref32;

            return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            err = void 0, userFind = void 0, userPassSave = void 0;
                            _context12.next = 3;
                            return (0, _to2.default)(User.findOne({
                                hashCode: data.code,
                                email: data.email
                            }));

                        case 3:
                            _ref29 = _context12.sent;
                            _ref30 = _slicedToArray(_ref29, 2);
                            err = _ref30[0];
                            userFind = _ref30[1];

                            if (!err) {
                                _context12.next = 9;
                                break;
                            }

                            return _context12.abrupt('return', socket.emit('newpass.reset.success', { err: 'Something goes wrong. Try again or later.' }));

                        case 9:
                            if (userFind) {
                                _context12.next = 11;
                                break;
                            }

                            return _context12.abrupt('return', socket.emit('newpass.reset.success', { err: 'Wrong hash code.' }));

                        case 11:
                            _context12.next = 13;
                            return (0, _to2.default)(User.findOneAndUpdate({
                                email: userFind.email,
                                hashCode: data.code
                            }, {
                                password: data.password
                            }));

                        case 13:
                            _ref31 = _context12.sent;
                            _ref32 = _slicedToArray(_ref31, 2);
                            err = _ref32[0];
                            userPassSave = _ref32[1];

                            if (!err) {
                                _context12.next = 19;
                                break;
                            }

                            return _context12.abrupt('return', socket.emit('newpass.reset.success', { err: 'Something goes wrong. Try again or later.' }));

                        case 19:

                            socket.emit('newpass.reset.success', { success: true });

                        case 20:
                        case 'end':
                            return _context12.stop();
                    }
                }
            }, _callee12, this);
        }));

        return function (_x10) {
            return _ref28.apply(this, arguments);
        };
    }());

    socket.on('register', function () {
        var _ref33 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee13(data) {
            var err, userFind, userCreate, _ref34, _ref35, _ref36, _ref37;

            return _regenerator2.default.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            err = void 0, userFind = void 0, userCreate = void 0;
                            _context13.next = 3;
                            return (0, _to2.default)(User.findOne({ email: data.email }));

                        case 3:
                            _ref34 = _context13.sent;
                            _ref35 = _slicedToArray(_ref34, 2);
                            err = _ref35[0];
                            userFind = _ref35[1];

                            if (!err) {
                                _context13.next = 9;
                                break;
                            }

                            return _context13.abrupt('return', socket.emit('register.fetched', { err: 'Something goes wrong. Try again or later.' }));

                        case 9:
                            if (!userFind) {
                                _context13.next = 11;
                                break;
                            }

                            return _context13.abrupt('return', socket.emit('register.fetched', { err: 'User with this email already registered.' }));

                        case 11:
                            _context13.next = 13;
                            return (0, _to2.default)(User.create({
                                email: data.email,
                                login: data.login,
                                password: data.password,
                                score: 0 // Math.floor(Math.random() * 1000)
                            }));

                        case 13:
                            _ref36 = _context13.sent;
                            _ref37 = _slicedToArray(_ref36, 2);
                            err = _ref37[0];
                            userCreate = _ref37[1];

                            if (!err) {
                                _context13.next = 19;
                                break;
                            }

                            return _context13.abrupt('return', socket.emit('register.fetched', { err: 'Something goes wrong. Try again or later.' }));

                        case 19:
                            if (!userCreate) {
                                _context13.next = 21;
                                break;
                            }

                            return _context13.abrupt('return', socket.emit('register.fetched', { success: true, successMsg: 'User registered.' }));

                        case 21:
                        case 'end':
                            return _context13.stop();
                    }
                }
            }, _callee13, this);
        }));

        return function (_x11) {
            return _ref33.apply(this, arguments);
        };
    }());

    socket.on('rates', function () {
        var _ref38 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee14(data) {
            var err, user, players, _ref39, _ref40, _ref41, _ref42, res, i, topTenLast;

            return _regenerator2.default.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            err = void 0, user = void 0, players = void 0;

                            if (!(data && data.session != null)) {
                                _context14.next = 9;
                                break;
                            }

                            ;

                            _context14.next = 5;
                            return (0, _to2.default)(User.findOne({ session: data.session }));

                        case 5:
                            _ref39 = _context14.sent;
                            _ref40 = _slicedToArray(_ref39, 2);
                            err = _ref40[0];
                            user = _ref40[1];

                        case 9:
                            if (!err) {
                                _context14.next = 11;
                                break;
                            }

                            return _context14.abrupt('return', socket.emit('rates.fetched', { err: 'Something goes wrong. Try again or later.' }));

                        case 11:
                            _context14.next = 13;
                            return (0, _to2.default)(User.find().sort({ score: -1 }).limit(10));

                        case 13:
                            _ref41 = _context14.sent;
                            _ref42 = _slicedToArray(_ref41, 2);
                            err = _ref42[0];
                            players = _ref42[1];

                            if (!err) {
                                _context14.next = 19;
                                break;
                            }

                            return _context14.abrupt('return', socket.emit('rates.fetched', { err: 'Something goes wrong. Try again or later.' }));

                        case 19:
                            res = [];

                            for (i = 0; i < players.length; i++) {
                                res.push({
                                    num: i + 1,
                                    login: players[i].login,
                                    score: players[i].score
                                });
                            }if (players.length < 10) socket.emit('rates.fetched', res);

                            topTenLast = res[res.length - 1];

                            if (!user) {
                                _context14.next = 29;
                                break;
                            }

                            if (!(user.score > topTenLast.score)) {
                                _context14.next = 26;
                                break;
                            }

                            return _context14.abrupt('return', socket.emit('rates.fetched', res));

                        case 26:
                            if (!(user.score == topTenLast.score && user.login == topTenLast.login)) {
                                _context14.next = 28;
                                break;
                            }

                            return _context14.abrupt('return', socket.emit('rates.fetched', res));

                        case 28:

                            res.push({
                                num: topTenLast.num + 1,
                                login: user.login,
                                score: user.score
                            });

                        case 29:
                            return _context14.abrupt('return', socket.emit('rates.fetched', res));

                        case 30:
                        case 'end':
                            return _context14.stop();
                    }
                }
            }, _callee14, this);
        }));

        return function (_x12) {
            return _ref38.apply(this, arguments);
        };
    }());
});

function deleteRoom(socket) {
    for (var room in gamePlayingRooms) {
        if (gamePlayingRooms[room].firstPlayer.socketId == socket.id || gamePlayingRooms[room].secondPlayer.socketId == socket.id) {
            if (!gamePlayingRooms[room].game.checkEndGame()) {
                io.to(gamePlayingRooms[room].roomName).emit('game.disconnect', {
                    disconnected: true
                });
            }
            socket.leave(gamePlayingRooms[room].roomName);
            delete gamePlayingRooms[room];
        }
    }
}