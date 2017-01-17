var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var passport = require('passport')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/chirp')
require('./models/models.js')

var index = require('./routes/index')
var api = require('./routes/api')
var authenticate = require('./routes/authenticate')(passport);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(flash())

/*app.use(session({
  secret: 'arjuna'
}))*/
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize())
app.use(passport.session())

app.use('/', index);
app.use('/api/bhargava', api);
app.use('/auth', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

// error handler
app.use(function(err, req, res, next) {
  console.log('some bullshit error handler')
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
