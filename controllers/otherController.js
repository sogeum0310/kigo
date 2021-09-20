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
    user_personal_chat: function (callback) {
      Model.ChatContent.find().populate({
        path: 'user_id', 
        model: 'User'
      }).exec(callback)
    },
    user_business_chat: function (callback) {
      Model.ChatContent.find().populate({
        path: 'user_id',
        model: 'UserBusiness'
      }).exec(callback)
    },
    user_personal: function (callback) {
      Model.UserPersonal.findById(req.session.user).exec(callback)
    },
    user_business: function (callback) {
      Model.UserBusiness.findById(req.session.user).exec(callback)
    }
  }, function (err, results) {
    console.log(results)
    res.render('chat_user', { 
      title: 'Chat', 
      get user() {
        if (results.user_personal) {
          return results.user_personal
        } else {
          return results.user_business
        }
      },
      get chat_contents() {
        if (results.user_personal) {
          return results.user_personal_chat
        } else {
          return results.user_business_chat
        }
      }
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
