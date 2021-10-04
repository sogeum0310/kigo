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

exports.chat_list = async (req, res, next) => {
  var chat_list = await Model.ChatRoom.find({ member: req.session.user._id }).exec()
  var user_personal = await Model.UserPersonal.find().exec()
  var user_business = await Model.UserBusiness.find().exec()
  var user = { user_personal: user_personal, user_business: user_business }  

  res.render('chat_list', { title: 'Chat list', user: user, chat_list: chat_list })
}

exports.chat_create = async (req, res, next) => {
  var member = []
  member.push(req.session.user._id)
  member.push(req.body.member)  

  var room = new Model.ChatRoom({
    member: member
  })
  room.save()
  res.redirect('/chat/' + room._id)
}

exports.chat_detail = async (req, res, next) => { 
  var chat_contents = await Model.ChatContent.find({ room: req.params.id }).exec()
  res.render('chat_detail', { 
    title: 'Chat detail',
    chat_contents: chat_contents, 
    user: req.session.user._id,
    room: req.params.id,
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