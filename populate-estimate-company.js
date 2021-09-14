var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Model = require('./models/model')
var async = require('async')

var EstimateCompanySchema = new Schema({
  estimate: { type: Schema.ObjectId, ref: 'Estimate', required: true },
  company: { type: Schema.ObjectId, ref: 'UserCompany', required: true },
  item: [{ type: String }],
  cost: [{ type: String }],
  note: [{ type: String }],
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
function estimateCompanyCreate(estimate, company, item, cost, note, cb) {
  estimatecompanydetail = {
    estimate: estimate, 
    company: company,
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
      estimateCompanyCreate(estimates[0], usercompanies[0], ['take a photo', 'blog posting', 'TV commercial'], ['500', '300', '600'], ['We use a DSLR Camera', '', 'including YouTube'], callback)
    },
    function (callback) {
      estimateCompanyCreate(estimates[0], usercompanies[1], ['blog posting', 'increasing SNS follower'], ['400', '550'], ['per 10 blogs', 'Our main target is Instagram'], callback)
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