const Model = require('../models/model')
const async = require('async')
const { default: xFrameOptions } = require('helmet/dist/middlewares/x-frame-options')


// Estimate-Request
exports.estimate_request_list = async (req, res, next) => {
  try {
    var estimate_requests = await Model.EstimateRequest.find({ 'user': req.user.id }).populate('topic').sort([[ 'reg_date', 'descending' ]])
    res.render('estimate_request_list', { title: '견적요청', estimate_requests: estimate_requests })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.estimate_request_create_get = async (req, res, next) => {
  try {
    if (!req.query.topic) {
      var topics = await Model.EstimateTopic.find()
      res.render('estimate_request_form', { title: '견적 요청하기', topics: topics })
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
      res.render('estimate_request_form', { title: '견적 요청하기', estimate_items: estimate_items })
    } 
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.estimate_request_create_post = async (req, res, next) => {
  try {
    // Except for some users that doesn't want to receive estimate requests
    var users = await Model.User.find({ online: false }, '_id')
    var topics = await Model.EstimateTopic.find()

    console.log(topics)

    if (req.query.topic===topics[1]._id.toString()) {
      if (!req.body.field1) {
        return res.send('필수값이 넘어오지 않았습니다.')
      }
    } 
    if (req.query.topic===topics[2]._id.toString()) {
      if (!req.body.field2 || !req.body.field3) {
        return res.send('필수값이 넘어오지 않았습니다.')
      }
    } 
    if (!req.body.field4 || !req.body.field5 || !req.body.field6 || !req.body.field7 || !req.body.field8 || !req.body.field9 || !req.body.field10) {
      return res.send('필수값이 넘어오지 않았습니다.')
    }
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
      drop: users,
      count: 0,
      reg_date: Date.now() + 32400000
    })

    await estimate.save()

    for (i=0; i<req.body.item.length; i++) {
      var estimate_text = new Model.EstimateText({
        estimate_result: estimate._id,
        item: req.body.item[i],
        detail: req.body.detail[i],
        text: req.body.text[i]
      })
      await estimate_text.save()
    }
    
    res.redirect('/estimate/request/' + estimate._id)
  } catch (error) {
    res.render('error', { error: error })
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

    var estimate_texts = await Model.EstimateText.find({ estimate_result: estimate_request._id })

    var x = 1
    while (x < 11) {
      var y = x++ 
      if (estimate_request[`field${y}`].length > 0) {
        for (estimate_text of estimate_texts) {
          if(estimate_request[`field${y}`][0]._id.toString()===estimate_text.detail.toString()) {
            estimate_request[`field${y}`][0].text_content = estimate_text.text
          }
        }
      }
    }

    var estimate_responses = await Model.EstimateResponse.find({ estimate_request: req.params.id }).populate('user')
    
    res.render('estimate_request_detail', { title: '견적서', estimate_request: estimate_request, estimate_responses: estimate_responses })
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Estimate-Received
exports.estimate_received_list = async (req, res, next) => {
  try {
    var estimate_requests = await Model.EstimateRequest.find().populate('topic').populate({ path: 'user', populate: { path: 'city' } }).sort([['reg_date', 'descending']])

    var last_estimate_response = await Model.EstimateResponse.findOne({ user: req.user.id }).sort([['reg_date', 'descending']])
    if (last_estimate_response) {
      var long = new Date() - last_estimate_response.reg_date
      if (long < 3600000) { // 1 hour
        var ms = 3600000 - long
        ms = Math.floor(ms/60000)
        var message = ms + ' 분 뒤에 견적서를 작성할 수 있습니다'
      }
    }

    var user_business = await Model.User.findById(req.user.id)

    for (estimate_request of estimate_requests) {
      //  Display valid estimate request to some user
      if  (user_business.platform.includes(estimate_request.topic._id) && estimate_request.count < 10 && !estimate_request.drop.includes(req.user.id) && estimate_request.reg_date > user_business.start_date ) {
        estimate_request.matched = true
      }
      // estimate request that is done
      var estimate_response = await Model.EstimateResponse.findOne({ estimate_request: estimate_request._id, user:req.user.id })
      if (estimate_response) {
        estimate_request.done = true
      }
      // New estimate 
      if (!estimate_request.views.includes(req.user.id)) {
        estimate_request.new = true
      }
    }

    res.render('estimate_received_list', { title: '받은 견적요청', estimate_received_list: estimate_requests, message: message })
  } catch (error) {
    res.render('error', { error: error })
  }
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
  
    var estimate_texts = await Model.EstimateText.find({ estimate_result: estimate_request._id })

    var x = 1
    while (x < 11) {
      var y = x++ 
      if (estimate_request[`field${y}`].length > 0) {
        for (estimate_text of estimate_texts) {
          if(estimate_request[`field${y}`][0]._id.toString()===estimate_text.detail.toString()) {
            estimate_request[`field${y}`][0].text_content = estimate_text.text
          }
        }
      }
    }

    // Add to views
    if (!estimate_request.views.includes(req.user.id)) {
      estimate_request.views.push(req.user.id)
      await estimate_request.save()
    }

    res.render('estimate_received_detail', { title: '견적서', estimate_request: estimate_request })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.estimate_received_detail_post = async (req, res, next) => {
  try {
    var estimate_response = new Model.EstimateResponse({
      estimate_request: req.params.id,
      user: req.user.id,
      item: req.body.item,
      cost: req.body.cost,
      note: req.body.note,
      submit: false,
      reg_date: Date.now() + 32400000
    })

    var estimate_request = await Model.EstimateRequest.findById({ _id: req.params.id }, 'count').exec()
    var count = estimate_request.count + 1

    await estimate_response.save()
    await Model.EstimateRequest.findByIdAndUpdate(req.params.id, { count: count })

    res.redirect('/estimate/sent/' + estimate_response._id)
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.estimate_received_delete = async (req, res, next) => {
  try {
    console.log(req.body.id)
    await Model.EstimateRequest.findByIdAndUpdate(req.body.id, { $push: { drop: req.user.id } })
    res.redirect('/estimate/received/list')
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Estimate-Sent
exports.estimate_sent_list = async (req, res, next) => {
  try {
    var estimate_responses = await Model.EstimateResponse.find({ user: req.user.id })
    .populate({ path: 'estimate_request', populate: [{ path: 'user', populate: { path: 'city' } }, { path: 'topic' }] })
    .exec()
    res.render('estimate_sent_list', { title: '보낸 견적', estimate_responses: estimate_responses })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.estimate_sent_detail_get = async (req, res, next) => {
  try {
    var estimate_response = await Model.EstimateResponse.findById(req.params.id)
    .populate('user').populate({ path: 'estimate_request', populate: [
      { path: 'user', populate: { path: 'city' } }, 
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

    var estimate_texts = await Model.EstimateText.find({ estimate_result: estimate_response.estimate_request._id })

    var x = 1
    while (x < 11) {
      var y = x++ 
      if (estimate_response.estimate_request[`field${y}`].length > 0) {
        for (estimate_text of estimate_texts) {
          if(estimate_response.estimate_request[`field${y}`][0]._id.toString()===estimate_text.detail.toString()) {
            estimate_response.estimate_request[`field${y}`][0].text_content = estimate_text.text
          }
        }
      }
    }

    res.render('estimate_sent_detail', { title: '보낸 견적', estimate_response: estimate_response })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.estimate_sent_detail_ajax = async (req, res, next) => {
  try {
    if (req.files) {
      var data = req.files.my_files
      var items = data instanceof Array ? data : [data]
      
      for (item of items) {
        var new_file_name = item.md5 + '.' + item.name.split('.').pop()
        upload_path = 'files/estimate/' + new_file_name
        item.mv(upload_path)

        var file = new Model.File({
          table: 'estimate',
          parent: req.body.id,
          name: item.name,
          md_name: new_file_name
        })
        await file.save()
      }
    }

    // Estimate response has been submitted 
    await Model.EstimateResponse.findByIdAndUpdate(req.body.id, { submit: true })
    res.send('ok')
  } catch (error) {
    console.log(error)
  }
}






