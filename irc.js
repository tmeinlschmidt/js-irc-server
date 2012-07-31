var net = require('net'),
    IrcServer = require('irc-server'),
    server = new IrcServer;

s = net.Server(function(socket) {

  server.newClient(socket, false);
  socket.setTimeout(0);

  // new client
  socket.on('connect', function() {
    server.newClient(socket, true);
  });
  
  // client has quit
  socket.on('end', function() {
    console.log('Client has quit.')
  });

  // data sent
  socket.on('data', function(d) {
    server.parseData(d.toString(), socket)
  });
  
  // error
  socket.on('error', function() {
    console.log('error');
  });
});

s.listen(6667);
