const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('grid click', gridState => {
    console.log("new grid received");
    socket.broadcast.emit('new grid', gridState);
    console.log("emitted to everyone but sender");
  })
})

server.listen(3000);
