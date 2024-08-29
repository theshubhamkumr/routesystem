const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('send-location', (coords) => {
        io.emit('receive-location', { id: socket.id, ...coords });
    });

    socket.on('disconnect', () => {
        io.emit('user-disconnect', socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});


module.exports = app;
