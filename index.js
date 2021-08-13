const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server)

let gridState = [];

app.use('/life', express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('a user connected');
  socket.emit("initial grid", gridState);
  console.log('inital grid dispatched...');


  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('grid click', newGridState => {
    console.log("new grid received");
    socket.broadcast.emit('new grid', newGridState);
    console.log("emitted to everyone but sender");
  })

  socket.on('start-stop', (msg) => {
    socket.broadcast.emit('start-stop', msg);
  })
})

server.listen(3002);
