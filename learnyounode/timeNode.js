var net      = require('net'),
    strftime = require('strftime');

var server = net.createServer(function(socket) {
	var data = strftime('%F %H:%M', new Date());
	socket.end(data);
});

server.listen(process.argv[2]);