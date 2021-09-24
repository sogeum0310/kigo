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


var UserPersonalSchema = new Schema({
  user_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  gender: { type: String },
  date_of_birth: { type: Date },
  city: [{ type: Schema.ObjectId }],
  phone: { type: String },
  email: { type: String }
});
UserPersonalSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});
var UserBusinessSchema = new Schema({
  user_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  about: { type: String },
  city: [{ type:Schema.ObjectId, ref: 'EstimateItemDetail'  }],
  platform: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }]
});
var EstimateRequestSchema = new Schema({
  user_id: { type: Schema.ObjectId, ref: 'UserPersonal' },
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
  user_id: { type: Schema.ObjectId, ref: 'UserBusiness', required: true },
  item: [{ type: String }],
  cost: [{ type: String }],
  note: [{ type: String }],
  reg_date: { type: Date, default: Date.now }
}) 


var BusinessReviewSchema = new Schema({
  user_business: { type: Schema.ObjectId, ref: 'UserBusiness' },
  user_personal: { type: Schema.ObjectId, ref: 'UserPersonal' },
  content: { type: String },
})

var ChatContentSchema = new Schema({
  user_id: { type: Schema.ObjectId },
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
  user_id: { type: Schema.ObjectId },
  account: { type: String }
})

var BlogCommentSchema = new Schema({
  parent: { type: Schema.ObjectId },
  content: { type: String }
})



var UserPersonal = mongoose.model('UserPersonal', UserPersonalSchema)
var UserBusiness = mongoose.model('UserBusiness', UserBusinessSchema)
var EstimateItem = mongoose.model('EstimateItem', EstimateItemSchema)
var EstimateItemDetail = mongoose.model('EstimateItemDetail', EstimateItemDetailSchema)
var EstimateRequest = mongoose.model('EstimateRequest', EstimateRequestSchema)
var EstimateResponse = mongoose.model('EstimateResponse', EstimateResponseSchema)
var BusinessReview = mongoose.model('BusinessReview', BusinessReviewSchema)
var ChatContent = mongoose.model('ChatContent', ChatContentSchema)
var File = mongoose.model('File', FileSchema)

var Notice = mongoose.model('Notice', BlogPostSchema)
var Event = mongoose.model('Event', BlogPostSchema)
var Faq = mongoose.model('Faq', BlogPostSchema)
var Message = mongoose.model('Message', BlogPostSchema)
var QnaQuestion = mongoose.model('QnaQuestion', BlogPostSchema)
var QnaAnswer = mongoose.model('QnaAnswer', BlogCommentSchema)


ChatContentSchema.virtual('user_personal', {
  ref: 'UserPersonal',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
})

ChatContentSchema.virtual('user_business', {
  ref: 'UserBusiness',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
})

exports.UserPersonal = UserPersonal
exports.UserBusiness = UserBusiness
exports.EstimateItem = EstimateItem
exports.EstimateItemDetail = EstimateItemDetail
exports.EstimateRequest = EstimateRequest
exports.EstimateResponse = EstimateResponse
exports.BusinessReview = BusinessReview
exports.ChatContent = ChatContent
exports.File = File

exports.Notice = Notice
exports.Event = Event
exports.Faq = Faq
exports.QnaQuestion = QnaQuestion
exports.QnaAnswer = QnaAnswer
exports.Message = Message



// 자주묻는 질문 2타입 - FaqPersonal, FaqBusiness 
// 공지사항 - Notice
// 이벤트 - Event
// 1:1 문의 - QnaQuestion QnaAnswer
// 키고에 의견 주기 - Opinion

