var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override'),
    path             = require('path'),
    logger           = require('morgan'),
    session          = require('express-session'),
    userPassword     = require('pwd');
    models           = require('./models');



var app = express();

// Server Configuration
// set up server logs in development
app.use(logger('dev'));
// set up request parsing
app.use( bodyParser() );
// set up method override for PUT and DELETE
app.use( methodOverride() );
// set up serving of static assets
app.use( express.static( path.join( application_root, 'public' )))
app.use( express.static( path.join( application_root, 'browser' )))
// set up sessions
app.use( session({
  resave: false,
  saveUninitialized: false,
  secret: 'mosdefismyfavoriterapper'
  })
);

// Routes
// Root
app.get('/', function(req, res) {
  res.render('index.html')
});

// Export app as module
module.exports = app;