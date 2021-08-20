var mongoose = require('mongoose');
const { DateTime } = require('luxon')

var Schema = mongoose.Schema

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

UserSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
  return DateTime.fromJSDate(this.date_of_birth).toISODate();
})

module.exports = mongoose.model('User', UserSchema)