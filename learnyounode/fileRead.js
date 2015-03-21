var fs = require('fs');

var path = process.argv[2];
var file = fs.readFileSync(path).toString().split('\n');

file.pop();

console.log(file.length);