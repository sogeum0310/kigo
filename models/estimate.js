var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EstimateSchema = new Schema({
    platform : [{ type: Schema.ObjectId, ref: 'Platform' }],
    business : [{ type: Schema.ObjectId, ref: 'Business' }],
    goal : [{ type: Schema.ObjectId, ref: 'Goal' }],
    start_day : [{ type: Schema.ObjectId, ref: 'Start_day' }],
    how_long : [{ type: Schema.ObjectId, ref: 'How_long' }],
    cost : [{ type: Schema.ObjectId, ref: 'Cost' }],
    city : [{ type: Schema.ObjectId, ref: 'City' }],
    feedback : [{ type: Schema.ObjectId, ref: 'Feedback' }]
});

// Virtual for this genre instance URL.
// GenreSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/genre/'+this._id;
// });

// Export model.

module.exports = mongoose.model('Estimate', EstimateSchema);

