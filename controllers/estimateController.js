var Model = require('../models/model')
var async = require('async')


exports.estimate_request_list = function (req, res, next) {
  Model.EstimateRequest.find({ 'user_id': req.session.user }).populate('platform').exec(function (err, results) {
    console.log(results)
    res.render('estimate_request_list', { title: 'Estimate Requests', estimate_requests: results })
  })
}

exports.estimate_response_detail = function (req, res, next) {

  var estimate_response
  var file
  var business_reviews

  function getEstimateResponse(callback) {
    Model.EstimateResponse.findById(req.params.id).exec(function (err, results) {
      estimate_response = results
      console.log(estimate_response)
      callback()
    })
  }

  function getFile(callback) {
    Model.File.findOne({ 'parent': estimate_response.user_id }).exec(function (err, results) {
      file = results
      console.log(file)
      callback()
    })
  }

  function getBusinessReview(callback) {
    Model.BusinessReview.find({ 'user_business': estimate_response.user_id }).exec(function (err, results) {
      business_reviews = results
      console.log(business_reviews)
      callback()
    })
  }

  function nowRender() {
    res.render('estimate_response_detail', { 
      title: 'Estimate Response', 
      estimate_response: estimate_response,
      portfolio: file,
      business_reviews: business_reviews
    })
  }

  async.series([
    getEstimateResponse,
    getFile,
    getBusinessReview,
    nowRender
  ])
}

exports.estimate_received_list = function (req, res, next) {

  var estimate_requests
  var user_business_platform = []
  var user_business_city = []

  function getUserBusiness(callback) {
    Model.UserBusiness.findById(req.session.user).exec(function (err, user_business) {

      for (i=0; i<user_business.platform.length; i++) {
        var obj = {}
        obj.platform = user_business.platform[i]
        user_business_platform.push(obj)
      }

      for (i=0; i<user_business.city.length; i++) {
        var obj = {}
        obj.city = user_business.city[i]
        user_business_city.push(obj)
      }

      callback()
    })
  }

  function getEstimateRequest(callback) {
    // Model.EstimateRequest.find({ $or: user_business_platform }, function (err, results) {
    //   estimate_requests = results
    //   callback()
    // }).populate('platform').populate('user_id')
    
    console.log(user_business_platform)
    console.log(user_business_city)

    Model.EstimateRequest.find({
      $and: [
        { $or: user_business_platform },
        { $or: user_business_city }
      ]
    }, function (err, results) {
      estimate_requests = results
      callback()
    }).populate('platform').populate('user_id')

  }

  function nowRender() {
    res.render('estimate_received_list', { 
      title: 'Estimate received list', 
      estimate_received_list: estimate_requests 
    })
  }
  
  async.series([
    getUserBusiness,
    getEstimateRequest,
    nowRender
  ])
}


exports.estimate_received_detail_get = function (req, res, next) {

  Model.EstimateRequest.findById(req.params.id)
  .populate('platform')
  .populate('business')
  .populate('goal')
  .populate('start_day')
  .populate('how_long')
  .populate('cost')
  .populate('city')
  .populate('feedback')
  .exec(function (err, results) {
    // console.log(results)
    res.render( 'estimate_received_detail', { title: 'Estimate for company', results: results} )
  })
}

exports.estimate_received_detail_post = function (req, res, next) {

  var estimate_response = new Model.EstimateResponse({
    estimate_request: req.params.id,
    user_id: req.session.user,
    item: req.body.item,
    cost: req.body.cost,
    note: req.body.note
  })

  console.log(estimate_response)
}

exports.estimate_sent_list = function (req, res, next) {

  Model.EstimateResponse.find({ 'user_id': req.session.user })
  .populate({
    path: 'estimate_request',
    populate: {
      path: 'platform'
    }
  })
  .exec(function (err, results) {
    res.render('estimate_sent_list', { title: 'Estimate sent', results: results })
  })
}

exports.estimate_sent_detail = function (req, res, next) {

  Model.EstimateResponse.findById(req.params.id)
  .populate({
    path: 'estimate_request',
    populate: {
      path: 'platform'
    }
  })
  .exec(function (err, results) {
    res.render('estimate_sent_detail', { title: 'Estimate sent detail', results: results })
  })
}

exports.estimate_request_create_get = function(req, res, next) {

  var estimate_items = []
  var platforms = []
  var businesses = []
  var goals = []
  var start_days = []
  var how_longs = []
  var costs = []
  var cities = []
  var feedbacks = []

  function getEstimateItem(callback) {
    Model.EstimateItem.find().exec(function (err, results) {
      estimate_items = results
      callback()
    })
  }

  function getPlatform(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[0] }).exec(function (err, results) {
      platforms = results
      callback()
    })
  }
  function getBusiness(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[1] }).exec(function (err, results) {
      businesses = results
      callback()
    })
  }
  function getGoal(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[2] }).exec(function (err, results) {
      goals = results
      callback()
    })
  }
  function getStartDay(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[3] }).exec(function (err, results) {
      start_days = results
      callback()
    })
  }
  function getHowLong(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[4] }).exec(function (err, results) {
      how_longs = results
      callback()
    })
  }
  function getCost(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[5] }).exec(function (err, results) {
      costs = results
      callback()
    })
  }
  function getCity(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[6] }).exec(function (err, results) {
      cities = results
      callback()
    })
  }
  function getFeedback(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[7] }).exec(function (err, results) {
      feedbacks = results
      callback()
    })
  }
  function nowRender() {
    res.render('estimate_request_form', { 
      title: 'Estimate form',
      platforms: platforms,
      businesses: businesses,
      goals: goals,
      start_days: start_days,
      how_longs: how_longs,
      costs: costs,
      cities: cities,
      feedbacks: feedbacks
    })
  }

  async.series([
    getEstimateItem,
    getPlatform, 
    getBusiness, 
    getGoal, 
    getStartDay,
    getHowLong,
    getCost,
    getCity,
    getFeedback,
    nowRender
  ], function (err, results) {
    if (err) { console.log(results) }
  })
}

exports.estimate_request_detail = function (req, res, next) {

  async.parallel({
    estimate_request: function (callback) {

      Model.EstimateRequest.findById(req.params.id)
      .populate('platform')
      .populate('business')
      .populate('goal')
      .populate('start_day')
      .populate('how_long')
      .populate('cost')
      .populate('city')
      .populate('feedback')
      .exec(callback)
    },
    estimate_responses: function (callback) {
      Model.EstimateResponse.find({ 'estimate_request': req.params.id }).populate('user_id').exec(callback)
    }
  }, function (err, results) {

    // console.log(results)
    
    if (err) { return next(err) }

    res.render('estimate_request_detail', { 
      title: 'Estimate', 
      estimate_request: results.estimate_request, 
      estimate_responses: results.estimate_responses,
    })
  })
}

exports.estimate_request_create_post = function (req, res, next) {
  var estimate = new Model.EstimateRequest({
    user_id: req.session.user,
    platform: req.body.platform,
    business: req.body.business,
    goal: req.body.goal,
    start_day: req.body.start_day,
    how_long: req.body.how_long,
    cost: req.body.cost,
    city: req.body.city,
    feedback: req.body.feedback
  })

  console.log(estimate)

  // estimate.save(function (err) {
  //   if (err) { return next(err) }
  //   res.render('success', { title: 'form submitted!' })
  // })
}


