import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
import io from 'socket.io-client'
import params from '../params'

chai.should()

describe('Server tests', function () {
    let tetrisServer;
    let socket;
    before(cb => startServer(params.server, function (err, server) {
        tetrisServer = server;
        cb()
    }));

    after(function (done) {
        tetrisServer.stop(done)
    })

    it('should connect socket', (done) => {
        socket = io.connect("http://localhost:3000");
        socket.on('connect', () => {
            done();
        })
    });

    it('fake login with no data', (done) => {
        socket.emit('login');

        socket.on('login.fetched', (res) => {
            if (res.err && res.err == 'Not valid data.')
                done();
        });
    });

    it('fake login with wrong data', (done) => {
        socket.emit('login', {email: '1', password: '1'});

        socket.on('login.fetched', (res) => {
            if (res.err && res.err == 'Wrong email or password.')
                done();
        });
    });

    it('should log in', (done) => {
        socket.emit('login', {email: 'test@i.ua', password: 'test@i.ua'});

        socket.on('login.fetched', (res) => {
            if (res.success && res.successMsg == 'Logged in.')
                done();
        });
    });

    it('fake logout with no data', (done) => {
        socket.emit('logout');

        socket.on('logout.fetched', (res) => {
            if (res.err && res.err == 'Not valid data.')
                done();
        });
    });

    it('fake logout with not valid data', (done) => {
        socket.emit('logout', {sessionKey: '1'});

        socket.on('logout.fetched', (res) => {
            if (res.err && res.err == 'Something goes wrong. Try again or later.')
                done();
        });
    });

    it('fake register with no data', (done) => {
        socket.emit('register');

        socket.on('register.fetched', (res) => {
            if (res.err && res.err == 'Something goes wrong. Try again or later.')
                done();
        });
    });

    it('fake already registered user', (done) => {
        socket.emit('register', {email: 'test@i.ua', login: 'test@i.ua', password: 'test@i.ua'});

        socket.on('register.fetched', (res) => {
            if (res.err && res.err == 'User with this email already registered.')
                done();
        });
    });

    // it('should register new user', (done) => {
    //     socket.emit('register', {email: 'test1@i.ua', login: 'test1@i.ua', password: 'test1@i.ua'});
    //
    //     socket.on('register.fetched', (res) => {
    //         if (res.success && res.successMsg == 'User registered.')
    //             done();
    //     });
    // });

    let gameKey;
    it('should create single game', (done) => {
        socket.emit('single.game.create', {});

        socket.on('single.game.created', (res) => {
            // console.log('res : ', res);
            if (res.gameKey) {
                gameKey = res.gameKey;
                done();
            }
        });
    });

    it('should start single game', (done) => {
        socket.emit('single.game.start', {gameKey});
        done();
    });

    it('should move figure to right in game', (done) => {
        let move = 'ArrowRight';
        socket.emit('single.game.move', {move: move, gameKey});

        socket.on('single.game.update.success', (res) => {
            if (res.firstPlayer && res.move == move)
                done();
        });
    });

    it('should move figure to left in game', (done) => {
        let move = 'ArrowLeft';
        socket.emit('single.game.move', {move: move, gameKey});

        socket.on('single.game.update.success', (res) => {
            if (res.firstPlayer && res.move == move)
                done();
        });
    });

    it('should move figure down in game', (done) => {
        let move = 'ArrowDown';
        socket.emit('single.game.move', {move: move, gameKey});

        socket.on('single.game.update.success', (res) => {
            if (res.firstPlayer && res.move == move)
                done();
        });
    });

    it('should rotate figure in game', (done) => {
        let move = 'ArrowUp';
        socket.emit('single.game.move', {move: move, gameKey});

        socket.on('single.game.update.success', (res) => {
            if (res.firstPlayer && res.move == move)
                done();
        });
    });

    it('should fall figure to heap', (done) => {
        let move = ' '
        socket.emit('single.game.move', {move: move, gameKey});

        socket.on('single.game.update.success', (res) => {
            if (res.firstPlayer && res.move == move)
                done();
        });
    });

    it('should disconnect from single game', (done) => {
        socket.emit('single.game.disconnect.push');
        done();
    });

    it('should return list of rates', (done) => {
        socket.emit('rates');

        socket.on('rates.fetched', (res) => {
            if (res)
                done();
        });
    });

    it('should send email', (done) => {
        socket.emit('newpass.email', 'test@i.ua');

        socket.on('newpass.email.success', (res) => {
            if (res && res.successMsg == 'Your hash code sented on Email.')
                done();
        });
    });

});