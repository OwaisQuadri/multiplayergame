// Dependencies
var global={
  hand1: null,
  hand2:null,
  winner:"neither player 1 or 2"
}
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io'); var app = express();
var server = http.Server(app);
var io = socketIO(server); app.set('port', 5000);
class Server {
  constructor() {
    this.startServer();
  }
  startServer() {
    app.use('/static', express.static(__dirname + '/static'));// Routing
    app.get('/', (request, response) => {
      response.sendFile(path.join(__dirname, 'index.html'));
    });// Starts the server.
    server.listen(5000, () => {
      console.log('Starting server on port 5000');
    });
    // Add the WebSocket handlers
    io.on('connection', (socket) => {
    });
    var players = {};
    io.on('connection', (socket) => {
      socket.on('new player', () => {
        players[socket.id] = {
          x: 300,
          y: 300
        };
      });
      socket.on('action', (data) => {
        var player = players[socket.id] || {};
        if (data.rock1) {
          global.hand1 = "rock";//rock
        }
        if (data.paper1) {
          global.hand1 = "paper";//paper
        }
        if (data.scissors1) {
          global.hand1 = "scissors";//scissors
        }
        if (data.rock2) {
          global.hand2 = "rock";//rock
        }
        if (data.paper2) {
          global.hand2 = "paper";//paper
        }
        if (data.scissors2) {
          global.hand2 = "scissors";//scissors
        }
        if (!data.rock1 && !data.scissors1 && !data.paper1) global.hand1 = null;
        if (!data.rock2 && !data.scissors2 && !data.paper2) global.hand2 = null;
        if ((global.hand1 != null) && (global.hand2 != null)) {
          if((global.hand1=="rock")&&(global.hand2=="rock"))global.winner="neither player 1 or 2";
          if((global.hand1=="rock")&&(global.hand2=="paper"))global.winner="player 2";
          if((global.hand1=="rock")&&(global.hand2=="scissors"))global.winner="player 1";
          if((global.hand1=="paper")&&(global.hand2=="rock"))global.winner="player 1";
          if((global.hand1=="paper")&&(global.hand2=="paper"))global.winner="neither player 1 or 2";
          if((global.hand1=="paper")&&(global.hand2=="scissors"))global.winner="player 2";
          if((global.hand1=="scissors")&&(global.hand2=="rock"))global.winner="player 2";
          if((global.hand1=="scissors")&&(global.hand2=="paper"))global.winner="player 1";
          if((global.hand1=="scissors")&&(global.hand2=="scissors"))global.winner="neither player 1 or 2";
          
        }else {
          global.winner="neither player 1 or 2";
        }
        console.log("player 1: ",global.hand1, ",player 2: ",global.hand2,",WINNER: ", global.winner);

      });
    }); setInterval(() => {
      io.sockets.emit('state', players);
    }, 1000 / 60);
  }

}
new Server();