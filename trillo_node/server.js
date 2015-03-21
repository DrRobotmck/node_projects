// ------------ //
// Node Modules //
// ------------ //

var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser')
    path             = require('path'),
    logger           = require('morgan'),
    mongoose         = require('mongoose'),
    session          = require('express-session'),
    userPassword     = require('pwd');

// --------- //
// DB Config //
// --------- //

var db        = require('./db/config').db,
    UserModel = require('./db/config').UserModel,
    CardModel = require('./db/config').CardModel;

// ------ //
// Routes //
// ------ //

var userRouter 	= require('./routes/userRoutes'),
    cardRouter 	= require('./routes/cardRoutes'),
    loginRouter = require('./routes/loginRoutes');

// ----------------- //
// App Configuration //
// ----------------- //

var app  = express(),
		port = 9888;

app.use(logger('dev'));
app.use( bodyParser() );
app.use( express.static( path.join( application_root, 'public_html' ) ) );
app.use( express.static( path.join( application_root, 'public_html/public' ) ) );
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'mosdefismyfavoriterapper'
	})
);

// --------------------- //
// Session Configuration //
// --------------------- //

app.use(function(req, res, next) {
	var error = req.session.error;
	var msg   = req.session.success;
	delete req.session.error;
	delete req.session.success;
	res.locals.message = error ? error : msg ;
	next();
});

app.use('/users', userRouter);

module.exports = app;
