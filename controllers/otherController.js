var Model = require('../models/model')
var async = require('async')
const { faq_list } = require('./adminController')


exports.index = async (req, res, next)  => {
  res.render('index', { title: 'KIGO',  results: req.session.user})
}

exports.company_about = async (req, res, next) => {
  res.render('company_about', { title: 'Company about' })
}
exports.company_blog_list = async (req, res, next) => {
  var notice_list = await Model.Notice.find().exec()
  res.render('company_blog_list', { title: 'Notice list', blog_list: notice_list })
}
exports.company_blog_detail = async (req, res, next) => {
  console.log('')
}
exports.company_guide = async (req, res, next) => {
  res.render('company_guide', { title: 'Guide' })
}
exports.company_event_list = async (req, res, next) => {
  var event_list = await Model.Event.find().exec()
  res.render('company_blog_list', { title: 'Event list', blog_list: event_list })
}

exports.company_faq_list = async (req, res, next) => {
  var faq_list_personal = await Model.Faq.find({ account: 'personal' }).exec()
  var faq_list_business = await Model.Faq.find({ account: 'business' }).exec()

  var faq_list = { personal: faq_list_personal, business: faq_list_business }

  // console.log(faq_list)

  res.render('company_blog_list', { title: 'Faq list', blog_list: JSON.stringify(faq_list) })
}
exports.company_faq_detail = async (req, res, next) => {
  console.log('')
}
exports.company_share = async (req, res, next) => {
  res.render('company_share', { title: 'Share' })
}

exports.company_contact_list = async (req, res, next) => {
  res.render('company_contact_list', { title: 'Contact list' })
}

exports.company_qna_create_get = async (req, res, next) => {
  res.render('company_contact_form', { title: 'Qna create' })
}

exports.company_qna_create_post = async (req, res, next) => {
  var qna_detail = new Model.QnaQuestion({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user._id
  })
  qna_detail.save()
}

exports.company_message_create_get = async (req, res, next) => {
  res.render('contact_form', { title: 'Message create' })
}

exports.company_message_create_post = async (req, res, next) => {
  var message = new Model.Message({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user._id
  })
  message.save()
}



exports.chat_list = async (req, res, next) => {
  res.render('chat_list', { title: 'Chat list' })
}

exports.chat = async (req, res, next) => { 
  var chat_contents = await Model.ChatContent.find().populate('user_personal').populate('user_business').exec()
  res.render('chat_user', { 
    title: 'Chat', 
    user: req.session.user,
    chat_contents: chat_contents,
  })
}

exports.chat_ajax = async (req, res, next) => {
  var chat = new Model.ChatContent({
    user_id: req.body.chat_user,
    content: req.body.chat_content,
    room: '6127581b3eef7c51a40956d2'
  })
  chat.save(function (err) {
    if (err) { return next(err) }
    console.log('so good')
  })
}



exports.success = async (req, res, next) => {
  res.render('success', { title: req.query.message })
}

exports.test = async (req, res, next) => {
  console.log('hi controller')
}
