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
const nodemailer = require('nodemailer')
const Model = require('./models/model')
const app = express();

const mongoUrl = 'mongodb://sogeum0310:hyun0831**@ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:27017/test?authSource=admin&authMechanism=SCRAM-SHA-1'

// air
// mongoose connection 
const mongoose = require('mongoose');
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const populate = require('./populate/populate')


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
    mongoUrl: mongoUrl
  })
}))

app.use(function (req, res, next) {
  const user_global = req.session.user
  res.locals.user_global = user_global
  if (user_global) {
    if (user_global.platform.length > 0) {
      res.locals.user_global_account = 'business'
    } else {
      res.locals.user_global_account = 'personal'
    }
  }
  next()
})

// Set global notification count variable for chat
app.use(async function (req, res, next) {
  try {
    var count = await Model.ChatContent.countDocuments({ user: req.session.user._id })
    var chat_rooms = await Model.ChatRoom.find({ user: req.session.user._id })
    var chat_notification = 0
    for (chat_room of chat_rooms) {
      var count = await Model.ChatContent.countDocuments({ room: chat_room._id, read: { $ne: req.session.user._id } })
      chat_notification += count
    }
    console.log(chat_notification)
    res.locals.chat_notification = chat_notification
    next()
  } catch (error) {
    console.log(error)
    next()
  }
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

  res.render('error');
});


module.exports = app;
