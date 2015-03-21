var application_root = __dirname,
    express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    path = require( 'path' ),
    mongoose = require( 'mongoose' );

var appServer = express(),
    port = 9888;

// appServer.use( express.static( path.join( application_root, 'site') ) );
// appServer.use( bodyParser() );

// Connect to MongoDB
mongoose.connect( 'mongodb://localhost/library_database' );

var Keywords = new mongoose.Schema({
  keyword: String
});

var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date,
  keywords: [ Keywords ]
});

var BookModel = mongoose.model( 'Book', Book );

appServer.configure( function() {
  appServer.use( express.bodyParser() ); // parses the body and stores it in 'request.body'
  appServer.use( express.methodOverride() ); // for puts and delete requests
  appServer.use( appServer.router );
  appServer.use( express.static( path.join( application_root, 'site' ) ) );
  appServer.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
});

appServer.listen( port, function() {
  console.log( 'Running on port %d in %s mode', port, appServer.settings.env );
});

appServer.get( '/api', function( request, response ) {
  response.send( 'API Route');
});

// GET ROUTE for all books -- INDEX
appServer.get( '/api/books', function( request, response ) {
  return BookModel.find( function( error, books ) {
    if (!error) {
      return response.send( books );
    } else {
      return console.log( error );
    }
  });
});

// POST ROUTE for a new book -- CREATE
appServer.post( '/api/books', function( request, response ) {
  var data = request.body;
  var book = new BookModel({
    title: data.title,
    author: data.author,
    releaseDate: data.releaseDate,
    keywords: data.keywords
  });

  return book.save( function( error ) {
    if ( !error ) {
      console.log( 'created' );
      return response.send( book );
    } else {
      console.log( error );
    }
  });
});

// GET ROUTE for a single book by ID -- SHOW
appServer.get( '/api/books/:id', function( request, response ) {
  var bookId = request.params.id;

  return BookModel.findById( bookId, function( error, book ) {
    if (!error) {
      return response.send( book );
    } else {
      console.log( error );
    }
  });
});

// PUT ROUTE for a single book by ID -- UPDATE
appServer.put( '/api/books/:id', function( request, response ) {
  var data = request.body;
  var bookId = request.params.id;

  return BookModel.findById(  bookId, function( error, book ) {
    if (!error) {
      book.title = data.title;
      book.author = data.author;
      book.releaseDate = data.releaseDate;
      book.keywords = data.keywords;

      return book.save( function( error ) {
        if (!error) { return response.send( book ) }
        else { console.log( error ); }
      });
    } else {
      console.log( error );
    }
  });
});

// DELETE ROUTE for a single book by ID -- DELETE
appServer.delete( '/api/books/:id', function( request, response) {
  var bookId = request.params.id;

  return BookModel.findById( bookId, function( error, book ) {
    if ( !error ) {
      return book.remove( function( error ) {
        if ( !error ) {
          console.log( 'Book removed' );
          return response.send( '' );
        } else {
          console.log( error );
        }
      });
    }
    else {
      console.log( error );
    }
  });
});
