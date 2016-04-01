var io = require('socket.io')();

io.on('connection', function(socket){
  console.log('New connection detected.');
});

module.exports = io;
