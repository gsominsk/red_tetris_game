const express       = require('express');
const bodyParser    = require('body-parser');
const http          = require('http');
const socketServer  = require('socket.io');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

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
    })
});
