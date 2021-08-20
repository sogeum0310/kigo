var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EstimateCompanySchema = new Schema({
    estimate: { type: Schema.ObjectId, ref: 'Estimate', required: true },
    company: { type: Schema.ObjectId, ref: 'Company', required: true },
    unit: [{ type: String, ref: 'Unit' }],
    cost: [{ type: String, ref: 'Cost' }],
    msg: [{ type: String, ref: 'Msg' }]
});


// Export model.
module.exports = mongoose.model('EstimateCompany', EstimateCompanySchema);
