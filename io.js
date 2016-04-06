var io = require('socket.io')();
var user = {};

io.on('connection', function(socket){
  console.log('New connection detected.');
  socket.on('join', function(name){
      socket.name = name;
      console.log(name + ' join');
      user[socket.name] = socket;
      io.sockets.emit('usernames', Object.keys(user));
  });
  socket.on('disconnect', function(){
    console.log(socket.name + ' disconnected');
    delete user[socket.name];
    io.sockets.emit('usernames', Object.keys(user));
  });
});

module.exports = io;

