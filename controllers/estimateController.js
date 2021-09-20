var Model = require('../models/model')
var async = require('async')


exports.estimate_request_list = function (req, res, next) {
  Model.EstimateRequest.find({ 'user_id': req.session.user }).populate('platform').exec(function (err, results) {
    console.log(results)
    res.render('estimate_request_list', { title: 'Estimate Requests', estimate_requests: results })
  })
}

exports.estimate_response_detail = function (req, res, next) {
  Model.EstimateResponse.findById(req.params.id).exec(function (err, estimate_response) {
    async.parallel({
      portfolio: function (callback) {
        Model.File.findOne({ parent: estimate_response.user_id }).exec(callback)
      },
      business_reviews: function (callback) {
        Model.BusinessReview.find({ user_business: estimate_response.user_id }).exec(callback)
      }
    }, function (err, results) {
      res.render('estimate_response_detail', { 
        title: 'Estimate Response', 
        estimate_response: estimate_response,
        portfolio: results.portfolio,
        business_reviews: results.business_reviews
      })
    })
  })
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
  Model.EstimateRequest.findById(req.params.id).populate('platform').populate('business').populate('goal').populate('start_day').populate('how_long').populate('cost').populate('city').populate('feedback').exec(function (err, results) {
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
  Model.EstimateResponse.find({ user_id: req.session.user })
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
  Model.EstimateItem.find().exec(function (err, estimate_items) {
    async.parallel({
      platforms: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec(callback)
      },
      businesses: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[1]._id }).exec(callback)
      },
      goals: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[2]._id }).exec(callback)
      },
      start_days: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[3]._id }).exec(callback)
      },
      how_longs: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[4]._id }).exec(callback)
      },
      costs: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[5]._id }).exec(callback)
      },
      cities: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[6]._id }).exec(callback)
      },
      feedbacks: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec(callback)
      },
    }, function (err, results) {
      res.render('estimate_request_form', { 
        title: 'Estimate form',
        platforms: results.platforms,
        businesses: results.businesses,
        goals: results.goals,
        start_days: results.start_days,
        how_longs: results.how_longs,
        costs: results.costs,
        cities: results.cities,
        feedbacks: results.feedbacks
      })
    })
  })
}

exports.estimate_request_detail = function (req, res, next) {
  async.parallel({
    estimate_request: function (callback) {
      Model.EstimateRequest.findById(req.params.id).populate('platform').populate('business').populate('goal').populate('start_day').populate('how_long').populate('cost').populate('city').populate('feedback').exec(callback)
    },
    estimate_responses: function (callback) {
      Model.EstimateResponse.find({ estimate_request: req.params.id }).populate('user_id').exec(callback)
    }
  }, function (err, results) {
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
}


