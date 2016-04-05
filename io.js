var io = require('socket.io')();
var users = {};

io.on('connection', function(socket){
  console.log('New connection detected.');
  socket.on('join', function(name){
      socket.name = name;
      console.log(name + ' join');
      users[socket.name] = socket;
      io.sockets.emit('usernames', Object.keys(users));
  });
  socket.on('disconnect', function(){
  	console.log(socket.name + ' disconnected');
    delete users[socket.nickname];
  	io.sockets.emit('usernames', Object.keys(users));
  });
});

module.exports = io;
