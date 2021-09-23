var express = require('express');
var router = express.Router();
var async = require('async');

/* For controller */
var Model = require('../models/model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin' });
});

router.get('/user/personal/list', (req, res, next) => {
  
  // var user_personals = Promise.resolve(Model.UserPersonal.find().exec())

  // var user_personals = new Promise(function (resolve) {
  //   Model.UserPersonal.find().exec(function (err, results) {
  //     resolve(results)
  //   })
  // })

  var user_personals = Model.UserPersonal.find().exec()
  console.log(user_personals)

  user_personals.then(function (user_personals) {
    console.log(user_personals)
    res.render('admin/user_list_personal', { title: '', user_personals: user_personals })
  })

})

router.get('/user/personal/:id', async (req, res, next) => {
  var results = await Model.UserPersonal.findById(req.params.id).exec()
  res.render('admin/user_detail_personal', { title: 'User detail for personal', results: results })
})

router.get('/user/business/list', async (req, res, next) => {
  var user_businesses = await Model.UserBusiness.find().populate('city').populate('platform').exec()
  res.render('admin/user_list_business', { title: 'Business members', user_businesses: user_businesses })
  console.log(user_businesses)
})

router.get('/user/business/:id', async (req, res, next) => {
  var results = await Model.UserBusiness.findById(req.params.id).exec()
  res.render('admin/user_detail_business', { title: 'User detail for business', results: results })
})

router.get('/estimate/request/list', async (req, res, next) => {
  var estimate_requests_with_count = []
  async function countEstimateResponse(estimate_request, estimate_requests_length) {
    estimate_request.count = await Model.EstimateResponse.countDocuments({ estimate_request: estimate_request._id })
    estimate_requests_with_count.push(estimate_request)
    if (estimate_requests_with_count.length===estimate_requests_length) {
      res.render('admin/estimate_request_list', { title: 'Estimate requests', estimate_requests: estimate_requests_with_count })
    }
  }
  var estimate_requests = await Model.EstimateRequest.find().populate('platform').populate('city').exec()
  for (estimate_request of estimate_requests) {
    countEstimateResponse(estimate_request, estimate_requests.length)
  }
})

router.get('/estimate/request/:id', async (req, res, next) => {
  var estimate_request = await Model.EstimateRequest.findById(req.params.id).populate('platform').populate('business').populate('goal').populate('start_day').populate('how_long').populate('cost').populate('city').populate('feedback').exec()
  var estimate_responses = await Model.EstimateResponse.find({ 'estimate_request': req.params.id }).populate('user_id').exec()
  res.render('admin/estimate_request_detail', { title: 'Estimate', estimate_request: estimate_request, estimate_responses: estimate_responses })
})

router.get('/estimate/response/list', async (req, res, next) => {
  var estimate_responses = await Model.EstimateResponse.find()
  .populate('user_id')
  .populate({ path: 'estimate_request', populate: { path: 'city' } })
  .populate({ path: 'estimate_request', populate: { path: 'platform' } })
  .exec()
  res.render('admin/estimate_response_list', { title: 'Estimate responses', estimate_responses: estimate_responses })
})

router.get('/estimate/response/:id', async (req, res, next) => {
  var estimate_response = await Model.EstimateResponse.findById(req.params.id).exec()
  var portfolio = await Model.File.findOne({ 'parent': estimate_response.user_id }).exec()
  var business_reviews = await Model.BusinessReview.find({ 'user_business': estimate_response.user_id }).exec()
  res.render('admin/estimate_response_detail', { title: 'Estimate Response', estimate_response: estimate_response, portfolio: portfolio, business_reviews: business_reviews })
})


module.exports = router;
