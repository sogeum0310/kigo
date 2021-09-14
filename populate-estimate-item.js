var mongoose = require('mongoose')
var Schema = mongoose.Schema
var async = require('async')

var EstimateItemSchema = new Schema({
  name: { type: String },
  detail: [{ type: Schema.ObjectId, ref: 'EstimateItemDetail' }]
})

var EstimateItemDetailSchema = new Schema({
  name: { type: String },
})

var EstimateItem = mongoose.model('EstimateItem', EstimateItemSchema)
var EstimateItemDetail = mongoose.model('EstimateItemDetail', EstimateItemDetailSchema)

// module.exports = EstimateItem
// exports.EstimateItem = EstimateItem
// exports.EstimateItemDetail = EstimateItemDetail

var estimateitemdetails = [];
var estimateitems = [];

function estimateItemDetailCreate(name, cb) {
  var estimateitemdetail = new EstimateItemDetail({
    name: name,
  })

  estimateitemdetail.save(function (err) {
    if (err) {
      console.log('ERROR CREATING EstimateItemDetail: ' + estimateitemdetail)
      cb(err, null)
      return
    }
    console.log('New EstimateItemDetail: ' + estimateitemdetail)
    estimateitemdetails.push(estimateitemdetail)
    cb(null, estimateitemdetail)
  })
  
}

function estimateItemCreate(name, detail, cb) {
  var estimateitem = new EstimateItem({name: name, detail: detail})

  estimateitem.save(function (err) {
    if (err) {
      console.log('ERROR CREATING EstimateItem: ' + estimateitem)
      cb(err, null)
      return
    }
    console.log('New EstimateItem: ' + estimateitem)
    estimateitems.push(estimateitem)
    cb(null, estimateitem)
  })
}

function createEstimateItemDetails(cb) {
  async.series([
    // Platform
    function (callback) {
      estimateItemDetailCreate('Online', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Commercial', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Promotion', callback)
    },
    function (callback) {
      estimateItemDetailCreate('SEO', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Viral', callback)
    },
    function (callback) {
      estimateItemDetailCreate('SNS', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Influencer', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Public', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Banner', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Global', callback)
    },
    // Business
    function (callback) {
      estimateItemDetailCreate('Product', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Education', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Food', callback)
    },
    function (callback) {
      estimateItemDetailCreate('House', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Hospital', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Shopping', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Fashion', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Web service', callback)
    },
    // Goal
    function (callback) {
      estimateItemDetailCreate('To increate sales', callback)
    },
    function (callback) {
      estimateItemDetailCreate('To branding', callback)
    },
    function (callback) {
      estimateItemDetailCreate('To attract people', callback)
    },
    function (callback) {
      estimateItemDetailCreate('To promote product', callback)
    },
    // Start day
    function (callback) {
      estimateItemDetailCreate('After a talk', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Within a week', callback)
    },
    // How long
    function (callback) {
      estimateItemDetailCreate('Just once', callback)
    },
    function (callback) {
      estimateItemDetailCreate('A month', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Three months', callback)
    },
    function (callback) {
      estimateItemDetailCreate('One year', callback)
    },
    // Cost
    function (callback) {
      estimateItemDetailCreate('Instant payment', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Pay per month', callback)
    },
    function (callback) {
      estimateItemDetailCreate('After a talk', callback)
    },
    // City
    function (callback) {
      estimateItemDetailCreate('Seoul', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Incheon', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Busan', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Jeju', callback)
    },
    // Feedback
    function (callback) {
      estimateItemDetailCreate('Calling', callback)
    },
    function (callback) {
      estimateItemDetailCreate('Online chatting', callback)
    },
  ],
  cb)
}

function createEstimateItems(cb) {
  async.series([
    function (callback) {
      estimateItemCreate('Plaform', 
      [
        estimateitemdetails[0],
        estimateitemdetails[1],
        estimateitemdetails[2],
        estimateitemdetails[3],
        estimateitemdetails[4],
        estimateitemdetails[5],
        estimateitemdetails[6],
        estimateitemdetails[7],
        estimateitemdetails[8],
        estimateitemdetails[9],
      ],
      callback)
    },
    function (callback) {
      estimateItemCreate('Business', 
      [
        estimateitemdetails[10],
        estimateitemdetails[11],
        estimateitemdetails[12],
        estimateitemdetails[13],
        estimateitemdetails[14],
        estimateitemdetails[15],
        estimateitemdetails[16],
        estimateitemdetails[17],
      ], 
      callback)
    },
    function (callback) {
      estimateItemCreate('Goal', [
        estimateitemdetails[18],
        estimateitemdetails[19],
        estimateitemdetails[20],
        estimateitemdetails[21],
      ], callback)
    },
    function (callback) {
      estimateItemCreate('Start day', 
      [
        estimateitemdetails[22],
        estimateitemdetails[23],
      ], 
      callback)
    },
    function (callback) {
      estimateItemCreate('How long', [
        estimateitemdetails[24],
        estimateitemdetails[25],
        estimateitemdetails[26],
        estimateitemdetails[27],
      ], callback)
    },
    function (callback) {
      estimateItemCreate('Cost', [
        estimateitemdetails[28],
        estimateitemdetails[29],
        estimateitemdetails[30],  
      ], callback)
    },
    function (callback) {
      estimateItemCreate('City', [
        estimateitemdetails[31],
        estimateitemdetails[32],
        estimateitemdetails[33],
        estimateitemdetails[34],
      ],
      callback)
    },
    function (callback) {
      estimateItemCreate('Feeback', [
        estimateitemdetails[35],
        estimateitemdetails[36],
      ], callback)
    },
  ],
  cb)
}



async.series([
  createEstimateItemDetails,
  createEstimateItems,
],
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('ESTIMATEItemdetails' + estimateitemdetails)

    console.log('Pizza has arrived: ')
    console.log(estimateitems)
    console.log(estimateitemdetails)
  }
  mongoose.connection.close()
})
