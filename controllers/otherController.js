var Model = require('../models/model')
var async = require('async')


exports.test = function (req, res, next) {
  console.log('hi controller')
}

exports.index = function(req, res, next) {
  res.render('index', { title: 'KIGO',  results: req.session.user})
}

exports.chat = function (req, res, next) {
  async.parallel({
    chat_contents: function (callback) {
      Model.ChatContent.find()
      .populate('user_personal')
      .populate('user_business')
      .exec(callback)
    },
  }, function (err, results) {
    console.log(results.chat_contents[0].user_personal)
    res.render('chat_user', { 
      title: 'Chat', 
      user: req.session.user,
      chat_contents: results.chat_contents,
    })
  })
}

exports.chat_ajax = function (req, res, next) {
  console.log('hi chat')
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
