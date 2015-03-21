var fs = require('fs');
var path = require('path');

module.exports = function(dirName, extName, callback) {

	fs.readdir(dirName, function(err, list) {
		if (err) {
			callback(err, null);
		} else {
			var fileList = [];
			for (var i = 0; i < list.length; i++) {
				var extension = path.extname(list[i]);
				if ( extension === ('.' + extName) ) {
					fileList.push(list[i]);
				}
			}
			callback(null, fileList);
		}
	})
};