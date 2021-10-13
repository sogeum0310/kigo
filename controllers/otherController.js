const Model = require('../models/model')
const { faq_list } = require('./adminController')
const nodemailer = require('nodemailer');

exports.index = async (req, res, next)  => {
  res.render('index', { title: 'KIGO' })
}

exports.company_about = async (req, res, next) => {
  res.render('company_about', { title: '회사소개' })
}
exports.company_ranking = async (req, res, next) => {
  res.render('company_ranking_info', { title: '등급제확인' })
}

exports.company_blog_list = async (req, res, next) => {
  var notice_list = await Model.Notice.find().exec()
  res.render('company_blog_list', { title: '공지사항', blog_list: notice_list })
}
exports.company_blog_detail = async (req, res, next) => {
  console.log('')
}
exports.company_guide = async (req, res, next) => {
  res.render('company_guide', { title: '이용방법' })
}
exports.company_event_list = async (req, res, next) => {
  var event_list = await Model.Event.find().exec()
  res.render('company_blog_list', { title: '이벤트', blog_list: event_list })
}

exports.company_faq_list = async (req, res, next) => {
  var faq_list_personal = await Model.Faq.find({ account: 'personal' }).exec()
  var faq_list_business = await Model.Faq.find({ account: 'business' }).exec()

  var faq_list = { personal: faq_list_personal, business: faq_list_business }

  res.render('company_blog_list', { title: '자주묻는 질문', blog_list: JSON.stringify(faq_list) })
}

exports.faq_list_personal = async (req, res, next) => {
  var faq_list_personal = await Model.Faq.find({ account: 'personal' }).exec()
  res.render('company_blog_list', { title: '자주묻는 질문', blog_list: faq_list_personal })
}

exports.faq_list_business = async (req, res, next) => {
  var faq_list_business = await Model.Faq.find({ account: 'business' }).exec()
  res.render('company_blog_list', { title: '자주묻는 질문', blog_list: faq_list_business })
}

// 자주묻는질문 페이지 분리

exports.company_faq_detail = async (req, res, next) => {
  console.log('')
}
exports.company_share = async (req, res, next) => {
  res.render('company_share', { title: '추천하기' })
}

exports.company_contact_list = async (req, res, next) => {
  res.render('company_contact_list', { title: '고객센터' })
}

exports.company_qna_create_get = async (req, res, next) => {
  res.render('company_contact_form', { title: '1:1 문의하기' })
}

exports.company_qna_create_post = async (req, res, next) => {
  var qna_detail = new Model.QnaQuestion({
    title: req.body.title,
    content: req.body.content,
    user: req.session.user._id
  })
  qna_detail.save()

  var message = 'A question is successfully posted'
  var url = '/mypage/qna/list'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

exports.company_message_create_get = async (req, res, next) => {
  res.render('company_contact_form', { title: '의견' })
}

exports.company_message_create_post = async (req, res, next) => {
  var message = new Model.Message({
    title: req.body.title,
    content: req.body.content,
    user: req.session.user._id
  })
  message.save()
  
  var message = 'A message is successfully sent'
  var url = '/'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}


exports.chat_list = async (req, res, next) => {
  var chat_list = await Model.ChatRoom.find({ user: req.session.user._id }).populate('user').exec()
  var chat_arr = []

  for (chat_room of chat_list) {
    var last_content = await Model.ChatContent.findOne({ room: chat_room._id }).sort([[ 'reg_date', 'descending' ]])
    var count = await Model.ChatContent.countDocuments({ room: chat_room._id })

    chat_room.last_content = last_content
    chat_room.count = count

    if (chat_room.count>0) {
      chat_arr.push(chat_room)
    }

    for (user of chat_room.user) {
      if (user._id.toString()!==req.session.user._id) {
        chat_room.member = user
      }
    }
  }

  res.render('chat_list', { title: '채팅', chat_list: chat_arr })
}

exports.chat_create = async (req, res, next) => {
  var user = []
  user.push(req.session.user._id)
  user.push(req.body.user)  

  var room = new Model.ChatRoom({
    user: user
  })
  room.save()
  res.redirect('/chat/' + room._id)
}

exports.chat_detail = async (req, res, next) => { 
  var chat_contents = await Model.ChatContent.find({ room: req.params.id }).populate('user').exec()
  res.render('chat_detail', { 
    title: '채팅',
    chat_contents: chat_contents, 
    user: JSON.stringify(req.session.user),
    room: req.params.id,
  })
  console.log(req.session.user)
}

exports.success = async (req, res, next) => {
  res.render('success', { title: req.query.message, go_to: req.query.go_to })
}

exports.test = async (req, res, next) => {
  res.render('test', { title: 'Test' })
}
