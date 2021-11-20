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
      
      if (user.service===false) {
        return cb(null, false, { message: 'service off' })
      }

      if (user.authorization===false) {
        return cb(null, false, { message: 'Unauthorized' })
      }

      if (user.drop===true) {
        return cb(null, false, { message: 'Dropped account' })
      }

      if (user.account==='business') {
        // Counting reviews
        var review_count = await Model.Review.countDocuments({ parent: user._id })
        user.reviews = review_count
        // Scoring reviews
        var num = 0
        var reviews = await Model.Review.find({ parent: user._id })
        for (review of reviews) {
          num += review.rating
        }
        user.score = num
        // Counting a number of contracts
        var contracts = await Model.EstimateResponse.countDocuments({ user: user._id, submit: true })
        user.contract = contracts
        // Level
        if (user.start_date) {
          var m = 1000 * 60 * 60 * 24 * 30
          if (user.level===1 && new Date() - user.start_date > m) {
            user.level = 2
          }
        }
        await user.save()
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
