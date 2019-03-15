const express       = require('express');
const bodyParser    = require('body-parser');
const http          = require('http');
const socketServer  = require('socket.io');
const mongoose      = require('mongoose');

import to           from './utils/to'

const User          = require('./models/User');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', ()=> {console.error('[!] Connection to database failed.')});
db.once('open', () => {console.log('[+] Connection to database successful.')});

const server        = http.createServer(app);
const io            = socketServer(server);
const connections   = [];

server.listen(3000,()=> {console.log("[+] Server is running on port: 3000")});

io.on('connection', (socket) => {
    console.log("[+] Connected to Socket : ", socket.id)
    connections.push(socket);

    socket.on('disconnect', () => {
        console.log('[+] Disconnected : ', socket.id);
    });

    socket.on('check',(data) => {
        console.log('[+] SERVER | check data : ', data);
        socket.emit('checkSuccess', data);
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
        }));

        if (err)
            return socket.emit('register.fetched', {err: 'Something goes wrong. Try again or later.'});

        if (userCreate)
            return socket.emit('register.fetched', {success: true, successMsg: 'User registered.'})
    })
});
