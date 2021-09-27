var Model = require('../models/model')
var async = require('async')


exports.success = async (req, res, next) => {
  res.render('success', { title: req.query.message })
}

exports.test = async (req, res, next) => {
  console.log('hi controller')
}

exports.index = async (req, res, next)  => {
  res.render('index', { title: 'KIGO',  results: req.session.user})
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

exports.contact_list = async (req, res, next) => {
  res.render('contact_list', { title: 'Contact list' })
}

exports.qna_create_get = async (req, res, next) => {
  res.render('contact_form', { title: 'Qna create' })
}
exports.qna_create_post = async (req, res, next) => {
  var qna_detail = new Model.QnaQuestion({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user._id
  })
  qna_detail.save()
}

exports.message_create_get = async (req, res, next) => {
  res.render('contact_form', { title: 'Message create' })
}
exports.message_create_post = async (req, res, next) => {
  var message = new Model.Message({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user._id
  })
  message.save()
}