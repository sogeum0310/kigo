var mongoose = require('mongoose')
var Schema = mongoose.Schema


var EstimateItemSchema = new Schema({
  name: { type: String }
})

var EstimateItemDetailSchema = new Schema({
  name: { type: String },
  estimate_item: { type: Schema.ObjectId, ref: 'EstimateItem' }
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

var UserBusinessSchema = new Schema({
  user_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  about: { type: String },
  city: [{ type:Schema.ObjectId }],
  platform: [{ type: Schema.ObjectId }]
});

var EstimateRequestSchema = new Schema({
  user_id: { type: Schema.ObjectId, ref: 'User' },
  platform : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  business : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  goal : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  start_day : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  how_long : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  cost : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  city : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  feedback : [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }]
});

var EstimateResponseSchema = new Schema({
  estimate_request: { type: Schema.ObjectId, ref: 'EstimateRequest', required: true },
  user_id: { type: Schema.ObjectId, ref: 'UserBusiness', required: true },
  item: [{ type: String }],
  cost: [{ type: String }],
  note: [{ type: String }],
}) 

var BusinessReviewSchema = new Schema({
  user_business: { type: Schema.ObjectId, ref: 'UserBusiness' },
  user_personal: { type: Schema.ObjectId, ref: 'UserPersonal' },
  content: { type: String },
})

var ChatContentSchema = new Schema({
  user_id: { type: Schema.ObjectId, ref: '' },
  content: { type: String },
  room: { type: Schema.ObjectId }
})

var FileSchema = new Schema({
  parent: { type: Schema.ObjectId },
  name: { type: String },
  md_name: { type: String }
}) 

var UserPersonal = mongoose.model('User', UserPersonalSchema)
var UserBusiness = mongoose.model('UserBusiness', UserBusinessSchema)

var EstimateItem = mongoose.model('EstimateItem', EstimateItemSchema)
var EstimateItemDetail = mongoose.model('EstimateItemDetail', EstimateItemDetailSchema)

var EstimateRequest = mongoose.model('EstimateRequest', EstimateRequestSchema)
var EstimateResponse = mongoose.model('EstimateResponse', EstimateResponseSchema)

var BusinessReview = mongoose.model('BusinessReview', BusinessReviewSchema)
var ChatContent = mongoose.model('ChatContent', ChatContentSchema)

var File = mongoose.model('File', FileSchema)


exports.UserPersonal = UserPersonal
exports.UserBusiness = UserBusiness

exports.EstimateItem = EstimateItem
exports.EstimateItemDetail = EstimateItemDetail

exports.EstimateRequest = EstimateRequest
exports.EstimateResponse = EstimateResponse

exports.BusinessReview = BusinessReview

exports.ChatContent = ChatContent

exports.File = File

// 자주묻는 질문 - Faq, 
// 공지사항 - Notice
// 이벤트 - Event
// 문의 - Ask
// 키고에 의견 주기 - Opinion

