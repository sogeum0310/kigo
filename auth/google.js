var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Model = require('../models/model');
var config = require('./_config');


passport.use(new GoogleStrategy( // new GoogleStrategy(object, function)
  
  // Parameter - Object
  {
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  
  // Parameter - Function
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    var searchQuery = {
      username: profile.provider + profile.id
    };
    var updates = {
      name: profile.displayName,
      username: profile.provider + profile.id,
      first_name: profile.name.givenName,
      family_name: profile.name.familyName
    };
    var options = {
      upsert: true
    };
    Model.User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
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
