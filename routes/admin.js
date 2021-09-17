var express = require('express');
var router = express.Router();
var async = require('async');

/* For controller */
var Model = require('../models/model');
const { Mongoose } = require('mongoose');

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

  var estimate_requests;

  function doSomething(callback) {
    Model.EstimateRequest.find().exec(function (err, results) {
      estimate_requests = results
      callback()
    })
  }

  function doSomethingElse(callback) {
    for (i=0; i<estimate_requests.length; i++) {
      Model.EstimateResponse.countDocuments({ 'estimate_request': estimate_requests[i]._id }, function (err, results) {
        estimate_requests[i].count = results
        if (i == 3) {
          callback()
        }
      })
    }
  }

  function nowRender() {
    res.render('admin/estimate_request_list', { title: 'Estimate List', estimate_requests: estimate_requests })
  }    

  async.series([
    doSomething, doSomethingElse, nowRender
  ])

})

router.get('/estimate/request/:id', function (req, res, next) {

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

    res.render('admin/estimate_request_detail', { 
      title: 'Estimate', 
      estimate_request: results.estimate_request, 
      estimate_responses: results.estimate_responses,
    })
  })
})


router.get('/estimate/response/:id', function (req, res, next) {

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
    res.render('admin/estimate_response_detail', { 
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
})


module.exports = router;
