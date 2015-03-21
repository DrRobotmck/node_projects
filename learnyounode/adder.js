var numbers = process.argv.slice(2);

var reduction = numbers.reduce(function(a, b) {
	return parseInt(a) + parseInt(b);
});

console.log(reduction);