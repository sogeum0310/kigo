var passport = require('passport');
var Strategy = require('passport-local');
var Model = require('../models/model');
var crypto = require('crypto');


passport.use(new Strategy( // new Strategy(function)
  
  // Parameter - Function
  async function(username, password, cb) {
    try {
      var user = await Model.User.findOne({ username: username })
      if (!user) { return cb(null, false, { message: 'Incorrect username.' }); }
      var hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256').toString('hex')
      
      if (user.password!==hashedPassword) {
        return cb(null, false, { message: 'Incorrect password.' });
      }
      
      if (user.auth===0) {
        return cb(null, false, { message: 'Unauthorized' })
      }

      return cb(null, user); 

    } catch (error) {
      console.log(error)
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
