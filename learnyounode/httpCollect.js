var http = require('http');
http.get(process.argv[2], function(response) {
	var length = 0;
	var result = '';
	response.setEncoding('utf8');
	response.on('data', function(data) {
		result += data;
		length += data.length;
	})
	response.on('end', function() {
		console.log(length)
		console.log(result);
	});
});
