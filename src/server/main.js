const express       = require('express');
const bodyParser    = require('body-parser');
const http          = require('http');
const socketServer  = require('socket.io');
const mongoose      = require('mongoose');

import to               from './utils/to'
import mailer           from './utils/mailer';
import hashGenerator    from './utils/hashGenerator';

const User          = require('./models/User');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/rtg', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', ()=> {console.error('[!] Connection to database failed.')});
db.once('open', () => {console.log('[+] Connection to database successful.')});

const server        = http.createServer(app);
const io            = socketServer(server);
const connections   = [];

server.listen(3000,()=> {console.log("[+] Server is running on port: 3000")});

io.on('connection', (socket) => {
    console.log("[+] Connected to Socket : ", socket.id);
    connections.push(socket);

    socket.on('disconnect', () => {
        console.log('[+] Disconnected : ', socket.id);
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
