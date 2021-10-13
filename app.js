const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const fileUpload = require('express-fileupload')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const Server = require('socket.io')
const nodemailer = require('nodemailer')
const Model = require('./models/model')
const app = express();
app.io = require('socket.io')()


// mongoose connection 
const mongoose = require('mongoose');
mongoose.connect('mongodb://sogeum0310:hyun0831**@ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:27017/kigo', { useNewUrlParser: true, useUnifiedTopology: true });

// https://github.com/sogeum0310/

app.io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room)
    app.io.to(room).emit('join', room)
  })
  socket.on('chat message', async (room, msg) => {
    const message = new Model.ChatContent({
      user: msg.user._id,
      content: msg.content,
      room: room
    }) 
    message.save()
    msg.me = msg.user._id
    app.io.to(room).emit('chat message', msg);
  });
  socket.on('disconnect', function () {
    console.log('disconnect!')
  })
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
    mongoUrl: 'mongodb://sogeum0310:hyun0831**@ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:27017/kigo'
  })
}))

app.use(function (req, res, next) {
  const user_global = req.session.user
  if (user_global) {
    if (user_global.platform.length > 0) {
      res.locals.user_global_account = 'business'
    } else {
      res.locals.user_global_account = 'personal'
    }
  }
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
