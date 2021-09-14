var mongoose = require('mongoose');
var Schema = mongoose.Schema

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
  company_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  about: { type: String },
  platform: [{ type: Schema.ObjectId, ref: 'Platform'}]
});

var EstimateSchema = new Schema({
  user_id: [{ type: Schema.ObjectId, ref: 'User' }],
  platform : [{ type: Schema.ObjectId, ref: 'Platform' }],
  business : [{ type: Schema.ObjectId, ref: 'Business' }],
  goal : [{ type: Schema.ObjectId, ref: 'Goal' }],
  start_day : [{ type: Schema.ObjectId, ref: 'Start_day' }],
  how_long : [{ type: Schema.ObjectId, ref: 'How_long' }],
  cost : [{ type: Schema.ObjectId, ref: 'Cost' }],
  city : [{ type: Schema.ObjectId, ref: 'City' }],
  feedback : [{ type: Schema.ObjectId, ref: 'Feedback' }]
});

var EstimateCompanySchema = new Schema({
  company_id: [{ type: Schema.ObjectId, ref: 'UserCompany' }],
  estimate: { type: Schema.ObjectId, ref: 'Estimate', required: true },
  unit: [{ type: String, ref: 'Unit' }],
  cost: [{ type: String, ref: 'Cost' }],
  msg: [{ type: String, ref: 'Msg' }]
});

// var CategorySchema = new Schema({

// })




var User = mongoose.model('User', UserSchema)
var UserCompany = mongoose.model('UserCompany', UserCompanySchema)
var Estimate = mongoose.model('Estimate', EstimateSchema)
var EstimateCompany = mongoose.model('EstimateCompany', EstimateCompanySchema)




var users = []
var usercompanies = []
var estimates = []
var estimatecompanies = []

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
      cb(err, null)
      return
    }
    console.log('New User: ' + user)
    users.push(user)
    cb(null, user)
  })
}


function userCompanyCreate(company_id, password, name, phone, email, about, platform) {
  usercompanydetail = {
    company_id: company_id,
    password: password,
    name: name,
    phone: phone,
    email: email,
    about: about,
    platform: platform
  }

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


function estimateCreate(user_id, platform, business, goal, start_day, how_long, cost, city, feedback) {
  estimatedetail = {
    user_id: user_id,
    platform: platform,
    business: business,
    goal: goal,
    start_day: start_day,
    how_long: how_long,
    cost: cost,
    city: city,
    feedback: feedback
  }

  var estimate = new Estimate(estimatedetail)

  estimate.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Estimate: ' + estimate)
      eb(err, null)
      return
    }
    console.log('New Estimate: ' + estimate)
    estimates.push(estimate)
    cb(null, estimate)
  })
}


function estimateCompanyCreate(company_id, estimate, unit, cost, msg) {
  estimatecompanydetail = {
    company_id: company_id,
    estimate: estimate,
    unit: unit,
    cost: cost,
    msg: msg
  }

  var estimatecompany = new EstimateCompany(estimatecompanydetail)

  estimatecompany.save(function (err) {
    if (err) {
      console.log('ERROR CREATING EstimateCompany: ' + estimatecompany)
      cb(err, null)
      return
    }
    console.log('New EstimateCompany: ' + estimatecompany)
    estimatecompanies.push(estimatecompany)
    cb(null, estimatecompany)
  })
}

// user_id, password, name, gender, date_of_birth, city, phone, email
function createUsers(cb) {
  async.parallel([
    function (callback) {
      userCreate('bunny', '123', 'so cute', 'male', '1990-12-13', 'Seoul', 'bunny@example.com')
    }, 
    function (callback) {
      userCreate('bird', '123', 'fly high', 'male', '1988-06-24', 'Incheon', 'bird@example.com')
    }, 
    function (callback) {
      userCreate('monkey', '123', 'love tree', 'female', '1996-03-11', 'Busan', 'monkey@example.com')
    }, 
    function (callback) {
      userCreate('dog', '123', 'bark again', 'male', '2001-11-04', 'Seoul', 'dog@example.com')
    }, 
  ],
  cb)
}

// company_id, password, name, phone, email, about, platform
function createUserCompanies(cb) {
  async.parallel([
    function (callback) {
      userCompanyCreate('apple', '123', 'red green', '01011112222', 'apple@example.com', 'We are selling apple', '')
    },
    function (callback) {
      userCompanyCreate('banana', '123', 'yellow', '01011112222', 'banana@example.com', 'We are selling banana', '')
    },
    function (callback) {
      userCompanyCreate('strawberry', '123', 'deep red', '01011112222', 'strawberry@example.com', 'We are selling strawberry', '')
    },
  ], 
  cb)
}




// user_id, platform, business, goal, start_day, how_long, cost, city, feedback
function createEstimates(cb) {
  async.parallel([
    function (callback) {
      estimateCreate()
    },
  ], 
  cb)
}

function createEstimateCompanies(cb) {
  async.parallel([
    function (callback) {
      estimateCompanyCreate()
    },
  ],
  cb)
}

async.series([
  createUsers,
  createUserCompanies,
  createEstimates,
  createEstimateCompanies
],

function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('ESTIMATECompanies: ' + estimatecompanies)
  }

  mongoose.connection.close()
})