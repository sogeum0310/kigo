const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')
const { DateTime } = require("luxon");  //for date handling


// Test 
exports.Test = mongoose.model('Test', new Schema({
  name: { type: String }, reg_date: { type: Date, default: Date.now() + 32400000 } 
}))

// Estimate form 
const EstimateTopicSchema = new Schema({
  name: { type: String }
})

const EstimateItemSchema = new Schema({
  name: { type: String },
  topic: { type: Schema.ObjectId }
})

const EstimateItemDetailSchema = new Schema({
  name: { type: String },
  item: { type: Schema.ObjectId, ref: 'EstimateItem' },
  input_type: { type: String },
  input_name: { type: String },
  text: { type: Boolean, default: false },
})

const EstimateTextSchema = new Schema({
  estimate_result: { type: Schema.ObjectId },
  item: { type: Schema.ObjectId },
  detail: { type: Schema.ObjectId },
  text: { type: String }
})

const KigoAdminSchema = new Schema({
  username: { type: String },
  password: { type: String },
  salt: { type: String }
})

// User 
const UserSchema = new Schema({
  // Profile
  username: { type: String },
  password: { type: String },
  salt: { type: String },
  name: { type: String },
  gender: { type: String },
  date_of_birth: { type: String },
  phone: { type: String },
  email: { type: String },
  about: { type: String },
  city: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  platform: [{ type: Schema.ObjectId, ref: 'EstimateTopic' }],
  // Date data
  service: { type: Boolean },
  reg_date: { type: Date },
  start_date: { type: Date },
  // Account
  account: { type: String },
  social: { type: Boolean },
  authorization: { type: Boolean },
  online: { type: Boolean },
  drop: { type: Boolean },
  // Level
  level: { type: Number },
  review: { type: Number },
  score: { type: Number },
  contract: { type: Number }
})
UserSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});

UserSchema.plugin(mongoosePaginate)

// Estimate request and response
const EstimateRequestSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  topic: { type: Schema.ObjectId, ref: 'EstimateTopic' },
  field1: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field2: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field3: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field4: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field5: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field6: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field7: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field8: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field9: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  field10: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }],
  content: { type: String },
  count:  { type: Number },
  views: [{ type: Schema.ObjectId }],
  drop: [{ type: Schema.ObjectId }],
  reg_date: { type: Date }
});

const EstimateResponseSchema = new Schema({
  estimate_request: { type: Schema.ObjectId, ref: 'EstimateRequest', required: true },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  item: [{ type: String }],
  cost: [{ type: String }],
  note: [{ type: String }],
  submit: { type: Boolean },
  reg_date: { type: Date }
}) 

// Chat
var ChatRoomSchema = new Schema({
  user: [{ type: Schema.ObjectId, ref: 'User' }],
  active: { type: Boolean },
  reg_date: { type: Date }
})

var ChatContentSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  content: { type: String },
  room: { type: Schema.ObjectId },
  read: [{ type: Schema.ObjectId }],
  reg_date: { type: Date }
})

// File 
const FileSchema = new Schema({
  table: { type: String },
  parent: { type: Schema.ObjectId },
  name: { type: String },
  md_name: { type: String },
  reg_date: { type: Date, default: Date.now() + 32400000 }
}) 

// Blog
const BlogPostSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  title: { type: String },
  content: { type: String },
  account: { type: String },
  reg_date: { type: Date, default: Date.now() + 32400000 },
})

const BlogCommentSchema = new Schema({
  parent: { type: Schema.ObjectId },
  coc: { type: Boolean },
  bites: { type: Schema.ObjectId, ref: 'User' },
  user: { type: Schema.ObjectId, ref: 'User' },
  content: { type: String },
  rating: { type: Number },
  reg_date: { type: Date, default: Date.now() + 32400000 }
})


// Token
const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  token: { type: String, required: true, },
  createdAt: { type: Date, default: Date.now() + 32400000, expires: 3600}
})


// User
exports.KigoAdmin = mongoose.model('KigoAdmin', KigoAdminSchema)
exports.User = mongoose.model('User', UserSchema)

// Estimate form
exports.EstimateTopic = mongoose.model('EstimateTopic', EstimateTopicSchema)
exports.EstimateItem = mongoose.model('EstimateItem', EstimateItemSchema)
exports.EstimateItemDetail = mongoose.model('EstimateItemDetail', EstimateItemDetailSchema)
exports.EstimateText = mongoose.model('EstimateText', EstimateTextSchema)

// Estimate request and response
exports.EstimateRequest = mongoose.model('EstimateRequest', EstimateRequestSchema)
exports.EstimateResponse = mongoose.model('EstimateResponse', EstimateResponseSchema)

// Blog 
exports.Notice = mongoose.model('Notice', BlogPostSchema)
exports.Event = mongoose.model('Event', BlogPostSchema)
exports.Faq = mongoose.model('Faq', BlogPostSchema)
exports.QnaQuestion = mongoose.model('QnaQuestion', BlogPostSchema)
exports.QnaAnswer = mongoose.model('QnaAnswer', BlogCommentSchema)
exports.Message = mongoose.model('Message', BlogPostSchema)
exports.Community = mongoose.model('Community', BlogPostSchema)
exports.CommunityComment = mongoose.model('CommunityComment', BlogCommentSchema)

// Others
exports.Review = mongoose.model('Review', BlogCommentSchema)
exports.File = mongoose.model('File', FileSchema)

// Chat
exports.ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema)
exports.ChatContent = mongoose.model('ChatContent', ChatContentSchema)

// Token for lost password
exports.Token = mongoose.model('Token', tokenSchema)