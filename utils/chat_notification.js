const Model = require('../models/model')


const something = async function (req, res, next) {
  try {
    if (req.user) {
      var count = await Model.ChatContent.countDocuments({ user: req.user.id })
      var chat_rooms = await Model.ChatRoom.find({ user: req.user.id })
      var chat_notification = 0
      for (chat_room of chat_rooms) {
        var count = await Model.ChatContent.countDocuments({ room: chat_room._id, read: { $ne: req.user.id } })
        chat_notification += count
      }
      // Save global variable
      res.locals.chat_notification = chat_notification
    }
  } catch (error) {
    console.log(error)
  }
  next()
}


module.exports = something