// ------------ //
// Node Modules //
// ------------ //

var application_root = __dirname,
    express          = require('express'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override'),
    path             = require('path'),
    logger           = require('morgan'),
    session          = require('express-session'),
    userPassword     = require('pwd'),
    models           = require('./db'),
    jade             = require('jade'),
    Student          = models.Student,
    Assignment       = models.Assignment;

var app = express();
console.log(app.set)
app.use(logger('dev'));
app.use( bodyParser() );

// Allow for the use of "_method" hack for put and delete requests
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use( express.static( path.join( application_root, 'public_html' ) ) );
app.use( express.static( 'public' ) );

// Set up sessions for the server
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'mosdefismyfavoriterapper'
	})
);


app.set('views', './views');
app.set('view engine', 'jade');
app.get('/students', function(req, res) {
	var students;
	Student.findAll().then(function(result) {
		res.render( 'index', {students: result} );
	});
});

app.get('/students/search', function(req, res) {
	var searchParam = req.query.search;

	Student.findOne({
		where: models.Sequelize.or({ name: searchParam },
		       models.Sequelize.or({ github_handle: searchParam })
		),
		include: [{	model: Assignment }]
	}).then(function(result){
		res.redirect( result.values.id );
	});
});

app.get('/students/new', function(req, res) {
	res.render('new')
});

app.post('/students', function(req, res) {
	var params = req.body;

	Student.create(params)
	       .then(function(newStudent) {
	       		res.redirect('/students/' + newStudent.id);
	       });
});

app.get('/students/:id', function(req, res) {
	var id = req.params.id;

	Student.find({
		where: { id: id },
		include: [{ model: Assignment }]
	}).then(function(result) {
		res.render( 'show', result.values );
	});
});

app.get('/students/:id/edit', function(req, res) {
	var id = req.params.id;
	var params = req.body;
	var query = { where: { id: id } };

	Student.find(query)
				 .then(function(student){
				 	res.render('edit', student.values);
				 })
});

app.put('/students/:id', function(req, res) {
	var id = req.params.id;
	var params = req.body;
	var query = { where: { id: id } };

	Student.update(params, query)
				 .then(function() {
						Student.find(query)
									 .then(function(student){
									 	 var studentObj = student.values;
									 	 res.redirect('/students/' + studentObj.id);
									 });
				 });
});

app.delete('/students/:id', function(req, res) {
	var id = req.params.id;

	Student.destroy({
		where: {
			id: id
		}
	}).then(function(result) {
			res.redirect('/students');
	});

});

module.exports = app;
