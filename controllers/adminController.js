/* For controller */
var Model = require('../models/model');


exports.index = async (req, res, next) => {
  res.render('admin/index', { title: 'Admin' });
}


exports.user_personal_list = async (req, res, next) => {
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
}
exports.user_personal_detail = async (req, res, next) => {
  var results = await Model.UserPersonal.findById(req.params.id).exec()
  res.render('admin/user_detail_personal', { title: 'User detail for personal', results: results })
}
exports.user_business_list = async (req, res, next) => {
  var user_businesses = await Model.UserBusiness.find().populate('city').populate('platform').exec()
  res.render('admin/user_list_business', { title: 'Business members', user_businesses: user_businesses })
  console.log(user_businesses)
}
exports.user_business_detail = async (req, res, next) => {
  var results = await Model.UserBusiness.findById(req.params.id).exec()
  res.render('admin/user_detail_business', { title: 'User detail for business', results: results })
}


exports.estimate_request_list = async (req, res, next) => {
  var estimate_requests = await Model.EstimateRequest.find().populate('platform').exec()
  res.render('admin/estimate_request_list', { title: 'Estimate requests', estimate_requests: estimate_requests })
}
exports.estimate_request_detail = async (req, res, next) => {
  var estimate_request = await Model.EstimateRequest.findById(req.params.id).populate('platform').populate('how_many').populate('business').populate('goal').populate('start_day').populate('how_long').populate('cost').populate('city').populate('feedback').exec()
  var estimate_responses = await Model.EstimateResponse.find({ 'estimate_request': req.params.id }).populate('user_id').exec()
  res.render('admin/estimate_request_detail', { title: 'Estimate', estimate_request: estimate_request, estimate_responses: estimate_responses })
}
exports.estimate_response_list = async (req, res, next) => {
  var estimate_responses = await Model.EstimateResponse.find()
  .populate('user_id')
  .populate({ path: 'estimate_request', populate: { path: 'city' } })
  .populate({ path: 'estimate_request', populate: { path: 'platform' } })
  .exec()
  res.render('admin/estimate_response_list', { title: 'Estimate responses', estimate_responses: estimate_responses })
}
exports.estimate_response_detail = async (req, res, next) => {
  var estimate_response = await Model.EstimateResponse.findById(req.params.id).exec()
  var portfolio = await Model.File.findOne({ 'parent': estimate_response.user_id }).exec()
  var business_reviews = await Model.BusinessReview.find({ 'user_business': estimate_response.user_id }).exec()
  res.render('admin/estimate_response_detail', { title: 'Estimate Response', estimate_response: estimate_response, portfolio: portfolio, business_reviews: business_reviews })
}


exports.notice_list = async (req, res, next) => {
  var notice_list = await Model.Notice.find().exec()
  res.render('admin/blog_list', { title: 'Notice list', blog_list: notice_list, url: 'notice' })
}
exports.notice_create_get = async (req, res, next) => {
  res.render('admin/blog_form', { title: 'Notice create', url: 'notice' })
}
exports.notice_create_post = async (req, res, next) => {
  var notice = new Model.Notice({
    title: req.body.title,
    content: req.body.content
  })
  notice.save()
  var message = 'A notice is successfully posted'
  res.redirect('/admin/success/?message=' + message)

  console.log('foo bar')
}
exports.notice_detail = async (req, res, next) => {
  var notice_detail = await Model.Notice.findById(req.params.id).exec()
  res.render('admin/blog_detail', { title: 'Notice detail', blog_detail: notice_detail, url: 'notice' })
}
exports.notice_update_get = async (req, res, next) => {
  var notice_detail = await Model.Notice.findById(req.params.id).exec()
  res.render('admin/blog_form', { title: 'Notice update', blog_detail: notice_detail, url: 'notice' })
}
exports.notice_update_post = async (req, res, next) => {
  var notice_detail = new Model.Notice({
    title: req.body.title,
    content: req.body.content,
    _id: req.params.id
  })
  await Model.Notice.findByIdAndUpdate(req.params.id, notice_detail)
  var message = 'A notice is successfully updated'
  res.redirect('/admin/success/?message=' + message)
}


exports.event_list = async (req, res, next) => {
  var event_list = await Model.Event.find().exec()
  res.render('admin/blog_list', { title: 'Event list', blog_list: event_list, url: 'event' })
}
exports.event_create_get = async (req, res, next) => {
  res.render('admin/blog_form', { title: 'Event create', url: 'event' })
}
exports.event_create_post = async (req, res, next) => {
  var event = new Model.Event({
    title: req.body.title,
    content: req.body.content
  })
  event.save()
  var message = 'A event is successfully posted'
  res.redirect('/admin/success/?message=' + message)
}
exports.event_detail = async (req, res, next) => {
  var event_detail = await Model.Event.findById(req.params.id).exec()
  res.render('admin/blog_detail', { title: 'Event detail', blog_detail: event_detail, url: 'event' })
}
exports.event_update_get = async (req, res, next) => {
  var event_detail = await Model.Event.findById(req.params.id).exec()
  res.render('admin/blog_form', { title: 'Event update', blog_detail: event_detail, url: 'event' })
}
exports.event_update_post = async (req, res, next) => {
  var event_detail = new Model.Event({
    title: req.body.title,
    content: req.body.content,
    _id: req.params.id
  })
  await Model.Event.findByIdAndUpdate(req.params.id, event_detail)
  var message = 'A event is successfully updated'
  res.redirect('/admin/success/?message=' + message)
}


exports.faq_list = async (req, res, next) => {
  var faq_list = await Model.Faq.find().exec()
  res.render('admin/blog_list', { title: 'Faq list', blog_list: faq_list, url: 'faq' })
}
exports.faq_create_get = async (req, res, next) => {
  res.render('admin/blog_form', { title: 'Faq create', url: 'faq' })
}
exports.faq_create_post = async (req, res, next) => {
  var faq = new Model.Faq({
    title: req.body.title,
    content: req.body.content,
    account: req.body.account
  })
  faq.save()
  var message = 'A faq is successfully posted'
  res.redirect('/admin/success/?message=' + message)
}
exports.faq_detail = async (req, res, next) => {
  var faq_detail = await Model.Faq.findById(req.params.id).exec()
  res.render('admin/blog_detail', { title: 'Faq detail', blog_detail: faq_detail, url: 'faq' })
}
exports.faq_update_get = async (req, res, next) => {
  var faq_detail = await Model.Faq.findById(req.params.id).exec()
  res.render('admin/blog_form', { title: 'Faq update', blog_detail: faq_detail, url: 'faq' })
}
exports.faq_update_post = async (req, res, next) => {
  var faq_detail = new Model.Faq({
    title: req.body.title,
    content: req.body.content,
    account: req.body.account,
    _id: req.params.id
  })
  await Model.Faq.findByIdAndUpdate(req.params.id, faq_detail)
  var message = 'A faq is successfully updated'
  res.redirect('/admin/success/?message=' + message)
}

exports.qna_list = async (req, res, next) => {
  var qna_list = await Model.QnaQuestion.find().exec()
  res.render('admin/blog_list', { title: 'Qna list', blog_list: qna_list, url: 'qna' })
}

exports.qna_detail_get = async (req, res, next) => {
  var qna_question = await Model.QnaQuestion.findById(req.params.id).exec()
  var qna_answer = await Model.QnaAnswer.findOne({ parent: req.params.id }).exec()
  res.render('admin/blog_detail', { title: 'Qna detail', blog_detail: qna_question, blog_comment: qna_answer, url: 'qna' })
}

exports.qna_detail_post = async (req, res, next) => {
  var qna_detail = new Model.QnaAnswer({
    parent: req.params.id,
    content: req.body.content
  })
  qna_detail.save()
  var message = 'An answer is successfully posted'
  res.redirect('/admin/success/?message=' + message)
}

exports.message_list = async (req, res, next) => {
  var message_list = await Model.Message.find().exec()
  res.render('admin/blog_list', { title: 'Message list', blog_list: message_list, url: 'message' })
}

exports.message_detail = async (req, res, next) => {
  var message_detail = await Model.Message.findById(req.params.id).exec()
  res.render('admin/blog_detail', { title: 'Message detail', blog_detail: message_detail, url: 'message' })
}

exports.success = async (req, res, next) => {
  res.render('admin/success', { title: req.query.message })
}
