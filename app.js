var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); 
var cors=require('cors');
var logger = require('morgan');



var usersRouter = require('./routes/users'); 
var questionRouter=require('./routes/question');
var answerRouter=require('./routes/answer')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter); 
app.use('/question',questionRouter); 
app.use('/answer',answerRouter); 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.json({ error: err })
});

module.exports = app;
