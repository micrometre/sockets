const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const logger = require('morgan')

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors())
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/video', (req, res) => {
  res.sendFile('alprVideo.mp4', { root: 'public'});
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});







server.listen(5000, () => {
  console.log('listening on *:5000');
});