var express = require('express');
var router = express.Router();
var async = require('async');

/* For controller */
var Model = require('../models/model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin' });
});

router.get('/user/personal/list', function (req, res, next) {
  Model.UserPersonal.find().exec(function (err, results) {
    res.render('admin/user_list_personal', { title: 'Personal members', user_personals: results })
  })
})

router.get('/user/personal/:id', function (req, res, next) {
  Model.UserPersonal.findById(req.params.id).exec(function (err, results) {
    res.render('admin/user_detail_personal', { title: 'User detail for personal', results: results })
  })
})

router.get('/user/business/list', function (req, res, next) {
  Model.UserBusiness.find().exec(function (err, results) {
    res.render('admin/user_list_business', { title: 'Business members', user_businesses: results })
  })
})

router.get('/user/business/:id', function (req, res, next) {
  Model.UserBusiness.findById(req.params.id).exec(function (err, results) {
    res.render('admin/user_detail_business', { title: 'User detail for business', results: results })
  })
})

router.get('/estimate/request/list', function (req, res, next) {
  var estimate_requests_with_count = []
  function countEstimateResponse(estimate_request, estimate_requests_length) {
    Model.EstimateResponse.countDocuments({ estimate_request: estimate_request._id }, function (err, count) {
      estimate_request.count = count
      estimate_requests_with_count.push(estimate_request)
      if (estimate_requests_with_count.length===estimate_requests_length) {
        res.render('admin/estimate_request_list', { title: '', estimate_requests: estimate_requests_with_count })
      }
    })
  }
  Model.EstimateRequest.find().populate('platform').exec(function (err, estimate_requests) {
    for (estimate_request of estimate_requests) {
      countEstimateResponse(estimate_request, estimate_requests.length)
    }
  })
})

router.get('/estimate/request/:id', function (req, res, next) {
  async.parallel({
    estimate_request: function (callback) {
      Model.EstimateRequest.findById(req.params.id).populate('platform').populate('business').populate('goal').populate('start_day').populate('how_long').populate('cost').populate('city').populate('feedback').exec(callback)
    },
    estimate_responses: function (callback) {
      Model.EstimateResponse.find({ 'estimate_request': req.params.id }).populate('user_id').exec(callback)
    }
  }, function (err, results) {
    if (err) { return next(err) }
    res.render('admin/estimate_request_detail', { 
      title: 'Estimate', 
      estimate_request: results.estimate_request, 
      estimate_responses: results.estimate_responses,
    })
  })
})

router.get('/estimate/response/:id', function (req, res, next) {
  Model.EstimateResponse.findById(req.params.id).exec(function (err, estimate_response) {
    async.parallel({
      portfolio: function (callback) {
        Model.File.findOne({ 'parent': estimate_response.user_id }).exec(callback)
      },
      business_reviews: function (callback) {
        Model.BusinessReview.find({ 'user_business': estimate_response.user_id }).exec(callback)
      }
    }, function (err, results) {
      res.render('admin/estimate_response_detail', { 
        title: 'Estimate Response', estimate_response: estimate_response, portfolio: results.portfolio, business_reviews: results.business_reviews
      })
    })
  })
})


module.exports = router;
