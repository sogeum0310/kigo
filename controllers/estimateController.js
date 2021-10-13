const Model = require('../models/model')
const async = require('async')


exports.estimate_request_list = async (req, res, next) => {
  var estimate_requests = await Model.EstimateRequest.find({ 'user': req.session.user._id }).populate('platform').exec()
  res.render('estimate_request_list', { title: '견적요청', estimate_requests: estimate_requests })
}

exports.estimate_response_detail_get = async (req, res, next) => {
  var estimate_response = await Model.EstimateResponse.findById(req.params.id).populate('user').exec() 
  var portfolio = await Model.File.findOne({ parent: estimate_response.user }).exec()
  var business_reviews = await Model.Review.find({ user_business: estimate_response.user }).exec()
  res.render('estimate_response_detail', { title: '견적서', estimate_response: estimate_response, portfolio: portfolio, business_reviews: business_reviews })
}

exports.estimate_response_detail_post = async (req, res, next) => {

  var review = new Model.Review({
    user_personal: req.session.user._id,
    user_business: req.body.user_business._id,
    rating: req.body.rating,
    content: req.body.content,
  })
  await review.save()

  res.redirect('/estimate/response/' + req.params.id)
}

exports.estimate_received_list = async (req, res, next) => {
  var user_business = await Model.User.findById(req.session.user._id).exec() 
  var user_business_platform = []
  var user_business_city = []

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

  var estimate_requests = await Model.EstimateRequest.find({
     $and: [
       { $or: user_business_platform },
       { $or: user_business_city },
       { count: { $lte: 9 } }
     ] 
    })
    .populate('platform').populate('user')

  for (estimate_request of estimate_requests) {
    estimate_request.sent = await Model.EstimateResponse.countDocuments({ 
      $and: [
        { estimate_request: estimate_request._id }, 
        { user: req.session.user._id }
      ] 
    }).exec()
  }

  var last_estimate_response = await Model.EstimateResponse.findOne({ user: req.session.user._id }).sort([['reg_date', 'descending']])
  if (new Date() - last_estimate_response.reg_date < 1000*60*60) {
    var message = 1000*60*60 - (new Date() - something.reg_date) + ' 분 뒤에 견적서를 작성할 수 있습니다'
  }

  res.render('estimate_received_list', { title: '받은 견적', estimate_received_list: estimate_requests, message: message })
}

exports.estimate_received_detail_get = async (req, res, next) => {
  var estimate_request = await Model.EstimateRequest.findById(req.params.id).populate('platform').populate('how_many').populate('business').populate('goal').populate('start_day').populate('how_long').populate('cost').populate('city').populate('feedback').exec() 
  res.render( 'estimate_received_detail', { title: '받은 견적', results: estimate_request} )
}

exports.estimate_received_detail_post = async (req, res, next) => {
  var estimate_response = new Model.EstimateResponse({
    estimate_request: req.params.id,
    user: req.session.user._id,
    item: req.body.item,
    cost: req.body.cost,
    note: req.body.note
  })

  var estimate_request = await Model.EstimateRequest.findById({ _id: req.params.id }, 'count').exec()
  var count = estimate_request.count + 1

  await estimate_response.save()
  await Model.EstimateRequest.findByIdAndUpdate(req.params.id, { count: count })

  var message = '견적서 전송이 완료되었습니다'
  var url = '/estimate/send/list'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

exports.estimate_sent_list = async (req, res, next) => {
  var estimate_responses = await Model.EstimateResponse.find({ user: req.session.user._id })
  .populate({ path: 'estimate_request', populate: { path: 'user' } })
  .populate({ path: 'estimate_request', populate: { path: 'platform' } })
  .exec()
  res.render('estimate_sent_list', { title: '보낸 견적', estimate_responses: estimate_responses })
}

exports.estimate_sent_detail = async (req, res, next) => {
  var estimate_response = await Model.EstimateResponse.findById(req.params.id)
  .populate({ 
    path: 'estimate_request', populate: [
      { path: 'platform' }, 
      { path: 'how_many' }, 
      { path: 'business' }, 
      { path: 'goal' }, 
      { path: 'start_day' }, 
      { path: 'how_long' }, 
      { path: 'cost' }, 
      { path: 'city' }, 
      { path: 'feedback' }, 
      { path: 'user' }
    ]
  }) 
  res.render('estimate_sent_detail', { title: '보낸 견적', estimate_response: estimate_response })
}

exports.estimate_request_create_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  var how_manys = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[1]._id }).exec()
  var businesses = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[2]._id }).exec()
  var goals = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[3]._id }).exec()
  var start_days = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[4]._id }).exec()
  var how_longs = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[5]._id }).exec()
  var costs = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[6]._id }).exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var feedbacks = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[8]._id }).exec()
  
  res.render('estimate_request_form', { 
    title: 'Estimate form',
    estimate_items: estimate_items,
    platforms: platforms,
    businesses: businesses,
    goals: goals,
    start_days: start_days,
    how_longs: how_longs,
    costs: costs,
    cities: cities,
    feedbacks: feedbacks,
    how_manys: how_manys
  })
}

exports.estimate_request_detail = async (req, res, next) => {
  var estimate_request = await Model.EstimateRequest.findById(req.params.id).populate('platform').populate('how_many').populate('business').populate('goal').populate('start_day').populate('how_long').populate('cost').populate('city').populate('feedback').exec()
  var estimate_responses = await Model.EstimateResponse.find({ estimate_request: req.params.id }).populate('user').exec()
  res.render('estimate_request_detail', { title: '견적서', estimate_request: estimate_request, estimate_responses: estimate_responses, })
}

exports.estimate_request_create_post = async (req, res, next) => {
  var estimate = new Model.EstimateRequest({
    user: req.session.user._id,
    platform: req.body.platform,
    how_many: req.body.how_many,
    business: req.body.business,
    goal: req.body.goal,
    start_day: req.body.start_day,
    how_long: req.body.how_long,
    cost: req.body.cost,
    city: req.body.city,
    feedback: req.body.feedback,
    count: 0,
  })
  console.log(estimate)

  estimate.save()

  var message = '견젹서 전송이 완료되었습니다'
  var url = '/estimate/request/list'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}


