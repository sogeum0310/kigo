var passport = require('passport');
var KakaoStrategy = require('passport-kakao').Strategy
var Model = require('../models/model');
var config = require('./_config');


passport.use(new KakaoStrategy(
  {
    clientID: config.kakao.clientID,
    clientSecret: config.kakao.clientSecret,
    callbackURL: config.kakao.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    Model.User.findOne({ username: profile.provider + profile.id,}, function(err, user) {
      if (err) { return done(err) }
      if (!user) {
        user = new Model.User({
          first_name: profile.provider + '_user',
          username: profile.provider + profile.id,
          roles: ['authenticated'],
        })
        user.save(function(err) {
          if (err) { console.log(err) }
          return done(err, user)
        })
      } else {
        return done(err, user)
      }
    })
  }
))

// serialize user into the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Model.User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport