var mongoose = require('mongoose');
var Schema = mongoose.Schema
var async = require('async')


var UserSchema = new Schema({
  user_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  gender: { type: String },
  date_of_birth: { type: Date },
  city: { type: String },
  phone: { type: String },
  email: { type: String }
});

var UserCompanySchema = new Schema({
  user_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  about: { type: String },
  platform: [{ type: Schema.ObjectId, ref: 'Platform'}]
});


var User = mongoose.model('User', UserSchema)
var UserCompany = mongoose.model('UserCompany', UserCompanySchema)

var users = []
var usercompanies = []


function userCreate(user_id, password, name, gender, date_of_birth, city, phone, email, cb) {
  userdetail = {
    user_id: user_id,
    password: password,
    name: name,
    gender: gender, 
    date_of_birth: date_of_birth,
    city: city,
    phone: phone,
    email: email
  }

  var user = new User(userdetail)

  user.save(function (err) {
    if (err) {
      console.log('ERROR CREATING User: ' + user)
      cb(err, null)
      return
    }
    console.log('New User: ' + user)
    users.push(user)
    cb(null, user)
  })
}


function userCompanyCreate(user_id, password, name, phone, email, about, platform, cb) {
  usercompanydetail = {
    user_id: user_id,
    password: password,
    name: name,
    phone: phone,
    email: email,
    about: about,
  }

  if (platform != false) usercompanydetail.platform = platform

  var usercompany = new UserCompany(usercompanydetail)

  usercompany.save(function (err) {
    if (err) {
      console.log('ERROR CREATING UserCompany: ' + usercompany)
      cb(err, null)
      return
    }
    console.log('New UserCompany: ' + usercompany);
    usercompanies.push(usercompany)
    cb(null, usercompany)
  })
}



// user_id, password, name, gender, date_of_birth, city, phone, email
function createUsers(cb) {
  async.parallel([
    function (callback) {
      userCreate('bunny', '123', 'so cute', 'male', '1990-12-13', 'Seoul', '01022223333', 'bunny@example.com', callback)
    }, 
    function (callback) {
      userCreate('bird', '123', 'fly high', 'male', '1988-06-24', 'Incheon', '01022223333', 'bird@example.com', callback)
    }, 
    function (callback) {
      userCreate('monkey', '123', 'love tree', 'female', '1996-03-11', 'Busan', '01022223333', 'monkey@example.com', callback)
    }, 
    function (callback) {
      userCreate('dog', '123', 'bark again', 'male', '2001-11-04', 'Seoul', '01022223333', 'dog@example.com', callback)
    }, 
  ],
  cb)
}

// user_id, password, name, phone, email, about, platform
function createUserCompanies(cb) {
  async.parallel([
    function (callback) {
      userCompanyCreate('apple', '123', 'red green', '01011112222', 'apple@example.com', 'We are selling apple', false, callback)
    },
    function (callback) {
      userCompanyCreate('banana', '123', 'yellow gold', '01011112222', 'banana@example.com', 'We are selling banana', false, callback)
    },
    function (callback) {
      userCompanyCreate('strawberry', '123', 'deep red', '01011112222', 'strawberry@example.com', 'We are selling strawberry', false, callback)
    },
  ], 
  cb)
}


async.series([
  createUsers,
  createUserCompanies,
],

function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('USERCompanies: ' + usercompanies)
  }

  mongoose.connection.close()
})