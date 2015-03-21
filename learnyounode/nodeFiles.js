var http     = require('http'),
		fs       = require('fs'),
		filepath = process.argv[3],
		server;

server = http.createServer(function(req, res) {
	var fileStream = fs.createReadStream(filepath);

	fileStream.pipe(res);
});

server.listen(process.argv[2])