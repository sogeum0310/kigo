var mongoose = require('mongoose');
var Schema = mongoose.Schema
var async = require('async')
var Model = require('./models/model')

var EstimateSchema = new Schema({
  user_id: { type: Schema.ObjectId, ref: 'User' },
  platform : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  business : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  goal : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  start_day : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  how_long : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  cost : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  city : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  feedback : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }]
});


var Estimate = mongoose.model('Estimate', EstimateSchema)

var users = []

// var estimateitems = []
var platforms = []
var businesses = []
var goals = []
var startdays = []
var howlongs = []
var costs = []
var cities = []
var feedbacks = []

var estimates = []



function estimateCreate(user_id, platform, business, goal, start_day, how_long, cost, city, feedback, cb) {
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
      cb(err, null)
      return
    }
    console.log('New Estimate: ' + estimate)
    estimates.push(estimate)
    cb(null, estimate)
  })
}

function fetchUsers(cb) {
  Model.User.find({}).exec(function (err, results) {
    users = results
    // console.log(users[0])
    cb()
  })
}

function fetchEstimateItemDetails(cb) {
  Model.EstimateItem.find().populate('detail').exec(function (err, results) {
    platforms = results[0].detail
    businesses = results[1].detail
    goals = results[2].detail
    startdays = results[3].detail
    howlongs = results[4].detail
    costs = results[5].detail
    cities = results[6].detail
    feedbacks = results[7].detail
    cb()
  })
}

// user_id, platform, business, goal, start_day, how_long, cost, city, feedback
function createEstimates(cb) {
  async.parallel([
    function (callback) {
      estimateCreate(
        users[0]._id, 
        [platforms[0]._id,], 
        [businesses[0]._id, businesses[2]._id,], 
        [goals[0]._id, goals[3],], 
        [startdays[1]._id,], 
        [howlongs[2]._id,], 
        [costs[0]._id,], 
        [cities[3]._id,], 
        [feedbacks[0]._id,], 
        callback
        )
    },
    function (callback) {
      estimateCreate(
        users[0]._id, 
        [platforms[2]._id,], 
        [businesses[5]._id, businesses[6]._id,], 
        [goals[2]._id, goals[3]._id,], 
        [startdays[1]._id,], 
        [howlongs[2]._id,], 
        [costs[2]._id,], 
        [cities[1]._id,], 
        [feedbacks[1]._id,], 
        callback
        )
    },
    function (callback) {
      estimateCreate(
        users[0]._id, 
        [platforms[4]._id,], 
        [businesses[1]._id,businesses[3]._id,businesses[4]._id,], 
        [goals[1]._id, goals[3]._id,], 
        [startdays[0]._id,], 
        [howlongs[2]._id,], 
        [costs[1]._id,], 
        [cities[1]._id,], 
        [feedbacks[1]._id,], 
        callback
        )
    },
    function (callback) {
      estimateCreate(
        users[1]._id, 
        [platforms[7]._id,], 
        [businesses[5]._id, businesses[6]._id,], 
        [goals[1]._id,], 
        [startdays[0]._id,], 
        [howlongs[3]._id,], 
        [costs[1]._id,], 
        [cities[0]._id,], 
        [feedbacks[1]._id,], 
        callback
        )
    },

  ], 
  cb);
}


async.series([
  fetchUsers,
  fetchEstimateItemDetails,
  createEstimates,
],

function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('Estimate: ' + estimates)
  }

  mongoose.connection.close()
})





