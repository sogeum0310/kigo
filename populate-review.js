var mongoose = require('mongoose')
var Schema = mongoose.Schema
var async = require('async')

var Model = require('./models/model')

var CompanyReviewSchema = new Schema({
  company: { type: Schema.ObjectId, ref: 'UserCompany' },
  user: { type: Schema.ObjectId, ref: 'User' },
  content: { type: String },
})

var CompanyReview = mongoose.model('CompanyReview', CompanyReviewSchema);

var users = []
var usercompanies = []
var companyreviews = []


function companyReviewCreate(company, user, content, cb) {
  companyreviewdetail = {
    company: company,
    user: user,
    content: content
  }

  var companyreview = new CompanyReview(companyreviewdetail)

  companyreview.save(function (err) {
    if (err) {
      console.log('ERROR CREATING CompanyReview: ' + companyreview)
      cb(err, null)
      return
    }
    console.log('New CompanyReview: ' + companyreview)
    companyreviews.push(companyreview)
    cb(null, companyreview)
  })
}


function fetchUsers(cb) {
  Model.User.find().exec(function (err, results) {
    if (err) { return next(err) }
    users = results
    cb()
  })
}

function fetchUserCompanies(cb) {
  Model.UserCompany.find().exec(function (err, results) {
    if (err) { return next(err) }
    usercompanies = results
    cb()
  })
}

function createCompanyReviews(cb) {
  async.parallel([
    function (callback) {
      companyReviewCreate(usercompanies[0], users[0], 'Good service, but expensive!', callback)
    },
    function (callback) {
      companyReviewCreate(usercompanies[0], users[1], 'highly recommended.', callback)
    },
    function (callback) {
      companyReviewCreate(usercompanies[0], users[2], 'I do not recommend', callback)
    },
    function (callback) {
      companyReviewCreate(usercompanies[0], users[3], 'Still good in every aspects', callback)
    },
  ], 
  cb)
} 



async.series([
  fetchUsers,
  fetchUserCompanies,
  createCompanyReviews,
], function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('COMPANYReviews: ' + results)
  }
  mongoose.connection.close()
})
