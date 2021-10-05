const { Schema } = require("mongoose");

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
  auth: { type: Number, dafault: 0 },
  type: { type: String }

})