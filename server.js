// Dependencies

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
        var hand1, hand2;
        if (data.rock1) {
          hand1 = 0;//rock
        }
        if (data.paper1) {
          hand1 = 1;//paper
        }
        if (data.scissors1) {
          hand1 = 2;//scissors
        }
        if (data.rock2) {
          hand2 = 0;//rock
        }
        if (data.paper2) {
          hand2 = 1;//paper
        }
        if (data.scissors2) {
          hand2 = 2;//scissors
        }
        if (!data.rock1 && !data.scissors1 && !data.paper1) hand1 = null;
        if (!data.rock2 && !data.scissors2 && !data.paper2) hand2 = null;
        var winner = "neither";
        if ((hand1 != null) && (hand2 != null)) {
          if((hand1==0)&&(hand2==0))winner="neither";
          if((hand1==0)&&(hand2==1))winner="player2";
          if((hand1==0)&&(hand2==2))winner="player1";
          if((hand1==1)&&(hand2==0))winner="player1";
          if((hand1==1)&&(hand2==1))winner="neither";
          if((hand1==1)&&(hand2==2))winner="player2";
          if((hand1==2)&&(hand2==0))winner="player2";
          if((hand1==2)&&(hand2==1))winner="player1";
          if((hand1==2)&&(hand2==2))winner="neither";
          
        }
        // console.log(winner);
        console.log(hand1, hand2, winner);

      });
    }); setInterval(() => {
      io.sockets.emit('state', players);
    }, 1000 / 60);
  }

}
new Server();