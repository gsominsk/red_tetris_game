const express       = require('express');
const bodyParser    = require('body-parser');
const http          = require('http');
const socketServer  = require('socket.io');
const mongoose      = require('mongoose');

import to               from './utils/to'
import mailer           from './utils/mailer';
import hashGenerator    from './utils/hashGenerator';
import Game             from './utils/Game';

const User          = require('./models/User');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/rtg', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', ()=> {console.error('[!] Connection to database failed.')});
db.once('open', () => {console.log('[+] Connection to database successful.')});

const server            = http.createServer(app);
const io                = socketServer(server);

let connections       = [];

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

let gameWaitingPlayers= [];

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

let gamePlayingRooms = {};

server.listen(3000,()=> {console.log("[+] Server is running on port: 3000")});

io.on('connection', (socket) => {
    console.log("[+] Connected to Socket : ", socket.id);
    connections.push(socket);

    socket.on('disconnect', () => {
        console.log('=============== DISCONNECTING USER FROM WAITING ROOM =================');
        for(let i = 0; i < gameWaitingPlayers.length; i++){
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

    socket.on('single.game.create', async function (data) {
        let err, user;
        if (data.sessionKey) {
            [err, user] = await to(User.findOne({
                session: data.sessionKey
            }));
        }

        // Создаем игрока, если зарегестрирован то вводим ключ сессии, если не зарегестрирован
        // вводим айди сокета.
        let player = {
            loggedIn: (!data.sessionKey ? false : true),
            key: (!data.sessionKey ? socket.id : data.sessionKey),
            socketId: socket.id,
            login: user ? user.login : 'Anonymous',
            score: user ? user.score: '0',
        };

        let gameKey = hashGenerator(11);
        gamePlayingRooms[gameKey] = {
            firstPlayer: {
                loggedIn: player.loggedIn,
                socketId: player.socketId,
                key: player.key
            },
            roomName: hashGenerator(12),
            game: new Game([player.socketId])
        };

        socket.emit('single.game.created', {
            firstPlayer: {
                login: player.login,
                score: player.score,
                figures : gamePlayingRooms[gameKey].game.getFiguresPosition('one')
            },
            gameKey: gameKey
        });

        socket.emit('single.game.start.success', {gameKey});
    });

    socket.on('single.game.start', async function (data) {
        console.log('[+] SINGLE GAME START')
        // console.log('[+] already start : ')

        if (gamePlayingRooms[data.gameKey].game.alreadyStart())
            return ;

        gamePlayingRooms[data.gameKey].game.start();

        let gameLoop = setInterval(() => {
            console.log('[+] SINGLE GAME LOOP')
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
                    return ;
                }

                let res = {
                    firstPlayer: {
                        figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition('one')
                    }
                };

                socket.emit('single.game.update.success', res);
            } else {
                clearInterval(gameLoop);
            }
        }, 1000);
    })

    socket.on('single.game.move', async function (data) {
        if (!gamePlayingRooms[data.gameKey] || gamePlayingRooms[data.gameKey].game.checkEndGame())
            return ;

        let player = 'one';
        gamePlayingRooms[data.gameKey].game.move(data.move, player);
        let res = {
            firstPlayer: {
                figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition(player)
            }
        };

        socket.emit('single.game.update.success', res);
    });

    socket.on('single.game.disconnect.push', async function () {
        console.log('=============== SINGLE DISCONNECTING USER FROM GAMING ROOM =================');
        for (let room in gamePlayingRooms) {
            if (gamePlayingRooms[room].firstPlayer.socketId == socket.id) {
                delete gamePlayingRooms[room];
            }
        }
        console.log('=============================================================================');
    });

    socket.on('game.disconnect.push', async function () {
        console.log('=============== DISCONNECTING USER FROM WAITING ROOM =================');
        for(let i = 0; i < gameWaitingPlayers.length; i++){
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
    });

    socket.on('game.find', async function (data) {
        let err, user;
        if (data.sessionKey) {
            [err, user] = await to(User.findOne({
                session: data.sessionKey
            }));
        }

        console.log('==================== GAME FIND ===========================');
        // Создаем игрока, если зарегестрирован то вводим ключ сессии, если не зарегестрирован
        // вводим айди сокета.
        let player = {
            loggedIn: (!data.sessionKey ? false : true),
            key: (!data.sessionKey ? socket.id : data.sessionKey),
            socketId: socket.id,
            login: user ? user.login : 'Anonymous',
            score: user ? user.score: '0',
        };

        if (data.hash && data.hash.length > 0) {
            let hash = data.hash.split('#')[1].split('[')[0];
            let playerToConnect = false;

            for (let i = 0; i < gameWaitingPlayers.length; i++) {
                if (gameWaitingPlayers[i].room == hash) {
                    playerToConnect = gameWaitingPlayers[i];
                    break;
                }
            }

            if (!playerToConnect) {
                socket.emit('game.notfound', {notFound: true, msg: 'Game not found.'})
                return ;
            }

            let roomName = playerToConnect.room;

            socket.join(roomName);

            // Создаем комнату
            let gameKey = hashGenerator(11);
            gamePlayingRooms[gameKey] = {
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
                roomName: roomName,
                game: new Game([player.socketId, playerToConnect.socketId])
            };

            hash = `${roomName}[${playerToConnect.login}]`;
            io.to(roomName).emit('game.find.success', {
                firstPlayer: {
                    login: player.login,
                    score: player.score,
                    figures : gamePlayingRooms[gameKey].game.getFiguresPosition('one')
                },
                secondPlayer: {
                    login: playerToConnect.login,
                    score: playerToConnect.score,
                    figures : gamePlayingRooms[gameKey].game.getFiguresPosition('two')
                },
                gameKey: gameKey,
                hash
            });

            socket.emit('game.start.success', {
                gameKey
            });

            // Удаляем второго игрока из списка ожидания
            gameWaitingPlayers.splice(0, 1);

            return ;
        }

        // Первая проверка, если других игроков ожидающих игру нету, записываем игрока в комнату
        // ожидания, после чего отправляем обратно что пользователь ожидает игру.
        if (gameWaitingPlayers.length == 0) {
            player.room = hashGenerator(12);
            socket.join(player.room);
            gameWaitingPlayers.push(player);

            let hash = `${player.room}[${player.login}]`;
            return socket.emit('game.find.loading', {
                loading: true,
                hash
            })
        }

        let roomName = gameWaitingPlayers[0].room;

        socket.join(roomName);

        // Создаем комнату
        let gameKey = hashGenerator(11);
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
            game: new Game([player.socketId, gameWaitingPlayers[0].socketId])
        };

        let hash = `${roomName}[${gameWaitingPlayers[0].login}]`;
        io.to(roomName).emit('game.find.success', {
            firstPlayer: {
                login: player.login,
                score: player.score,
                figures : gamePlayingRooms[gameKey].game.getFiguresPosition('one')
            },
            secondPlayer: {
                login: gameWaitingPlayers[0].login,
                score: gameWaitingPlayers[0].score,
                figures : gamePlayingRooms[gameKey].game.getFiguresPosition('two')
            },
            gameKey: gameKey,
            hash
        });

        socket.emit('game.start.success', {
            gameKey,
            login: gameWaitingPlayers[0].login
        });

        // Удаляем второго игрока из списка ожидания
        gameWaitingPlayers.splice(0, 1);

        console.log('[+] creating room : ', gamePlayingRooms[gameKey].roomName);
        console.log('==========================================================');
    });

    socket.on('game.start', async function (data) {
        console.log('================== GAME START ======================');
        console.log('[+] game key : ', data.gameKey);
        console.log('[+] socket id : ', socket.id);
        console.log('[+] playing room : ', gamePlayingRooms[data.gameKey].roomName);

        if (gamePlayingRooms[data.gameKey].game.alreadyStart())
            return ;

        gamePlayingRooms[data.gameKey].game.start();

        let gameLoop = setInterval(() => {
            console.log('[+] LOOP ')
            if (gamePlayingRooms[data.gameKey]) {
                gamePlayingRooms[data.gameKey].game.step();

                // Кто то достиг потолка и игра закончилась
                if (gamePlayingRooms[data.gameKey].game.checkEndGame()) {
                    clearInterval(gameLoop);
                    io.to(gamePlayingRooms[data.gameKey].roomName).emit('game.end', {
                        winner: gamePlayingRooms[data.gameKey].game.getWinner(),
                        end: true,
                        msg: 'End Game'
                    });
                    deleteRoom(socket);
                    return ;
                }

                let res = {
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

        if (!gamePlayingRooms[data.gameKey])
            clearInterval(gameLoop);
        console.log('====================================================');
    });

    socket.on('game.move', async function (data) {
        if (!gamePlayingRooms[data.gameKey] || gamePlayingRooms[data.gameKey].game.checkEndGame())
            return ;

        let player = gamePlayingRooms[data.gameKey].firstPlayer.socketId == socket.id ? 'one' : 'two';
        gamePlayingRooms[data.gameKey].game.move(data.move, player);
        let res = {
            firstPlayer: {
                figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition('one')
            },
            secondPlayer: {
                figures: gamePlayingRooms[data.gameKey].game.getFiguresPosition('two')
            }
        };

        io.to(gamePlayingRooms[data.gameKey].roomName).emit('game.update.success', res);
    });

    socket.on('login', async function (data) {
        let err, user, userSave;

        [err, user] = await to(User.findOne({
            email: data.email,
            password: data.password
        }));

        if (err)
            return socket.emit('login.fetched', {err: 'Something goes wrong. Try again or later.'});

        if (!user)
            return socket.emit('login.fetched', {err: 'Wrong email or password.'});

        user.session = hashGenerator(10);
        [err, userSave] = await to(user.save());

        if (err)
            return socket.emit('login.fetched', {err: 'Something goes wrong. Try again or later.'});

        if (userSave)
            return socket.emit('login.fetched', {success: true, successMsg: 'Logged in.', session: user.session});
    });

    socket.on('logout', async function (data) {
        let err, user, userSave;

        [err, user] = await to(User.findOne({
            session: data.sessionKey,
        }));

        if (err || !user)
            return socket.emit('logout.fetched', {err: 'Something goes wrong. Try again or later.'});

        user.session = null;
        [err, userSave] = await to(user.save());

        if (err || !userSave)
            return socket.emit('logout.fetched', {err: 'Something goes wrong. Try again or later.'});

        socket.emit('logout.fetched', {success: true});
    });

    socket.on('newpass.email', async function (data) {
        let err, emailCodeSave, emailFind;

        [err, emailFind] = await to(User.findOne({
            email: data
        }));

        if (err)
            return socket.emit('newpass.email', {err: 'Something goes wrong. Try again or later.'});

        if (!emailFind)
            return socket.emit('newpass.email', {err: 'This email is not registered.'});

        let hashCode = hashGenerator(4);
        [err, emailCodeSave] = await to(User.findOneAndUpdate({
            email: emailFind.email
        }, {
            hashCode: hashCode
        }));

        if (err)
            return socket.emit('newpass.email', {err: 'Something goes wrong. Try again or later.'});

        mailer.send(emailFind.email, {
            from    : 'matcha.unitschool@gmail.com',
            to      : emailFind.email,
            subject : 'Red Tetris. Hash code to reset password.',
            html    : (
                '<td align="right">'+
                '<table border="0" cellpadding="0" cellspacing="0" style=\"width: 75%;max-width:600px;display: block;margin: 0 auto;height: 100%;\">'+
                '<tbody style="width: 100%;display: block;margin: 0 auto; background: #557780;padding: 10px;">'+
                '<tr>'+
                '<td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>'+
                '<td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>'+
                '<td>'+
                '<h1 style="margin: 0; color: #fff;">RED TETRIS</h1>'+
                '</td>'+
                '</tr>'+
                '</tbody>'+
                '<tbody style="display:block;height: 200px; background: #EBE1E2;width:100%;padding:10px;padding-top:100px;">'+
                '<tr style="width: 100%;display: block;text-align: -webkit-center;">'+
                `<td><h2 style="font-weight: 800;margin:0;">Your hash code to reset password : ${hashCode}</h2></td>`+
                '</tr>'+
                '<tr style="width:100%;display:block;text-align:-webkit-center;text-align:center;">'+
                '</tr>'+
                '</tbody>'+
                '</table>'+
                '</td>'
            )
        });

        socket.emit('newpass.email.success', {
            successMsg: 'Your hash code sented on Email.',
            code: hashCode,
            emailSent: true,
            email: emailFind.email
        })
    });

    socket.on('newpass.reset', async function (data) {
        let err, userFind, userPassSave;

        [err, userFind] = await to(User.findOne({
            hashCode: data.code,
            email: data.email
        }));

        if (err)
            return socket.emit('newpass.reset.success', {err: 'Something goes wrong. Try again or later.'});

        if (!userFind)
            return socket.emit('newpass.reset.success', {err: 'Wrong hash code.'});

        [err, userPassSave] = await to(User.findOneAndUpdate({
            email: userFind.email,
            hashCode: data.code
        }, {
            password: data.password
        }));

        if (err)
            return socket.emit('newpass.reset.success', {err: 'Something goes wrong. Try again or later.'});

        socket.emit('newpass.reset.success', {success: true});
    });

    socket.on('register', async function (data) {
        let err, userFind, userCreate;
        [err, userFind] = await to(User.findOne({email: data.email}));

        if (err)
            return socket.emit('register.fetched', {err: 'Something goes wrong. Try again or later.'});

        if (userFind)
            return socket.emit('register.fetched', {err: 'User with this email already registered.'});

        [err, userCreate] = await to(User.create({
            email: data.email,
            login: data.login,
            password: data.password,
            score: 0 // Math.floor(Math.random() * 1000)
        }));

        if (err)
            return socket.emit('register.fetched', {err: 'Something goes wrong. Try again or later.'});

        if (userCreate)
            return socket.emit('register.fetched', {success: true, successMsg: 'User registered.'})
    });

    socket.on('rates', async function (data) {
        let err, user, players;

        if (data && data.session != null)
            [err, user] = await to(User.findOne({session: data.session}));

        if (err)
            return socket.emit('rates.fetched', {err: 'Something goes wrong. Try again or later.'});

        [err, players] = await to(User.find().sort({score: -1}).limit(10));

        if (err)
            return socket.emit('rates.fetched', {err: 'Something goes wrong. Try again or later.'});

        let res = [];
        for (let i = 0; i < players.length; i++)
            res.push({
                num: i + 1,
                login: players[i].login,
                score: players[i].score
            });

        if (players.length < 10)
            socket.emit('rates.fetched', res);

        let topTenLast = res[res.length - 1];

        if (user) {
            if (user.score > topTenLast.score)
                return socket.emit('rates.fetched', res);

            if (user.score == topTenLast.score && user.login == topTenLast.login)
                return socket.emit('rates.fetched', res);

            res.push({
                num: topTenLast.num + 1,
                login: user.login,
                score: user.score
            });
        }

        return socket.emit('rates.fetched', res);

    })
});

function deleteRoom (socket) {
    for (let room in gamePlayingRooms) {
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