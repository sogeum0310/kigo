const Model = require('../models/model')
var MongoStore = require('connect-mongo')
var session = require('express-session')
const mongoUrl = 'mongodb://sogeum0310:hyun0831**@ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:27017/test?authSource=admin&authMechanism=SCRAM-SHA-1'
const sessionMiddleware = session({
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: mongoUrl
  })
})


// Set the namespace
const io = require('socket.io')()
const my_space = io.of('/')
// Set the middleware for each namespace
my_space.use(function (socket, next) {
  sessionMiddleware(socket.request, {}, next)
})


// Namespace of my_space
var members = [] // Get the all users and rooms from the clients
my_space.on('connection', async (socket) => { 
  console.log('- - - my_space connected - - -')
  const session = socket.request.session;

  // Make chat room and invite members 
  socket.on('makeRoom', async (user) => {
    try {
      var users = []
      users.push(session.user._id)
      users.push(user)

      var chat_room = new Model.ChatRoom({
        user: users,
      })
      await chat_room.save()

      socket.emit('makeRoom', chat_room, session.user._id)
    } catch (error) {
      console.log(error)
    }
  })

  var obj // For making user object
  // On join event
  socket.on('join', async (room, user) => {
    try {
      // Get the user object joining some room right now
      socket.join(room._id)
      obj = { room: room._id, user: user }
      console.log(obj)
        
      // For sending user-group in some room to the client
      members.push(obj)
      var user_online = []
      members.map(function (value, index) {
        if (value.room===room._id) {
          user_online.push(value.user)
        }
      })

      // For Making read count lower in the room when user join
      var chat_contents = await Model.ChatContent.find({ room: room._id }) 
      var this_room = await Model.ChatRoom.findById(room._id)
      for (chat_content of chat_contents) {
        if (!chat_content.read.includes(user._id)) {
          await Model.ChatContent.findByIdAndUpdate(chat_content._id, { $push: { read: user._id } })
        }
      }
      var new_contents = await Model.ChatContent.find({ room: room._id }) 
      var nums = []
      for (new_content of new_contents) {
        nums.push(this_room.user.length - new_content.read.length)
      }

      // Replace navigation notification count when joining the room
      var chat_rooms_for_notification = await Model.ChatRoom.find({ user: user._id })  
      var chat_notification = 0
      for (chat_room of chat_rooms_for_notification) {
        var count = await Model.ChatContent.countDocuments({ room: chat_room._id, read: { $ne: session.user._id } })
        chat_notification += count
      }

      // Finally emit the join the event
      my_space.to(room._id).emit('join', user_online, nums, chat_notification)
    } catch (error) {
      console.log(error)
    }
  })

  // On message event
  socket.on('message', async (room, msg) => {
    try {

      // Save the new chat message 
      var chat_content = new Model.ChatContent({
        user: msg.user._id,
        content: msg.message,
        room: room._id,
        read: msg.read
      })

      await chat_content.save()
      
      // Activate room with first message, Only works when first message
      await Model.ChatRoom.findByIdAndUpdate(room._id, { active: 1 })

      // Emit to naviagtion - Replace chat notification count when new message
      var chat_rooms_for_notification = await Model.ChatRoom.find()
      var chat_contents_for_notification = await Model.ChatContent.find()
      my_space.emit('chat_notification', chat_rooms_for_notification, chat_contents_for_notification)

      // Emit to chat detail - Including my message or not, detect wheather a user in the room or not
      msg.me = msg.user._id
      var room_with_user = await Model.ChatRoom.findById(room._id).populate('user')
      var read = room_with_user.user.length - chat_content.read.length
      my_space.to(room._id).emit('message', msg, read)

      // Emit to chat list - Weather it is first message or not
      var first = await Model.ChatContent.countDocuments({ room: room._id })
      if (first < 2) {
        my_space.emit('addRoom', room_with_user, chat_content)
      } else {
        var chat_contents = await Model.ChatContent.find({ room: room._id })
        my_space.emit('last_message', chat_content, chat_contents)
      }
    } catch (error) {
      console.log(error)
    }
  })

  // When user out of the room
  socket.on('disconnect', async () => {
    try {
      console.log('- - - my_space disconnected - - -')
      // Detect a user out of the some room and pull the user from the members array
      if (obj) {
        console.log(obj)
        members.map(function (value, index) {
          if (value.room===obj.room && value.user===obj.user) {
            members.splice(index, 1)
          }
        })
        console.log(members)

        // push users in the room from the members array, send to the client
        var user_something = []
        members.map(function (value, index) {
          if (value.room===obj.room) {
            user_something.push(value.user)
          }
        })

        // Emit to chat detail - a some room
        my_space.to(obj.room).emit('bye', user_something)
      }
    } catch (error) {
      console.log(error)
    }
  })
})


// Exports module
module.exports = io