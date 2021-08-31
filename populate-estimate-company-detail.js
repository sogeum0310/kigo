var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Model = require('./models/model')
var async = require('async')

var EstimateCompanySchema = new Schema({
  estimate_id: { type: Schema.ObjectId, ref: 'Estimate', required: true },
  user_id: { type: Schema.ObjectId, ref: 'UserCompany', required: true },
  item: { type: String },
  cost: { type: String },
  note: { type: String },
}) 

var EstimateCompany = mongoose.model('EstimateCompany', EstimateCompanySchema)

var estimatecompanies = []
var estimates = []
var usercompanies = []

function fetchEstimates(cb) {
  Model.Estimate.find().exec(function (err, results) {
    estimates = results
    cb()
  })
}

function fetchUserCompanies(cb) {
  Model.UserCompany.find().exec(function (err, results) {
    usercompanies = results
    cb()
  })
}


// item, cost, note
function estimateCompanyCreate(estimate_id, user_id, item, cost, note, cb) {
  estimatecompanydetail = {
    estimate_id: estimate_id, 
    user_id: user_id,
    item: item,
    cost: cost,
    note: note,
  }

  var estimatecompany = new EstimateCompany(estimatecompanydetail)

  estimatecompany.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New EstimateCompany: ' + estimatecompany)
    estimatecompanies.push(estimatecompany)
    cb(null, estimatecompany)
  })
}

function createEstimateCompanies(cb) {
  async.series([
    function (callback) {
      estimateCompanyCreate(estimates[0], usercompanies[0], 'take a photo', '500', '', callback)
    },
    function (callback) {
      estimateCompanyCreate(estimates[0], usercompanies[0], 'blog posting', '400', 'note', callback)
    },
    function (callback) {
      estimateCompanyCreate(estimates[0], usercompanies[0], 'TV commercial', '450', 'cable or main channel(add cost)', callback)
    },
    function (callback) {
      estimateCompanyCreate(estimates[1], usercompanies[0], 'blog posting', '200', 'per one posting', callback)
    },
    function (callback) {
      estimateCompanyCreate(estimates[1], usercompanies[0], 'film a short video', '600', 'upload to YouTube', callback)
    },
    function (callback) {
      estimateCompanyCreate(estimates[2], usercompanies[1], 'writing a article', '550', 'magazine or etc.', callback)
    },
  ],
  cb)
}


async.series([
  fetchEstimates,
  fetchUserCompanies,
  createEstimateCompanies,
], 
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('ESTIMATECompany: ' + estimatecompanies)
  }
  mongoose.connection.close()
})