// User Schema

exports.User = new mongoose.Schema({
	name: String,
	salt: String,
	hash: String
});