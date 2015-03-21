// Card Schema

exports.Card = new mongoose.Schema({
	content:     String,
	completed:   Boolean,
	dateCreated: Date,
	user_id:     String
});