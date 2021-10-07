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
var nodemailer = require('nodemailer')
var Model = require('./models/model')
var app = express();
var Model = require('./models/model')

var localMongo = 'mongodb://localhost:27017/kigo'
var awsMongo = 'mongodb://sogeum0310:hyun0831**@ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:27017/kigo'

// air

// mongoose connection 
const mongoose = require('mongoose');
mongoose.connect(awsMongo, { useNewUrlParser: true, useUnifiedTopology: true });

// var populate_esimate_form = require('./populate-estimate-form')
// var populate_user = require('./populate-user.js')
// var populate_estimate = require('./populate-estimate')
// var populate_estimate_response = require('./populate-estimate-response')

app.io = require('socket.io')()

app.io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room)
  })
  socket.on('out', (city) => {
    socket.leave(city)
  })
  socket.on('chat message', async (room, msg) => {
    var message = new Model.ChatContent({
      user_id: msg.user,
      content: msg.content,
      room: room
    }) 
    message.save()
    app.io.to(room).emit('chat message', msg);
  });
})

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
    mongoUrl: awsMongo
  })
}))

app.use(function (req, res, next) {
  var user_global = req.session.user
  if (user_global) {
    if (user_global.platform.length > 0) {
      res.locals.user_global_account = 'business'
    } else {
      res.locals.user_global_account = 'personal'
    }
  }
  // console.log(res.locals.user_global_account)
  next()
})

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
});


module.exports = app;
