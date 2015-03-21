var fs = require('fs');
var path = require('path');

fs.readdir(process.argv[2], function(err, list) {
	for (var i = 0; i < list.length; i++) {
		var extension = path.extname(list[i]);
		if (extension === '.' + process.argv[3]) {
			console.log(list[i]);
		}
	}
});