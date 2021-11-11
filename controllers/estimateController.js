const Model = require('../models/model')
const async = require('async')


exports.estimate_request_list = async (req, res, next) => {
  try {
    var estimate_requests = await Model.EstimateRequest.find({ 'user': req.user.id }).populate('topic')
    res.render('estimate_request_list', { title: '견적요청', estimate_requests: estimate_requests })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.estimate_response_detail_get = async (req, res, next) => {
  try {
    var estimate_response = await Model.EstimateResponse.findById(req.params.id).populate('user').exec() 
    var portfolio = await Model.File.findOne({ parent: estimate_response.user }).sort([[ 'reg_date', 'descending' ]]).exec()
    var business_reviews = await Model.Review.find({ user_business: estimate_response.user }).exec()
    res.render('estimate_response_detail', { title: '견적서', estimate_response: estimate_response, portfolio: portfolio, business_reviews: business_reviews })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.estimate_response_detail_post = async (req, res, next) => {
  try {
    var review = new Model.Review({
      user_personal: req.user.id,
      user_business: req.body.user_business,
      rating: req.body.rating,
      content: req.body.content,
    })
    await review.save()

    res.redirect('/estimate/response/' + req.params.id)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.estimate_received_list = async (req, res, next) => {
  try {
    var user_business = await Model.User.findById(req.user.id).exec() 
    var user_business_platform = []

    for (i=0; i<user_business.platform.length; i++) {
      var obj = {}
      obj.platform = user_business.platform[i]
      user_business_platform.push(obj)
    }

    var estimate_requests = await Model.EstimateRequest.find({
      $and: [
        { $or: user_business_platform },
        { count: { $lte: 9 } }
      ] 
      })
      .populate('platform').populate('user')

    for (estimate_request of estimate_requests) {
      estimate_request.sent = await Model.EstimateResponse.countDocuments({ 
        $and: [
          { estimate_request: estimate_request._id }, 
          { user: req.user.id }
        ] 
      }).exec()
    }

    var last_estimate_response = await Model.EstimateResponse.findOne({ user: req.user.id }).sort([['reg_date', 'descending']])
    console.log(last_estimate_response)
    if (last_estimate_response) {
      var long = new Date() - last_estimate_response.reg_date
      if (long < 1000*60*60) {
        var ms = 1000*60*60 - long
        ms = Math.floor(ms/60000)
        var message = ms + ' 분 뒤에 견적서를 작성할 수 있습니다'
      }
    }
    res.render('estimate_received_list', { title: '받은 견적', estimate_received_list: estimate_requests, message: message })

  } catch (error) {
  res.render('error', { message: '', error: error })
  }
}

exports.estimate_received_list = async (req, res, next) => {
  var estimate_requests = await Model.EstimateRequest.find().populate('topic').populate('user')


  var last_estimate_response = await Model.EstimateResponse.findOne({ user: req.user.id }).sort([['reg_date', 'descending']])
  console.log(last_estimate_response)
  if (last_estimate_response) {
    var long = new Date() - last_estimate_response.reg_date
    if (long < 1000*60*60) {
      var ms = 1000*60*60 - long
      ms = Math.floor(ms/60000)
      var message = ms + ' 분 뒤에 견적서를 작성할 수 있습니다'
    }
  }

  res.render('estimate_received_list', { title: '', estimate_received_list: estimate_requests, message: message })
}

exports.estimate_received_detail_get = async (req, res, next) => {
  try {
    var estimate_request = await Model.EstimateRequest.findById(req.params.id)
    .populate([ 
      { path: 'field1', populate: 'item' }, 
      { path: 'field2', populate: 'item' }, 
      { path: 'field3', populate: 'item' }, 
      { path: 'field4', populate: 'item' }, 
      { path: 'field5', populate: 'item' }, 
      { path: 'field6', populate: 'item' }, 
      { path: 'field7', populate: 'item' }, 
      { path: 'field8', populate: 'item' }, 
      { path: 'field9', populate: 'item' }, 
      { path: 'field10', populate: 'item' }, 
      { path: 'topic' }
    ])
  
    var estimate_text = await Model.EstimateText.find({ estimate_result: req.params.id })
    console.log(estimate_text)
  
    estimate_request.estimate_text = estimate_text

    res.render('estimate_received_detail', { title: '견적서', estimate_request: estimate_request })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.estimate_received_detail_post = async (req, res, next) => {
  try {
    var estimate_response = new Model.EstimateResponse({
      estimate_request: req.params.id,
      user: req.user.id,
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
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.estimate_sent_list = async (req, res, next) => {
  try {
    var estimate_responses = await Model.EstimateResponse.find({ user: req.user.id })
    .populate({ path: 'estimate_request', populate: [{ path: 'user' }, { path: 'topic' }] })
    .exec()
    res.render('estimate_sent_list', { title: '보낸 견적', estimate_responses: estimate_responses })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.estimate_sent_detail = async (req, res, next) => {
  try {
    var estimate_response = await Model.EstimateResponse.findById(req.params.id)
    .populate('user').populate({ path: 'estimate_request', populate: [
      { path: 'user' }, 
      { path: 'field1', populate: 'item' }, 
      { path: 'field2', populate: 'item' }, 
      { path: 'field3', populate: 'item' }, 
      { path: 'field4', populate: 'item' }, 
      { path: 'field5', populate: 'item' }, 
      { path: 'field6', populate: 'item' }, 
      { path: 'field7', populate: 'item' }, 
      { path: 'field8', populate: 'item' }, 
      { path: 'field9', populate: 'item' }, 
      { path: 'field10', populate: 'item' }, 
      { path: 'topic' }
    ]})

    var estimate_text = await Model.EstimateText.find({ estimate_result: estimate_response.estimate_request._id })
    console.log(estimate_text)
  
    estimate_response.estimate_request.estimate_text = estimate_text

    res.render('estimate_sent_detail', { title: '보낸 견적', estimate_response: estimate_response })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.estimate_request_create_get = async (req, res, next) => {
  try {
    if (!req.query.topic) {
      var topics = await Model.EstimateTopic.find()
      res.render('estimate_request_form', { title: 'Choose topic', topics: topics })
    }

    if (req.query.topic) {
      var estimate_items = await Model.EstimateItem.find({ 
        $or: [{ topic: null } , { topic: req.query.topic }]
      })
  
      var item_details = await Model.EstimateItemDetail.find()
  
      for (estimate_item of estimate_items) {
        estimate_item.details = []
        for (item_detail of item_details) {
          if (estimate_item._id==item_detail.item.toString()) {
            estimate_item.details.push(item_detail)
          }
        }
      }
      res.render('estimate_request_form', { title: 'Estimate form', estimate_items: estimate_items })
    } 
  } catch (error) {
    console.log(error)
  }
}

exports.estimate_request_detail = async (req, res, next) => {
  try {
    var estimate_request = await Model.EstimateRequest.findById(req.params.id)
    .populate([ 
      { path: 'field1', populate: 'item' }, 
      { path: 'field2', populate: 'item' }, 
      { path: 'field3', populate: 'item' }, 
      { path: 'field4', populate: 'item' }, 
      { path: 'field5', populate: 'item' }, 
      { path: 'field6', populate: 'item' }, 
      { path: 'field7', populate: 'item' }, 
      { path: 'field8', populate: 'item' }, 
      { path: 'field9', populate: 'item' }, 
      { path: 'field10', populate: 'item' }, 
      { path: 'topic' }
    ])
  
    var estimate_text = await Model.EstimateText.find({ estimate_result: req.params.id })
    console.log(estimate_text)
  
    estimate_request.estimate_text = estimate_text

    var estimate_responses = await Model.EstimateResponse.find({ estimate_request: req.params.id }).populate('user').exec()

    res.render('estimate_request_detail', { title: '견적서', estimate_request: estimate_request, estimate_responses: estimate_responses, })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.estimate_request_create_post = async (req, res, next) => {
  try {
    var estimate = new Model.EstimateRequest({
      user: req.user.id,
      topic: req.query.topic,
      field1: req.body.field1,
      field2: req.body.field2,
      field3: req.body.field3,
      field4: req.body.field4,
      field5: req.body.field5,
      field6: req.body.field6,
      field7: req.body.field7,
      field8: req.body.field8,
      field9: req.body.field9,
      field10: req.body.field10,
      content: req.body.content,
      count: 0,
    })

    // return console.log(estimate)

    estimate.save()

    var estimate_text = new Model.EstimateText({
      estimate_result: estimate._id,
      item: req.body.item,
      text: req.body.text
    })

    await estimate_text.save()

    var message = '견젹서 전송이 완료되었습니다'
    var url = '/estimate/request/list'
    res.redirect(`/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}


