var mongoose = require('mongoose')
var Schema = mongoose.Schema

// to personal or business account
var UserSchema = new Schema({
  user_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  gender: { type: String },
  date_of_birth: { type: Date },
  city: { type: String },
  phone: { type: String },
  email: { type: String }
});

var UserCompanySchema = new Schema({
  user_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  about: { type: String },
  platform: [{ type: Schema.ObjectId, ref: 'Platform'}]
});

var EstimateItemSchema = new Schema({
  name: { type: String },
  detail: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }]
})

var EstimateItemDetailSchema = new Schema({
  name: { type: String },
})

var EstimateSchema = new Schema({
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

var EstimateCompanySchema = new Schema({
  estimate: { type: Schema.ObjectId, ref: 'Estimate', required: true },
  company: { type: Schema.ObjectId, ref: 'UserCompany', required: true },
  item: [{ type: String }],
  cost: [{ type: String }],
  note: [{ type: String }],
}) 

var CompanyReviewSchema = new Schema({
  company: { type: Schema.ObjectId, ref: 'UserCompany' },
  user: { type: Schema.ObjectId, ref: 'User' },
  content: { type: String },
})


var User = mongoose.model('User', UserSchema)
var UserCompany = mongoose.model('UserCompany', UserCompanySchema)
var EstimateItem = mongoose.model('EstimateItem', EstimateItemSchema)
var EstimateItemDetail = mongoose.model('EstimateItemDetail', EstimateItemDetailSchema)
var Estimate = mongoose.model('Estimate', EstimateSchema)
var EstimateCompany = mongoose.model('EstimateCompany', EstimateCompanySchema)
var CompanyReview = mongoose.model('CompanyReview', CompanyReviewSchema);


exports.User = User
exports.UserCompany = UserCompany
exports.EstimateItem = EstimateItem
exports.EstimateItemDetail = EstimateItemDetail
exports.Estimate = Estimate
exports.EstimateCompany = EstimateCompany
exports.CompanyReview = CompanyReview