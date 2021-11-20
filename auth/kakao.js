var passport = require('passport');
var KakaoStrategy = require('passport-kakao').Strategy
var Model = require('../models/model');
var config = require('../config');


passport.use(new KakaoStrategy(
  {
    clientID: config.ids.kakao.clientID,
    clientSecret: config.ids.kakao.clientSecret,
    callbackURL: config.ids.kakao.callbackURL,
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      console.log(profile)
      var city = await Model.EstimateItemDetail.findOne({ input_name: 'field9' })
      Model.User.findOne({ username: profile.provider + profile.id,}, function(err, user) {
        if (err) { return done(err) }
        if (!user) {
          user = new Model.User({
            username: profile.provider + profile.id,
            name: 'kakao_user',
            authorization: true,
            account: 'personal',
            social: true,
            service: true,
            city: city
          })
          user.save(function(err) {
            if (err) { console.log(err) }
            return done(err, user)
          })
        } else {
          return done(err, user)
        }
      })
    } catch (error) {
      return done(error)
    }
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