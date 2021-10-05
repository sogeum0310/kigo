var Model = require('../models/model')
var async = require('async')
const { faq_list } = require('./adminController')
var nodemailer = require('nodemailer');

exports.index = async (req, res, next)  => {
  res.render('index', { title: 'KIGO' })
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

  var message = 'A question is successfully posted'
  res.redirect('/success/?message=' + message)
}

exports.company_message_create_get = async (req, res, next) => {
  res.render('company_contact_form', { title: 'Message create' })
}

exports.company_message_create_post = async (req, res, next) => {
  var message = new Model.Message({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user._id
  })
  message.save()
  
  var message = 'A message is successfully sent'
  res.redirect('/success/?message=' + message)
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

exports.success = async (req, res, next) => {
  res.render('success', { title: req.query.message })
}

exports.test = async (req, res, next) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sogeum0310@gmail.com',
      pass: 'hyun0831**'
    }
  });
  
  var mailOptions = {
    from: 'sogeum0310@gmail.com',
    to: 'tvvmvn@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
