var mongoose = require('mongoose')
var Schema = mongoose.Schema
const { DateTime } = require("luxon");  //for date handling


var EstimateItemSchema = new Schema({
  name: { type: String }
})
var EstimateItemDetailSchema = new Schema({
  estimate_item: { type: Schema.ObjectId, ref: 'EstimateItem' },
  name: { type: String },
})

var UserSchema = new Schema({
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

var EstimateRequestSchema = new Schema({
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
var EstimateResponseSchema = new Schema({
  estimate_request: { type: Schema.ObjectId, ref: 'EstimateRequest', required: true },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  item: [{ type: String }],
  cost: [{ type: String }],
  note: [{ type: String }],
  reg_date: { type: Date, default: Date.now }
}) 


var BusinessReviewSchema = new Schema({
  user_business: { type: Schema.ObjectId, ref: 'User' },
  user_personal: { type: Schema.ObjectId, ref: 'User' },
  content: { type: String },
})

var ChatRoomSchema = new Schema({
  member:[{ type: Schema.ObjectId }]
})

var ChatContentSchema = new Schema({
  user: { type: Schema.ObjectId },
  content: { type: String },
  room: { type: Schema.ObjectId },
})

var FileSchema = new Schema({
  parent: { type: Schema.ObjectId },
  name: { type: String },
  md_name: { type: String }
}) 

var BlogPostSchema = new Schema({
  title: { type: String },
  content: { type: String },
  reg_date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId },
  account: { type: String }
})

var BlogCommentSchema = new Schema({
  parent: { type: Schema.ObjectId },
  content: { type: String }
})


var User = mongoose.model('User', UserSchema)
var EstimateItem = mongoose.model('EstimateItem', EstimateItemSchema)
var EstimateItemDetail = mongoose.model('EstimateItemDetail', EstimateItemDetailSchema)
var EstimateRequest = mongoose.model('EstimateRequest', EstimateRequestSchema)
var EstimateResponse = mongoose.model('EstimateResponse', EstimateResponseSchema)
var BusinessReview = mongoose.model('BusinessReview', BusinessReviewSchema)
var ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema)
var ChatContent = mongoose.model('ChatContent', ChatContentSchema)
var File = mongoose.model('File', FileSchema)

var Notice = mongoose.model('Notice', BlogPostSchema)
var Event = mongoose.model('Event', BlogPostSchema)
var Faq = mongoose.model('Faq', BlogPostSchema)
var Message = mongoose.model('Message', BlogPostSchema)
var QnaQuestion = mongoose.model('QnaQuestion', BlogPostSchema)
var QnaAnswer = mongoose.model('QnaAnswer', BlogCommentSchema)


var tokenSchema = new Schema({
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

var Token = mongoose.model('Token', tokenSchema)

exports.Token = Token

exports.User = User
exports.EstimateItem = EstimateItem
exports.EstimateItemDetail = EstimateItemDetail
exports.EstimateRequest = EstimateRequest
exports.EstimateResponse = EstimateResponse
exports.BusinessReview = BusinessReview
exports.ChatRoom = ChatRoom
exports.ChatContent = ChatContent
exports.File = File

exports.Notice = Notice
exports.Event = Event
exports.Faq = Faq
exports.QnaQuestion = QnaQuestion
exports.QnaAnswer = QnaAnswer
exports.Message = Message



