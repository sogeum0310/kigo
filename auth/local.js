var passport = require('passport');
var LocalStrategy = require('passport-local');
var Model = require('../models/model');
var crypto = require('crypto');


passport.use(new LocalStrategy( // new Strategy(function)
  // Parameter - Function
  async function(username, password, cb) {
    try {
      var user = await Model.User.findOne({ username: username })
      if (!user) { return cb(null, false, { message: '아이디와 비밀번호를 확인하세요.' }); }
      var hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256').toString('hex')
      if (user.password!==hashedPassword) {
        return cb(null, false, { message: '아이디와 비밀번호를 확인하세요.' });
      }
      
      if (user.service===false) {
        return cb(null, false, { message: '승인 대기중입니다' })
      }

      if (user.authorization===false) {
        return cb(null, false, { message: '사용 정지된 회원입니다' })
      }

      if (user.drop===true) {
        return cb(null, false, { message: '탈퇴한 회원입니다' })
      }

      return cb(null, user); 

    } catch (error) {
      return cb(null, false, { message: 'error' })
    }
  }
));

// serialize user into the session
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


module.exports = passport
