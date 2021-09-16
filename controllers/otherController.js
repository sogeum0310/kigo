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
    chat_content: function (callback) {
      Model.ChatContent.find().exec(callback)
    },
    user: function (callback) {
      Model.UserPersonal.findById(req.session.user).exec(callback)
    }
  }, function (err, results) {
    console.log(results)
    res.render('chat_user', { title: 'Chat', user: results.user, chat_contents: results.chat_content })
  })
}

exports.chat_ajax = function (req, res, next) {

  var chat = new Model.ChatContent({
    user_id: req.body.chat_user,
    content: req.body.chat_content,
    room: '6127581b3eef7c51a40956d2'
  })

  console.log(chat)

  chat.save(function (err) {
    if (err) { return next(err) }
    console.log('so good')
  })

}
