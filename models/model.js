const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DateTime } = require("luxon");  //for date handling


const EstimateItemSchema = new Schema({
  name: { type: String }
})
const EstimateItemDetailSchema = new Schema({
  estimate_item: { type: Schema.ObjectId, ref: 'EstimateItem' },
  name: { type: String },
})

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String } ,
  name: { type: String },
  gender: { type: String },
  date_of_birth: { type: Date } ,
  phone: { type: String },
  email: { type: String },
  about: { type: String },
  city: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }] ,
  platform: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  auth: { type: Number },
  account: { type: String }
})

UserSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});

const EstimateRequestSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  platform : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  how_many : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  business : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  goal : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  start_day : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  how_long : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  cost : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  city : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  feedback : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  count:  { type: Number, default: 0 },
  reg_date: { type: Date, default: Date.now }
});
const EstimateResponseSchema = new Schema({
  estimate_request: { type: Schema.ObjectId, ref: 'EstimateRequest', required: true },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  item: [{ type: String }],
  cost: [{ type: String }],
  note: [{ type: String }],
  reg_date: { type: Date, default: Date.now }
}) 


const reviewSchema = new Schema({
  user_business: { type: Schema.ObjectId, ref: 'User' },
  user_personal: { type: Schema.ObjectId, ref: 'User' },
  rating: { type: Number },
  content: { type: String },
  reg_date: { type: Date, default: Date.now },
})

const ChatRoomSchema = new Schema({
  member:[{ type: Schema.ObjectId }]
})

const ChatContentSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  content: { type: String },
  room: { type: Schema.ObjectId },
  reg_date: { type: Date, default: Date.now }
})

const FileSchema = new Schema({
  parent: { type: Schema.ObjectId },
  name: { type: String },
  md_name: { type: String }
}) 

const BlogPostSchema = new Schema({
  title: { type: String },
  content: { type: String },
  reg_date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId },
  account: { type: String }
})

const BlogCommentSchema = new Schema({
  parent: { type: Schema.ObjectId },
  content: { type: String }
})


const User = mongoose.model('User', UserSchema)
const EstimateItem = mongoose.model('EstimateItem', EstimateItemSchema)
const EstimateItemDetail = mongoose.model('EstimateItemDetail', EstimateItemDetailSchema)
const EstimateRequest = mongoose.model('EstimateRequest', EstimateRequestSchema)
const EstimateResponse = mongoose.model('EstimateResponse', EstimateResponseSchema)
const Review = mongoose.model('Review', reviewSchema)
const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema)
const ChatContent = mongoose.model('ChatContent', ChatContentSchema)
const File = mongoose.model('File', FileSchema)

const Notice = mongoose.model('Notice', BlogPostSchema)
const Event = mongoose.model('Event', BlogPostSchema)
const Faq = mongoose.model('Faq', BlogPostSchema)
const Message = mongoose.model('Message', BlogPostSchema)
const QnaQuestion = mongoose.model('QnaQuestion', BlogPostSchema)
const QnaAnswer = mongoose.model('QnaAnswer', BlogCommentSchema)


const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  }
})

const Token = mongoose.model('Token', tokenSchema)

exports.Token = Token

exports.User = User
exports.EstimateItem = EstimateItem
exports.EstimateItemDetail = EstimateItemDetail
exports.EstimateRequest = EstimateRequest
exports.EstimateResponse = EstimateResponse
exports.Review = Review
exports.ChatRoom = ChatRoom
exports.ChatContent = ChatContent
exports.File = File

exports.Notice = Notice
exports.Event = Event
exports.Faq = Faq
exports.QnaQuestion = QnaQuestion
exports.QnaAnswer = QnaAnswer
exports.Message = Message



