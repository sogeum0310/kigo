const Model = require('../models/model')
const nodemailer = require('nodemailer');


// Index
exports.index = async (req, res, next)  => {
  try {
    res.render('index', { title: 'KIGO' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Success page
exports.success = async (req, res, next) => {
  try {
    res.render('z_success', { title: req.query.message, go_to: req.query.go_to })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Company 
exports.company_about = async (req, res, next) => {
  try {
    res.render('company_about', { title: '회사소개' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_ranking = async (req, res, next) => {
  try {
    res.render('company_ranking_info', { title: '등급제확인' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_event_page = async (req, res, next) => {
  try {
    res.render('company_event_page', { title: '이벤트' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}
// 이벤트추가

exports.company_blog_list = async (req, res, next) => {
  try {
    var notice_list = await Model.Notice.find().exec()
    res.render('company_blog_list', { title: '공지사항', blog_list: notice_list })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}
exports.company_blog_detail = async (req, res, next) => {
  try {
  console.log('')
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_guide = async (req, res, next) => {
  try {
  res.render('company_guide', { title: '이용방법' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_event_list = async (req, res, next) => {
  try {
    var event_list = await Model.Event.find().exec()
    res.render('company_blog_list', { title: '이벤트', blog_list: event_list })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_faq_list = async (req, res, next) => {
  try {
    var faq_list_personal = await Model.Faq.find({ account: 'personal' }).exec()
    var faq_list_business = await Model.Faq.find({ account: 'business' }).exec()

    var faq_list = { personal: faq_list_personal, business: faq_list_business }
    res.render('company_blog_list', { title: '자주묻는 질문', blog_list: JSON.stringify(faq_list) })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.faq_list_personal = async (req, res, next) => {
  try {
    var faq_list_personal = await Model.Faq.find({ account: 'personal' }).exec()
    res.render('company_blog_list', { title: '자주묻는 질문', blog_list: faq_list_personal })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.faq_list_business = async (req, res, next) => {
  try {
    var faq_list_business = await Model.Faq.find({ account: 'business' }).exec()
    res.render('company_blog_list', { title: '자주묻는 질문', blog_list: faq_list_business })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// 자주묻는질문 페이지 분리

exports.company_faq_detail = async (req, res, next) => {
  try {
    console.log('')
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}
exports.company_share = async (req, res, next) => {
  try {
    res.render('company_share', { title: '추천하기' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_contact_list = async (req, res, next) => {
  try {
    res.render('company_contact_list', { title: '고객센터' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_qna_create_get = async (req, res, next) => {
  try {
    res.render('company_contact_form', { title: '1:1 문의하기' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_qna_create_post = async (req, res, next) => {
  try {
    var qna_detail = new Model.QnaQuestion({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    })
    qna_detail.save()

    var message = '문의가 접수되었습니다'
    var url = '/mypage/qna/list'
    res.redirect(`/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_message_create_get = async (req, res, next) => {
  try {
    res.render('company_contact_form', { title: '의견' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.company_message_create_post = async (req, res, next) => {
  try {
    var message = new Model.Message({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    })
    message.save()
    
    var message = '의견이 접수되었습니다.'
    var url = '/'
    res.redirect(`/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}
