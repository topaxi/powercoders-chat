var fs = require('fs');
var http = require('http');
var WebSocket = require('ws');

var host = 'localhost';
var port = 8080;
var socketPath = '/socket';

var httpServer = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(fs.readFileSync('./index.html'));
});

var wss = new WebSocket.Server({
  server: httpServer,
  path: socketPath
});

wss.on('connection', function(socket) {
  console.log('got socket connection');

  socket.on('message', function(message) {
    console.log('got message from client');
  });

  socket.send('Hello from server');
});

httpServer.listen(port, function() {
  console.log('Server is listening on http://' + host + ':' + port + '/');
  console.log('WebSocket on http://' + host + ':' + port + socketPath);
});
