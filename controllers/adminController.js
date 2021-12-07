const Model = require('../models/model');


// Index
exports.index = async (req, res, next) => {
  try {
    res.render('admin/index', { title: '관리자' });
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Login
exports.login_get = async (req, res, next) => {
  try {
    if (req.session.admin) {
      next()
    } else {
      res.render('admin/admin_form_login', { title: '관리자 로그인' })
    }
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.login_post = async (req, res, next) => {
  try {
    if (req.body.username==='admin' && req.body.password==='1234') {
      req.session.admin = 'admin'
      res.redirect('/admin')
    } else {
      res.redirect('/admin')
    }
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Logout
exports.logout = async (req, res, next) => {
  try {
    req.session.destroy()
    res.redirect('/admin')
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Account
exports.mypage = async (req, res, next) => {
  try {
    res.render('admin/admin_mypage', { title: '관리자 정보' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// User list
exports.user_personal_list = async (req, res, next) => {
  try {
    var page = req.query.page
    if (!req.query.page) {
      page = 1
    }

    const options = {
      page: page,
      limit: 10,
      collation: {
        locale: 'en',
      }
    }

    var user_personals = await Model.User.paginate({ account: 'personal' }, options)
    console.log(user_personals)
    res.render('admin/user_list', { title: '일반사용자', users: user_personals })
    // result.docs
    // result.totalDocs = 100
    // result.limit = 10
    // result.page = 1
    // result.totalPages = 10
    // result.hasNextPage = true
    // result.nextPage = 2
    // result.hasPrevPage = false
    // result.prevPage = null
    // result.pagingCounter = 1
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.user_business_list = async (req, res, next) => {
  try {
    var page = req.query.page
    if (!req.query.page) {
      page = 1
    }

    const options = {
      page: page,
      limit: 10,
      collation: {
        locale: 'en',
      }
    }

    var user_businesses = await Model.User.paginate({ account: 'business' }, options)
    console.log(user_businesses)

    res.render('admin/user_list', { title: '광고업체', users: user_businesses })
    console.log(user_businesses)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// User detail
exports.user_detail_get = async (req, res, next) => {
  try {
    var user = await Model.User.findById(req.params.id).populate('city').populate('platform').exec()
    user.file = await Model.File.findOne({ table: 'user', parent: req.params.id }).exec()
    user.reviews = await Model.Review.find({ parent: req.params.id }).exec()
    res.render('admin/user_detail', { title: '회원 정보', user: user })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.user_detail_auth = async (req, res, next) => {
  try {
    await Model.User.findByIdAndUpdate(req.body.user, { authorization: req.body.auth })
    res.redirect('/admin/user/detail/' + req.body.user)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.user_detail_service = async (req, res, next) => {
  try {
    await Model.User.findByIdAndUpdate(req.body.user, { service: true, start_date: Date.now() + 32400000 })
    res.redirect('/admin/user/detail/' + req.body.user)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.user_detail_level = async (req, res, next) => {
  try {
    await Model.User.findByIdAndUpdate(req.body.user, { level: req.body.level })
    res.redirect('/admin/user/detail/' + req.body.user)
  } catch(error) {
    res.render('admin/error', { error: error })
  }
}

exports.user_detail_drop = async (req, res, next) => {
  try {
    await Model.User.findByIdAndUpdate(req.body.user, { drop: true })
    res.redirect('/admin/user/detail/' + req.body.user)
  } catch(error) {
    res.render('admin/error', { error: error })
  }
}

// Estimate request
exports.estimate_list = async (req, res, next) => {
  try {
    var estimate_responses = await Model.EstimateResponse.find({ submit: true }).populate('user')

    res.render('admin/estimate_list', { title: '계약서 목록', estimate_responses: estimate_responses })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.estimate_detail = async (req, res, next) => {
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

    var files = await Model.File.find({ table: 'estimate', parent: req.params.id })
    
    res.render('admin/estimate_detail', { title: '보낸 견적', estimate_response: estimate_response, files: files })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Notice
exports.notice_list = async (req, res, next) => {
  try {
    var notice_list = await Model.Notice.find().exec()
    res.render('admin/blog_list', { title: '공지사항', blog_list: notice_list, url: 'notice' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.notice_create_get = async (req, res, next) => {
  try {
  var notice = await Model.Notice.findById(req.params.id)
  res.render('admin/blog_form', { title: '공지사항', blog: notice, url: 'notice' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.notice_create_post = async (req, res, next) => {
  try {
    var notice = new Model.Notice({
      title: req.body.title,
      content: req.body.content
    })

    await notice.save()
    res.redirect('/admin/notice/' + notice._id)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.notice_detail = async (req, res, next) => {
  try {
    var notice_detail = await Model.Notice.findById(req.params.id).exec()
    res.render('admin/blog_detail', { title: '공지사항', blog: notice_detail, url: 'notice' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.notice_update_get = async (req, res, next) => {
  try {
    var notice_detail = await Model.Notice.findById(req.params.id).exec()
    res.render('admin/blog_form', { title: '공지사항', blog: notice_detail, url: 'notice' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.notice_update_post = async (req, res, next) => {
  try {
    var notice_detail = new Model.Notice({
      title: req.body.title,
      content: req.body.content,
      _id: req.params.id
    })
    await Model.Notice.findByIdAndUpdate(req.params.id, notice_detail)
    res.redirect('/admin/notice/' + req.params.id)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.notice_delete = async (req, res, next) => {
  try {
    await Model.Notice.findByIdAndDelete(req.params.id)
    res.redirect('/admin/notice/list')
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Event
exports.event_list = async (req, res, next) => {
  try {
    var event_list = await Model.Event.find().exec()
    res.render('admin/blog_list', { title: '이벤트', blog_list: event_list, url: 'event' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.event_create_get = async (req, res, next) => {
  try {
    res.render('admin/blog_form', { title: '이벤트', url: 'event' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.event_create_post = async (req, res, next) => {
  try {
    var event = new Model.Event({
      title: req.body.title,
      content: req.body.content
    })
    await event.save()
    res.redirect('/admin/event/' + event._id)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.event_detail = async (req, res, next) => {
  try {
    var event_detail = await Model.Event.findById(req.params.id).exec()
    res.render('admin/blog_detail', { title: '이벤트', blog: event_detail, url: 'event' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.event_update_get = async (req, res, next) => {
  try {
    var event_detail = await Model.Event.findById(req.params.id).exec()
    res.render('admin/blog_form', { title: '이벤트', blog: event_detail, url: 'event' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.event_update_post = async (req, res, next) => {
  try {
    var event_detail = new Model.Event({
      title: req.body.title,
      content: req.body.content,
      _id: req.params.id
    })
    await Model.Event.findByIdAndUpdate(req.params.id, event_detail)
    res.redirect('/admin/event/' + req.params.id)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.event_delete = async (req, res, next) => {
  try {
    await Model.Event.findByIdAndDelete(req.params.id)
    res.redirect('/admin/event/list')
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Faq
exports.faq_list = async (req, res, next) => {
  try {
    var faq_list = await Model.Faq.find().exec()
    res.render('admin/blog_list', { title: '자주묻는 질문', blog_list: faq_list, url: 'faq' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.faq_create_get = async (req, res, next) => {
  try {
    res.render('admin/blog_form', { title: '자주묻는 질문', url: 'faq' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.faq_create_post = async (req, res, next) => {
  try {
    var faq = new Model.Faq({
      title: req.body.title,
      content: req.body.content,
      account: req.body.account
    })
    await faq.save()
    res.redirect('/admin/faq/' + faq._id)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.faq_detail = async (req, res, next) => {
  try {
    var faq_detail = await Model.Faq.findById(req.params.id).exec()
    res.render('admin/blog_detail', { title: '자주묻는 질문', blog: faq_detail, url: 'faq' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.faq_update_get = async (req, res, next) => {
  try {
    var faq_detail = await Model.Faq.findById(req.params.id).exec()
    res.render('admin/blog_form', { title: '자주묻는 질문', blog: faq_detail, url: 'faq' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.faq_update_post = async (req, res, next) => {
  try {
    var faq_detail = new Model.Faq({
      title: req.body.title,
      content: req.body.content,
      account: req.body.account,
      _id: req.params.id
    })
    await Model.Faq.findByIdAndUpdate(req.params.id, faq_detail)
    res.redirect('/admin/faq/' + req.params.id)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.faq_delete = async (req, res, next) => {
  try {
    await Model.Faq.findByIdAndDelete(req.params.id)
    res.redirect('/admin/faq/list')
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Qna
exports.qna_list = async (req, res, next) => {
  try {
    var qna_questions = await Model.QnaQuestion.find().exec()
    for (qna_question of qna_questions) {
      qna_question.qna_answer = await Model.QnaAnswer.findOne({ parent: qna_question._id }).exec()
    }
    res.render('admin/blog_list', { title: '1:1 문의', blog_list: qna_questions, url: 'qna' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Message
exports.message_list = async (req, res, next) => {
  try {
    var message_list = await Model.Message.find().exec()
    res.render('admin/blog_list', { title: '의견', blog_list: message_list, url: 'message' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.message_detail = async (req, res, next) => {
  try {
    var message_detail = await Model.Message.findById(req.params.id).exec()
    res.render('admin/blog_detail', { title: '의견', blog: message_detail, url: 'message' })
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

exports.message_delete = async (req, res, next) => {
  try {
    await Model.Faq.findByIdAndDelete(req.params.id)
    res.redirect('/admin/faq/list')
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}

// Summernote image upload
exports.summernote_ajax = async (req, res, next) => {
  try {
    var my_file = req.files.file

    var new_file_name = my_file.md5 + '.' + my_file.name.split('.').pop()
    upload_path = 'files/blog/' + new_file_name
    await my_file.mv(upload_path)

    res.send('/files/blog/' + new_file_name)
  } catch (error) {
    res.render('admin/error', { error: error })
  }
}


// //// rabbit, admin
// {
//   // cookie
//   "cookie": {
//     "originalMaxAge": null,
//     "expires": null,
//     "httpOnly": true,
//     "path": "/"
//   },
//   //  message
//   "messages": [],

//   // req.session.admin
//   "admin": "admin",

//   // passport
//   "passport": {
//     "user": {
//       "id": "618e4f9ccd74f18159034e96",
//       "username": "rabbit"
//     }
//   }
// }

// //// no user
// {
//   // cookie
//   "cookie": {
//     "originalMaxAge": null,
//     "expires": null,
//     "httpOnly": true,
//     "path": "/"
//   },
//   // message
//   "messages": []
// }