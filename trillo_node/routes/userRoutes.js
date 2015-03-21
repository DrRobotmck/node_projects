var express      = require('express'),
    authenticate = require('./authHelpers').authenticate,
    restrict     = require('./authHelpers').restrict,
    userRouter   = express.Router();

// --------- //
// DB Config //
// --------- //

var db        = require('../db/config').db,
    UserModel = require('../db/config').UserModel;

// ------- //
// Routing //
// ------- //

userRouter.use(function(req, res, next){
	console.log('User Router');
	next();
});

// CREATE - POST /users

userRouter.post('/', function(req, res, next) {
	var	userData = req.body,
			userModel;

	userModel = new UserModel({
		name: userData.name
	});

	// Creates encrypted password
	userPassword.hash(userData.password, function(err, salt, hash) {
		userModel.salt = salt;
		userModel.hash = hash;
		return userModel.save(function(error){
			if (!error) {
				return res.send(userModel);
			} else {
				console.log(error);
				return res.send(error);
			}
		});
	});
});

// SHOW - GET /users/:user_id
// restricted to current user

userRouter.get('/:user_id', restrict, function(req, res, next) {
	var userId = req.params.user_id;

	UserModel.findById(userId, function(error, user) {
		if (!error) {
			return res.send(user);
		} else {
			console.log(error);
			return res.send(error);
		}
	})
});

// UPDATE - PUT /users/:user_id

userRouter.put('/:user_id', restrict, function(req, res, next) {
	var userId   = req.params.user_id,
			userData = req.body;

	UserModel.findById(userId, function(error, user) {
		if (!error) {
			user.name = userData.name;
			return user.save(function(error) {
				if (!error) {
					return res.send(user);
				} else {
					console.log(error);
					return res.send(error);
				}
			});
		}
	})
});

module.exports = userRouter;