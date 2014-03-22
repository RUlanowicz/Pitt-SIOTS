// this is a server part of socket.io 

var io = require('socket.io').listen(3001);
 
io.sockets.on('connection', function (socket) {
 
socket.on('message', function (message) {
console.log("Got message: " + message);
io.sockets.emit('pageview', { 'url': message });
});
 
});