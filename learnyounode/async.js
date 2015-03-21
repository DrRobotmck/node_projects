var http = require('http');
var async = require('async');

var responseCallback = function(response) {
	var result = '';
	response.setEncoding('utf8');
	response.on('data', function(data) {
		result += data;
	})
	response.on('end', function() {
		return result;
	});
};

async.series([
	function(cb) {
		http.get(process.argv[2], function(response) {
		var result = '';
		response.setEncoding('utf8');
		response.on('data', function(data) {
			result += data;
		})
		response.on('end', function() {
			cb(null, result);
		});
	})},
	function(cb) {
		http.get(process.argv[3], function(response) {
		var result = '';
		response.setEncoding('utf8');
		response.on('data', function(data) {
			result += data;
		})
		response.on('end', function() {
			cb(null, result);
		});
	})},
	function(cb) {
		http.get(process.argv[4], function(response) {
		var result = '';
		response.setEncoding('utf8');
		response.on('data', function(data) {
			result += data;
		})
		response.on('end', function() {
			cb(null, result);
		});
	})}
	], function(err, results) {
		if (err) {
			console.log(err);
		} else {
			console.log(results.join('\n'));
		}
	}
);