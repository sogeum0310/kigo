const Model = require('../models/model');


// Index
exports.index = async (req, res, next) => {
  try {
    res.render('admin/index', { title: '관리자' });
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Success page
exports.success = async (req, res, next) => {
  try {
    res.render('admin/z_success', { title: req.query.message, go_to: req.query.go_to })
  } catch (error) {
    res.render('error', { message: '', error: error })
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
    res.render('error', { message: '', error: error })
  }
}

exports.login_post = async (req, res, next) => {
  try {
    if (req.body.admin==='admin') {
      req.session.admin = 'admin'
      res.redirect('/admin')
    } else {
      res.send('something is wrong')
    }
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Logout
exports.logout = async (req, res, next) => {
  try {
    // req.session.destroy()
    res.redirect('/admin')
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Account
exports.mypage = async (req, res, next) => {
  try {
    res.render('admin/admin_mypage', { title: '관리자 정보' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// User
exports.user_personal_list = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.user_business_list = async (req, res, next) => {
  try {
    var user_businesses = await Model.User.find({ account: 'business' }).populate('city').populate('platform').exec()
    res.render('admin/user_list', { title: '광고업체', users: user_businesses })
    console.log(user_businesses)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.user_detail_get = async (req, res, next) => {
  try {
    var user = await Model.User.findById(req.params.id).populate('city').populate('platform').exec()
    user.file = await Model.File.findOne({ parent: req.params.id }).exec()
    user.reviews = await Model.Review.find({ user_business: req.params.id }).exec()
    res.render('admin/user_detail', { title: '회원 정보', user: user })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.user_detail_post = async (req, res, next) => {
  try {
    await Model.User.findByIdAndUpdate(req.params.id, { auth: 1 })
    res.redirect('/admin/user/detail/' + req.params.id)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Estimate request
exports.estimate_list = async (req, res, next) => {
  try {
    var estimate_responses = await Model.EstimateResponse.find({ submit: true }).populate('user')

    res.render('admin/estimate_list', { title: 'Estimates', estimate_responses: estimate_responses })
  } catch (error) {
    res.render('error', { message: '', error: error })
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
    
    res.render('admin/estimate_detail', { title: '보낸 견적', estimate_response: estimate_response })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Notice
exports.notice_list = async (req, res, next) => {
  try {
    var notice_list = await Model.Notice.find().exec()
    res.render('admin/blog_list', { title: '공지사항', blog_list: notice_list, url: 'notice' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.notice_create_get = async (req, res, next) => {
  try {
  res.render('admin/blog_form', { title: '공지사항', url: 'notice' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.notice_create_post = async (req, res, next) => {
  try {
    var notice = new Model.Notice({
      title: req.body.title,
      content: req.body.content
    })

    await notice.save()
    var message = 'A notice is successfully posted'
    res.redirect('/admin/success/?message=' + message)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.notice_detail = async (req, res, next) => {
  try {
    var notice_detail = await Model.Notice.findById(req.params.id).exec()
    res.render('admin/blog_detail', { title: '공지사항', blog: notice_detail, url: 'notice' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.notice_update_get = async (req, res, next) => {
  try {
    var notice_detail = await Model.Notice.findById(req.params.id).exec()
    res.render('admin/blog_form', { title: '공지사항', blog: notice_detail, url: 'notice' })
  } catch (error) {
    res.render('error', { message: '', error: error })
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
    var message = '공지사항 수정이 완료되었습니다'
    var url = '/admin/notice/' + req.params.id
    res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.notice_delete_get = async (req, res, next) => {
  try {
  console.log(req.params.id)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Event
exports.event_list = async (req, res, next) => {
  try {
    var event_list = await Model.Event.find().exec()
    res.render('admin/blog_list', { title: '이벤트', blog_list: event_list, url: 'event' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.event_create_get = async (req, res, next) => {
  try {
    res.render('admin/blog_form', { title: '이벤트', url: 'event' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.event_create_post = async (req, res, next) => {
  try {
    var event = new Model.Event({
      title: req.body.title,
      content: req.body.content
    })
    event.save()
    var message = '이벤트 등록이 완료되었습니다'
    var url = '/admin/event/' + event._id
    res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.event_detail = async (req, res, next) => {
  try {
    var event_detail = await Model.Event.findById(req.params.id).exec()
    res.render('admin/blog_detail', { title: '이벤트', blog: event_detail, url: 'event' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.event_update_get = async (req, res, next) => {
  try {
    var event_detail = await Model.Event.findById(req.params.id).exec()
    res.render('admin/blog_form', { title: '이벤트', blog: event_detail, url: 'event' })
  } catch (error) {
    res.render('error', { message: '', error: error })
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
    var message = '이벤트 등록이 완료되었습니다'
    var url = '/admin/event/' + req.params.id
    res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.event_delete_get = async (req, res, next) => {
  try {
    console.log(req.params.id)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Faq
exports.faq_list = async (req, res, next) => {
  try {
    var faq_list = await Model.Faq.find().exec()
    res.render('admin/blog_list', { title: '자주묻는 질문', blog_list: faq_list, url: 'faq' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.faq_create_get = async (req, res, next) => {
  try {
    res.render('admin/blog_form', { title: '자주묻는 질문', url: 'faq' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.faq_create_post = async (req, res, next) => {
  try {
    var faq = new Model.Faq({
      title: req.body.title,
      content: req.body.content,
      account: req.body.account
    })
    faq.save()
    var message = '자주묻는 질문 등록이 완료되었습니다'
    var url = '/admin/faq/' + faq._id
    res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.faq_detail = async (req, res, next) => {
  try {
    var faq_detail = await Model.Faq.findById(req.params.id).exec()
    res.render('admin/blog_detail', { title: '자주묻는 질문', blog: faq_detail, url: 'faq' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.faq_update_get = async (req, res, next) => {
  try {
    var faq_detail = await Model.Faq.findById(req.params.id).exec()
    res.render('admin/blog_form', { title: '자주묻는 질문', blog: faq_detail, url: 'faq' })
  } catch (error) {
    res.render('error', { message: '', error: error })
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
    var message = '자주묻는 질문 수정이 완료되었습니다'
    var url = '/admin/faq/' + req.params.id
    res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.faq_delete_get = async (req, res, next) => {
  try {
    console.log(req.params.id)
  } catch (error) {
    res.render('error', { message: '', error: error })
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
    res.render('error', { message: '', error: error })
  }
}

exports.qna_detail_get = async (req, res, next) => {
  try {
    var qna_question = await Model.QnaQuestion.findById(req.params.id).exec()
    var qna_answers = await Model.QnaAnswer.find({ parent: req.params.id }).exec()
    for(qna_answer of qna_answers) {
      qna_answer.comment = await Model.QnaAnswer.find({ parent: qna_answer._id }).populate('user')
    }

    res.render('admin/blog_detail', { title: '1:1 문의', blog: qna_question, blog_comments: qna_answers, url: 'qna' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.qna_detail_post = async (req, res, next) => {
  try {
    var qna_detail = new Model.QnaAnswer({
      parent: req.params.id,
      content: req.body.content
    })
    await qna_detail.save()

    var message = '답변 등록이 완료되었습니다'
    var url = '/admin/qna/' + req.params.id
    res.redirect(`/admin/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.qna_delete_get = async (req, res, next) => {
  try {
    console.log(req.params.id)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.qna_comment_create = async (req, res, next) => {
  try {
    if (req.body.id==='0') {
      var blog_comment = new Model.QnaAnswer({
        parent: req.body.parent,
        user: req.user.id,
        content: req.body.content
      })
      await blog_comment.save()
    } else {
      await Model.QnaAnswer.findByIdAndUpdate(req.body.id, { content: req.body.content })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.qna_comment_delete = async (req, res, next) => {
  try {
    await Model.QnaAnswer.findByIdAndDelete(req.body.id)
    res.send('success')
  } catch (error) {
    console.log(error)
  }
}

// Message
exports.message_list = async (req, res, next) => {
  try {
    var message_list = await Model.Message.find().exec()
    res.render('admin/blog_list', { title: '의견', blog_list: message_list, url: 'message' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.message_detail = async (req, res, next) => {
  try {
    var message_detail = await Model.Message.findById(req.params.id).exec()
    res.render('admin/blog_detail', { title: '의견', blog: message_detail, url: 'message' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.message_delete_get = async (req, res, next) => {
  try {
    console.log(req.params.id)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Summernote image upload
exports.summernote_ajax = async (req, res, next) => {
  var my_file = req.files.file

  var new_file_name = my_file.md5 + '.' + my_file.name.split('.').pop()
  upload_path = 'files/blog/' + new_file_name
  await my_file.mv(upload_path)

  res.send('/files/blog/' + new_file_name)
}
