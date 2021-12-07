const { TooManyRequests } = require('http-errors')
var Model = require('../models/model')


exports.chat_list = async (req, res, next) => {
  try {
    var users = await Model.User.find()
    var chat_rooms = await Model.ChatRoom.find({ user: req.user.id, active: true }).populate('user')

    for (chat_room of chat_rooms) {
      var chat_content = await Model.ChatContent.findOne({ room: chat_room._id }).sort([[ 'reg_date', 'descending' ]])
      // Display last message and unread message count in some room
      chat_room.last_message = chat_content
      chat_room.count = await Model.ChatContent.countDocuments({ room: chat_room._id, read: { $ne: req.user.id } })
      // Display users except for login user in some room title
      chat_room.user.map(function (value, index) {
        if (req.user.id.toString()===value._id.toString()) {
          chat_room.user.splice(index, 1)
        }
      })
    }

    res.render('chat_list', { 
      title: '채팅', 
      users: users, 
      chat_rooms: chat_rooms 
    })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.chat_detail = async (req, res, next) => {
  try {
    var chat_contents = await Model.ChatContent.find({ room: req.params.room }).populate('user')
    var room = await Model.ChatRoom.findById(req.params.room)

    res.render('chat_detail', { 
      title: '채팅', 
      chat_contents: chat_contents,
      room: room,
    })

  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.chat_file = async (req, res, next) => {
  try {
    var data = req.files.my_files
    var items = data instanceof Array ? data : [data]
    var new_file_names = []

    for (item of items) {
      var new_file_name = item.md5 + '.' + item.name.split('.').pop()
      upload_path = 'files/chat/' + new_file_name
      await item.mv(upload_path)
      new_file_names.push(new_file_name)
    }

    res.send(new_file_names)

  } catch (error) {
    console.log(error)
  }
}

exports.chat_out = async (req, res, next) => {
  try {
    await Model.ChatRoom.findByIdAndUpdate(req.body.room, { $pull: { user: req.body.user } })
    res.redirect('/chats')
  } catch (error) {
    res.render('error', { error: error })
  }
}

