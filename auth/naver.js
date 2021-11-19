var passport = require('passport');
var NaverStrategy = require('passport-naver').Strategy;
var Model = require('../models/model');
var config = require('../config');


passport.use(new NaverStrategy(
  {
    clientID: config.ids.naver.clientID,
    clientSecret: config.ids.naver.clientSecret,
    callbackURL: config.ids.naver.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    Model.User.findOne({ username : profile.provider + profile.id }, function(err, user) {
      if (!user) {
        user = new Model.User({
          username: profile.provider + profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          auth: true,
          account: 'personal',
          social: true
        });
        user.save(function(err) {
          if (err) console.log(err);
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
  }
));

// serialize user into the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Model.User.findById(id, function (err, user) {
    done(err, user);
  });
});


module.exports = passport;