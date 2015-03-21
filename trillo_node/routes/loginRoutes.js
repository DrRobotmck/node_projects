var userRouter 	 = require('./userRoutes'),
    authenticate = require('./authHelpers').authenticate;

// --------------------- //
// User LOGIN and LOGOUT //
// --------------------- //


// POST /users/login
userRouter.post('/login', function(req, res, next) {
	var userData = req.body;

	var onAuthSuccess = function(error, user) {
		if (user) {
			req.session.regenerate(function(){
				req.session.user    = user;
				req.session.success = "Authenticated User";
				res.send(user);
			});
		} else if (error) {
			res.status(422).send();
		}
	};

	authenticate(userData.name, userData.password, onAuthSuccess);

});

// POST /users/logout
userRouter.post('/logout', function(req, res, next) {
	req.session.destroy(function() {
		res.send({ response: 'Logout Successful' });
	});
});