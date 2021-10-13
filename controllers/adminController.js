/* For controller */
const Model = require('../models/model');


exports.login_get = async (req, res, next) => {
  if (req.session.admin) {
    next()
  } else {
    res.render('admin/login', { title: '관리자 로그인' })
  }
}

exports.login_post = async (req, res, next) => {
  if (req.body.admin==='admin') {
    req.session.admin = 'admin'
    res.redirect('/admin')
  } else {
    res.send('something is wrong')
  }
}

exports.mypage = async (req, res, next) => {
  res.render('admin/mypage', { title: '관리자 정보' })
}

exports.logout = async (req, res, next) => {
  // req.session.destroy()
  res.redirect('/admin')
}

exports.index = async (req, res, next) => {
  res.render('admin/index', { title: '관리자' });
}

exports.user_personal_list = async (req, res, next) => {
  // var user_personals = Promise.resolve(Model.UserPersonal.find().exec())

  // var user_personals = new Promise(function (resolve) {
  //   Model.UserPersonal.find().exec(function (err, results) {
  //     resolve(results)
  //   })
  // })
  var user_personals = Model.User.find({ account: 'personal' }).populate('city').exec()
  console.log(user_personals)
  user_personals.then(function (user_personals) {
    console.log(user_personals)
    res.render('admin/user_list', { title: '일반사용자', users: user_personals })
  })
}

exports.user_business_list = async (req, res, next) => {
  var user_businesses = await Model.User.find({ account: 'business' }).populate('city').populate('platform').exec()
  res.render('admin/user_list', { title: '광고업체', users: user_businesses })
  console.log(user_businesses)
}

exports.user_detail_get = async (req, res, next) => {
  var user = await Model.User.findById(req.params.id).populate('city').populate('platform').exec()
  user.file = await Model.File.findOne({ parent: req.params.id }).exec()
  user.reviews = await Model.Review.find({ user_business: req.params.id }).exec()
  res.render('admin/user_detail', { title: '회원 정보', user: user })
}

exports.user_detail_post = async (req, res, next) => {
  await Model.User.findByIdAndUpdate(req.params.id, { auth: 1 })
  res.redirect('/admin/user/detail/' + req.params.id)
}

exports.estimate_request_list = async (req, res, next) => {
  var estimate_requests = await Model.EstimateRequest.find().populate('platform').exec()
  res.render('admin/estimate_request_list', { title: '일반사용자 견적서', estimate_requests: estimate_requests })
}
exports.estimate_request_detail = async (req, res, next) => {
  var estimate_request = await Model.EstimateRequest.findById(req.params.id).populate('platform').populate('how_many').populate('business').populate('goal').populate('start_day').populate('how_long').populate('cost').populate('city').populate('feedback').exec()
  var estimate_responses = await Model.EstimateResponse.find({ 'estimate_request': req.params.id }).populate('user').exec()
  res.render('admin/estimate_request_detail', { title: '일반사용자 견적서', estimate_request: estimate_request, estimate_responses: estimate_responses })
}
exports.estimate_response_list = async (req, res, next) => {
  var estimate_responses = await Model.EstimateResponse.find()
  .populate('user')
  .populate({ path: 'estimate_request', populate: { path: 'city' } })
  .populate({ path: 'estimate_request', populate: { path: 'platform' } })
  .exec()
  res.render('admin/estimate_response_list', { title: '광고업체 견적서', estimate_responses: estimate_responses })
}
exports.estimate_response_detail = async (req, res, next) => {
  var estimate_response = await Model.EstimateResponse.findById(req.params.id).exec()
  res.render('admin/estimate_response_detail', { title: '광고업체 견적서', estimate_response: estimate_response })
}


exports.notice_list = async (req, res, next) => {
  var notice_list = await Model.Notice.find().exec()
  res.render('admin/blog_list', { title: '공지사항', blog_list: notice_list, url: 'notice' })
}
exports.notice_create_get = async (req, res, next) => {
  res.render('admin/blog_form', { title: '공지사항', url: 'notice' })
}
exports.notice_create_post = async (req, res, next) => {
  var notice = new Model.Notice({
    title: req.body.title,
    content: req.body.content
  })
  notice.save()
  // var message = 'A notice is successfully posted'
  // res.redirect('/admin/success/?message=' + message)
}
exports.notice_detail = async (req, res, next) => {
  var notice_detail = await Model.Notice.findById(req.params.id).exec()
  res.render('admin/blog_detail', { title: '공지사항', blog_detail: notice_detail, url: 'notice' })
}
exports.notice_update_get = async (req, res, next) => {
  var notice_detail = await Model.Notice.findById(req.params.id).exec()
  res.render('admin/blog_form', { title: '공지사항', blog_detail: notice_detail, url: 'notice' })
}
exports.notice_update_post = async (req, res, next) => {
  var notice_detail = new Model.Notice({
    title: req.body.title,
    content: req.body.content,
    _id: req.params.id
  })
  await Model.Notice.findByIdAndUpdate(req.params.id, notice_detail)
  var message = '공지사항 작성이 완료되었습니다'
  var url = '/admin/notice/' + req.params.id
  res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
}
exports.notice_delete_get = async (req, res, next) => {
  console.log(req.params.id)
}

exports.event_list = async (req, res, next) => {
  var event_list = await Model.Event.find().exec()
  res.render('admin/blog_list', { title: '이벤트', blog_list: event_list, url: 'event' })
}
exports.event_create_get = async (req, res, next) => {
  res.render('admin/blog_form', { title: '이벤트', url: 'event' })
}
exports.event_create_post = async (req, res, next) => {
  var event = new Model.Event({
    title: req.body.title,
    content: req.body.content
  })
  event.save()
  var message = '이벤트 등록이 완료되었습니다'
  var url = '/admin/event/' + event._id
  res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
}
exports.event_detail = async (req, res, next) => {
  var event_detail = await Model.Event.findById(req.params.id).exec()
  res.render('admin/blog_detail', { title: '이벤트', blog_detail: event_detail, url: 'event' })
}
exports.event_update_get = async (req, res, next) => {
  var event_detail = await Model.Event.findById(req.params.id).exec()
  res.render('admin/blog_form', { title: '이벤트', blog_detail: event_detail, url: 'event' })
}
exports.event_update_post = async (req, res, next) => {
  var event_detail = new Model.Event({
    title: req.body.title,
    content: req.body.content,
    _id: req.params.id
  })
  await Model.Event.findByIdAndUpdate(req.params.id, event_detail)
  var message = '이벤트 등록이 완료되었습니다'
  var url = '/admin/event/' + req.params.id
  res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
}
exports.event_delete_get = async (req, res, next) => {
  console.log(req.params.id)
}

exports.faq_list = async (req, res, next) => {
  var faq_list = await Model.Faq.find().exec()
  res.render('admin/blog_list', { title: '자주묻는 질문', blog_list: faq_list, url: 'faq' })
}
exports.faq_create_get = async (req, res, next) => {
  res.render('admin/blog_form', { title: '자주묻는 질문', url: 'faq' })
}
exports.faq_create_post = async (req, res, next) => {
  var faq = new Model.Faq({
    title: req.body.title,
    content: req.body.content,
    account: req.body.account
  })
  faq.save()
  var message = '자주묻는 질문 등록이 완료되었습니다'
  var url = '/admin/faq/' + faq._id
  res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
}
exports.faq_detail = async (req, res, next) => {
  var faq_detail = await Model.Faq.findById(req.params.id).exec()
  res.render('admin/blog_detail', { title: '자주묻는 질문', blog_detail: faq_detail, url: 'faq' })
}
exports.faq_update_get = async (req, res, next) => {
  var faq_detail = await Model.Faq.findById(req.params.id).exec()
  res.render('admin/blog_form', { title: '자주묻는 질문', blog_detail: faq_detail, url: 'faq' })
}
exports.faq_update_post = async (req, res, next) => {
  var faq_detail = new Model.Faq({
    title: req.body.title,
    content: req.body.content,
    account: req.body.account,
    _id: req.params.id
  })
  await Model.Faq.findByIdAndUpdate(req.params.id, faq_detail)
  var message = '자주묻는 질문 수정이 완료되었습니다'
  var url = '/admin/faq/' + req.params.id
  res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
}
exports.faq_delete_get = async (req, res, next) => {
  console.log(req.params.id)
}

exports.qna_list = async (req, res, next) => {
  var qna_questions = await Model.QnaQuestion.find().exec()
  for (qna_question of qna_questions) {
    qna_question.qna_answer = await Model.QnaAnswer.findOne({ parent: qna_question._id }).exec()
  }
  res.render('admin/blog_list', { title: '1:1 문의', blog_list: qna_questions, url: 'qna' })
}

exports.qna_detail_get = async (req, res, next) => {
  var qna_question = await Model.QnaQuestion.findById(req.params.id).exec()
  var qna_answer = await Model.QnaAnswer.findOne({ parent: req.params.id }).exec()
  res.render('admin/blog_detail', { title: '1:1 문의', blog_detail: qna_question, blog_comment: qna_answer, url: 'qna' })
}

exports.qna_detail_post = async (req, res, next) => {
  var qna_detail = new Model.QnaAnswer({
    parent: req.params.id,
    content: req.body.content
  })
  qna_detail.save()
  var message = '답변 등록이 완료되었습니다'
  var url = '/admin/qna/' + req.params.id
  res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
}
exports.qna_delete_get = async (req, res, next) => {
  console.log(req.params.id)
}

exports.message_list = async (req, res, next) => {
  var message_list = await Model.Message.find().exec()
  res.render('admin/blog_list', { title: '의견', blog_list: message_list, url: 'message' })
}

exports.message_detail = async (req, res, next) => {
  var message_detail = await Model.Message.findById(req.params.id).exec()
  res.render('admin/blog_detail', { title: '의견', blog_detail: message_detail, url: 'message' })
}
exports.message_delete_get = async (req, res, next) => {
  console.log(req.params.id)
}

exports.success = async (req, res, next) => {
  res.render('admin/success', { title: req.query.message, go_to: req.query.go_to })
}
