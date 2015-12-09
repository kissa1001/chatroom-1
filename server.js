var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var clients = 0;

var user = function(name) {
    this.name = name;
};

io.on('connection', function(socket) {
    console.log('Client connected');
    clients++;
    io.emit('users_count', clients);

    var newUser = new user('Unknown');

    socket.on('name', function(screenName) {
        previousName = newUser.name;
        newUser.name = screenName;
        console.log('Screen name updated:', newUser.name);
        socket.emit('name', newUser.name);
        var welcome = 'User name changed from '
            + previousName
            + ' to '
            + newUser.name;
        io.emit('userChange', welcome);
    });

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', function(){
        clients--;
        console.log('Disconnected!');
        io.emit('users_count', clients);
    });
});

server.listen(8080);
