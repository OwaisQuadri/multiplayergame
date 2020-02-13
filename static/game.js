var socket = io();
socket.on('message', function (data) {
  console.log(data);
});
socket.on('name', function (data) {
  // data is a parameter containing whatever data was sent
});
var action = {
  rock1: false,
  rock2: false,
  paper1: false,
  paper2: false,
  scissors1: false,
  scissors2: false
}
document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 65: // A
      action.paper1 = false;
      action.rock1 = false;
      action.scissors1 = false;
      action.rock1 = true;
      break;
    case 68: // D
      action.paper1 = false;
      action.rock1 = false;
      action.scissors1 = false;
      action.scissors1 = true;
      break;
    case 83: // S
      action.paper1 = false;
      action.rock1 = false;
      action.scissors1 = false;
      action.paper1 = true;
      break;
    case 37: // <-
      action.paper2 = false;
      action.rock2 = false;
      action.scissors2 = false;
      action.rock2 = true;
      break;
    case 40: // \/
      action.paper2 = true;
      action.rock2 = false;
      action.scissors2 = false;
      break;
    case 39: // ->
      action.paper2 = false;
      action.rock2 = false;
      action.scissors2 = true;
      break;
    case 87:// W
      action.paper1 = false;
      action.rock1 = false;
      action.scissors1 = false;
      break;
    case 38:// UpArrow
      action.paper2 = false;
      action.rock2 = false;
      action.scissors2 = false;
      break;
  }
});
// document.addEventListener('keyup', function (event) {
//   switch (event.keyCode) {
//     case 65: // A
//       action.rock1 = false;
//       break;
//     case 68: // D
//       action.scissors1 = false;
//       break;
//     case 83: // S
//       action.paper1 = false;
//       break;
//     case 37: // <-
//       action.rock2 = false;
//       break;
//     case 40: // \/
//       action.scissors2 = false;
//       break;
//     case 39: // ->
//       action.paper2 = false;
//       break;
//   }
// });
socket.emit('new player');
setInterval(function () {
  socket.emit('action', action);
}, 1000 / 60);
var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function (players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'blue';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});