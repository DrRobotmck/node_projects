var UserModel = require('../db/config').UserModel;

// ----------------------------- //
// Secure Password Configuration //
// ----------------------------- //

exports.authenticate = function(name, password, fn) {
	console.log('authenticating: %s:%s', name, password);
	UserModel.find({name: name}, function(error, user) {
		user = user[0];
		userPassword.hash(password, user.salt, function(error, hash) {
			if (hash === user.hash) { return fn(false, user) }
			else { return fn(true, null) }
		});
	});
};

// Restrict access to only current user
exports.restrict = function(req, res, next) {
	var session = req.session.user;
	var reqID = req.params.user_id;
	session && session._id === reqID ? next() : res.status(403).send();
};