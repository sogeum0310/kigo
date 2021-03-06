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
const Model = require('./models/model')
const app = express();
const chat_notification = require('./utils/chat_notification')
const user_util = require('./utils/user_util')
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config.js')
// const populate = require('./populate/populate')

// 11-17 금요일 4시50분
const mongoUrl = config.mydb.url
// mongoose connection 
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// for parsing application/json
app.use(express.json())

 // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

const sessionMiddleware = session({
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: mongoUrl
  })
})

app.use(sessionMiddleware)

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  // console.log('app.js msgs: ' + msgs)
  // Define global variable
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  // Save to session
  req.session.messages = [];

  next();
});

app.use(async function (req, res, next) {
  try { 
    if (req.user) {
      res.locals.user_global = req.user
      var user_global = await Model.User.findById(req.user.id)
      res.locals.user_global_account = user_global.account==='personal' ? 'personal' : 'business'
    }
    console.log(res.locals.user_global)
    console.log(res.locals.user_global_account)
  } catch (error) {
    console.log(error)
  }
  next()
})

app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static('files'));

app.use(user_util)
app.use(chat_notification)

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
    res.render('admin/error')
  } else {
    res.render('error');
  }
});


module.exports = app;