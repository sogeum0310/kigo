var mongoose = require('mongoose');
const { DateTime } = require('luxon')

var Schema = mongoose.Schema

var UserCompanySchema = new Schema({
  user_id : { type: String, required: true, maxLength: 100 },
  password : { type: String, required: true, maxLength: 100 },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  about: { type: String },
  platform: [{ type: Schema.ObjectId, ref: 'Platform'}]
});

module.exports = mongoose.model('UserCompany', UserCompanySchema)