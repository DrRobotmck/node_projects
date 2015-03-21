var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override'),
    path             = require('path'),
    logger           = require('morgan'),
    session          = require('express-session'),
    userPassword     = require('pwd');
    // models           = require('./db'),
    // User             = models.User,
    // Item             = models.Item;

var app = express();

// Server Configuration
// set up server logs in development
app.use(logger('dev'));
// set up request parsing
app.use( bodyParser() );
// set up method override for PUT and DELETE
app.use( methodOverride() );
// set up serving of static assets
app.use( express.static( path.join( application_root, 'public_html' )))
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
  req.render('index.html')
});

// Items

app.get('/items', function(req, res) {

})


// Export app as module
module.exports = app;