var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var db = require('./db');

var CommentController = require('./controllers/comment.controller');
var NewsController = require('./controllers/news.controller');
app.use('/comments', CommentController);
app.use('/news', NewsController);

app.get('/checking', function(req, res){
  res.json({
     "TEST": "WORKS"
  });
});

app.post('/comments', (req, res) => {
  const comments = { name: req.body.name, body: req.body.body };
  db.collection('comments').insert(comments, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
  });
});

app.post('/news', (req, res) => {
  const newss = { title: req.body.title, text: req.body.text, image: req.body.image };
  db.collection('news').insert(newss, (err, result) => {
    if (err) { 
      res.send({ 'error': 'An error has occurred' }); 
    } else {
      res.send(result.ops[0]);
    }
  });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));


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
  res.status(err.status || 500);
});

module.exports = app;
