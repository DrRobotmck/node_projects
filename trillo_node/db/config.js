var Card = require('./cardSchema').Card;
var User = require('./userSchema').User;

exports.UserModel = mongoose.model('User', User);
exports.CardModel = mongoose.model('Card', Card);

exports.db = mongoose.connect('mongodb://localhost/trillo_database');

