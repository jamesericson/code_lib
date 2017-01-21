var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('./strategies/userStrategy');

//require routers
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var libraryRouter = require('./routes/library');
var techCatRouter = require('./routes/techCategory');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 6, secure: false }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/library', libraryRouter);
app.use('/techCategory', techCatRouter)


// server port set and listen
var serverPort = process.env.port || 8080;
app.set('port', serverPort);

var server = app.listen(serverPort, function() {
  console.log('Server Spun | Listening on ', server.address().port);
});

// connect to the mongodb
var mongoURI = "mongodb://localhost:27017/codeLibDB";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});
