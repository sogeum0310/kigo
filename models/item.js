var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ItemSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 100}
});


var Platform = mongoose.model('Platform', ItemSchema);
var Business = mongoose.model('Business', ItemSchema);
var Goal = mongoose.model('Goal', ItemSchema);
var Start_day = mongoose.model('Start_day', ItemSchema);
var How_long = mongoose.model('How_long', ItemSchema);
var Cost = mongoose.model('Cost', ItemSchema);
var City = mongoose.model('City', ItemSchema);
var Feedback = mongoose.model('Feedback', ItemSchema);

exports.Platform = Platform
exports.Business = Business
exports.Goal = Goal
exports.Start_day = Start_day

exports.How_long = How_long
exports.Cost = Cost
exports.City = City
exports.Feedback = Feedback


// Platform.insertMany([
//     { name : 'Online' },
//     { name : 'Commercial' },
//     { name : 'Promotion' },
//     { name : 'SEO' },
//     { name : 'Viral' },
//     { name : 'SNS' },
//     { name : 'Influencer' },
//     { name : 'Public' },
//     { name : 'Banner' },
//     { name : 'Global' }
// ])

// Business.insertMany([
//     { name: 'Product' },
//     { name: 'Education' },
//     { name: 'Food' },
//     { name: 'House' },
//     { name: 'Hospital' },
//     { name: 'Shopping' },
//     { name: 'Fashion' },
//     { name: 'Web service' },
// ])

// Goal.insertMany([
//     { name: 'to increase sales' },
//     { name: 'to branding' },
//     { name: 'to attract people' },
//     { name: 'to promote product' },
// ])

// Start_day.insertMany([
//     { name: 'After talk' },
//     { name: 'Within a week' },
// ])

// How_long.insertMany([
//     { name: 'Just once' },
//     { name: 'A month' },
//     { name: 'Three months' },
//     { name: 'One year' },
// ])

// Cost.insertMany([
//     { name: 'One payment' },
//     { name: 'Pay per month' },
//     { name: 'After talk' },
// ])

// City.insertMany([
//     { name: 'Seoul' },
//     { name: 'Incheon' },
//     { name: 'Busan' },
//     { name: 'Jeju' },
// ])

// Feedback.insertMany([
//     { name: 'Calling' },
//     { name: 'Online chatting' },
//     { name: 'Visiting' },
// ])