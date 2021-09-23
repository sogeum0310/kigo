var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var MongoStore = require('connect-mongo')
var fileUpload = require('express-fileupload')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const Server = require('socket.io')
var app = express();

// var populate_esimate_form = require('./populate-estimate-form')
// var populate_user = require('./populate-user.js')
// var populate_estimate = require('./populate-estimate')
// var populate_estimate_response = require('./populate-estimate-response')

app.io = require('socket.io')()
app.io.on('connection', (socket) => {
  // console.log('socket connect')
  socket.on('disconnect', () => {
    // console.log('socket disconnect')
  })
  socket.on('chat-msg-1', (msg) => {
    app.io.emit('chat-msg-2', msg)
  })
})

// mongoose connection 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kigo', { useNewUrlParser: true, useUnifiedTopology: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// express session
app.use(session({
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/kigo'
  })
}))
app.use(fileUpload())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static('files'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

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

  if (req.url.match(/^\/admin\//)) {
    res.render('admin/error');
  } else {
    res.render('error');
  }
  console.log('- - - - -')
  console.log(res.locals.message)
  console.log('- - - - -')
  console.log(res.locals.error.stack)
  console.log('- - - - -')
});

module.exports = app;
