const express = require('express');
const http = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();
const server = http.createServer(app);
const ioServer = new SocketServer(server);

app.use(express.static('frontend'));

ioServer.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat_msg', (msg) => {
    console.log(`Broadcasting message: ${msg}`);
    ioServer.emit('chat_msg', msg); // send to everyone
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
