var async = require('async')
var Model = require('./models/model')


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kigo', { useNewUrlParser: true, useUnifiedTopology: true });


var estimate_items = [];
var estimate_item_details = [];

var cities = [];

var user_personals = []
var user_businesses = []

var estimate_requests = []
var estimate_responses = []

var business_reviews = []


function estimateItemCreate(name, cb) {
  var estimate_item = new Model.EstimateItem({ name: name })

  estimate_item.save(function (err) {
    if (err) {
      console.log('ERROR CREATING EstimateItem: ' + estimate_item)
      cb(err, null)
      return
    }
    console.log('New EstimateItem: ' + estimate_item)
    estimate_items.push(estimate_item)
    cb(null, estimate_item)
  })
}

function estimateItemDetailCreate(name, estimate_item, cb) {
  var estimate_item_detail = new Model.EstimateItemDetail({
    name: name,
    estimate_item: estimate_item
  })

  estimate_item_detail.save(function (err) {
    if (err) {
      console.log('ERROR CREATING EstimateItemDetail: ' + estimate_item_detail)
      cb(err, null)
      return
    }
    console.log('New EstimateItemDetail: ' + estimate_item_detail)


    estimate_item_details.push(estimate_item_detail)
    cities.push()


    cb(null, estimate_item_detail)
  })
}

function userPersonalCreate(user_id, password, name, gender, date_of_birth, city, phone, email, cb) {
  user_personal_detail = {
    user_id: user_id,
    password: password,
    name: name,
    gender: gender, 
    date_of_birth: date_of_birth,
    phone: phone,
    email: email
  }

  if (city != false) user_personal_detail.city = city

  var user_personal = new Model.UserPersonal(user_personal_detail)

  user_personal.save(function (err) {
    if (err) {
      console.log('ERROR CREATING User: ' + user_personal)
      cb(err, null)
      return
    }
    console.log('New User: ' + user_personal)
    user_personals.push(user_personal)
    cb(null, user_personal)
  })
}

function userBusinessCreate(user_id, password, name, phone, email, about, city, platform, cb) {
  user_business_detail = {
    user_id: user_id,
    password: password,
    name: name,
    phone: phone,
    email: email,
    about: about,
  }

  if (city != false) user_business_detail.city = city
  if (platform != false) user_business_detail.platform = platform

  var user_business = new Model.UserBusiness(user_business_detail)

  user_business.save(function (err) {
    if (err) {
      console.log('ERROR CREATING UserBusiness: ' + user_business)
      cb(err, null)
      return
    }
    console.log('New UserBusiness: ' + user_business);
    user_businesses.push(user_business)
    cb(null, user_business)
  })
}

function estimateRequestCreate(user_id, platform, business, goal, start_day, how_long, cost, city, feedback, cb) {
  estimate_detail = {
    user_id: user_id,
    platform: platform,
    business: business,
    goal: goal,
    start_day: start_day,
    how_long: how_long,
    cost: cost,
    city: city,
    feedback: feedback
  }

  var estimate_request = new Model.EstimatePersonal(estimate_detail)

  estimate_request.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Estimate: ' + estimate_request)
      cb(err, null)
      return
    }
    console.log('New Estimate: ' + estimatepersonal)
    estimate_requests.push(estimate_request)
    cb(null, estimate_request)
  })
}

function estimateResponseCreate(estimate_request, user_id, item, cost, note, cb) {
  estimate_response_detail = {
    estimate_request: estimate_request, 
    user_id: user_id,
    item: item,
    cost: cost,
    note: note,
  }

  var estimate_response = new Model.EstimateBusiness(estimate_responsedetail)

  estimate_response.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New EstimateBusiness: ' + estimate_response)
    estimate_responses.push(estimate_response)
    cb(null, estimate_response)
  })
}

function businessReviewCreate(user_business, user_personal, content, cb) {
  business_reviewdetail = {
    user_business: user_business,
    user_personal: user_personal,
    content: content
  }

  var business_review = new Model.BusinessReview(business_reviewdetail)

  business_review.save(function (err) {
    if (err) {
      console.log('ERROR CREATING BusinessReview: ' + business_review)
      cb(err, null)
      return
    }
    console.log('New BusinessReview: ' + business_review)
    business_reviews.push(business_review)
    cb(null, business_review)
  })
}

function createEstimateItems(cb) {
  async.series([
    function (callback) {
      estimateItemCreate('Plaform', callback)
    },
    function (callback) {
      estimateItemCreate('Business', callback)
    },
    function (callback) {
      estimateItemCreate('Goal', callback)
    },
    function (callback) {
      estimateItemCreate('Start day', callback)
    },
    function (callback) {
      estimateItemCreate('How long', callback)
    },
    function (callback) {
      estimateItemCreate('Cost', callback)
    },
    function (callback) {
      estimateItemCreate('City', callback)
    },
    function (callback) {
      estimateItemCreate('Feeback', callback)
    },
  ],
  cb)
}

function createEstimateItemDetails(cb) {
  async.series([
    // Platform
    function (callback) {
      estimateItemDetailCreate('Online', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Commercial', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Promotion', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('SEO', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Viral', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('SNS', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Influencer', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Public', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Banner', estimate_items[0], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Global', estimate_items[0], callback)
    },
    // Business
    function (callback) {
      estimateItemDetailCreate('Product', estimate_items[1], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Education', estimate_items[1], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Food', estimate_items[1], callback)
    },
    function (callback) {
      estimateItemDetailCreate('House', estimate_items[1], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Hospital', estimate_items[1], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Shopping', estimate_items[1], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Fashion', estimate_items[1], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Web service', estimate_items[1], callback)
    },
    // Goal
    function (callback) {
      estimateItemDetailCreate('To increate sales', estimate_items[2], callback)
    },
    function (callback) {
      estimateItemDetailCreate('To branding', estimate_items[2], callback)
    },
    function (callback) {
      estimateItemDetailCreate('To attract people', estimate_items[2], callback)
    },
    function (callback) {
      estimateItemDetailCreate('To promote product', estimate_items[2], callback)
    },
    // Start day
    function (callback) {
      estimateItemDetailCreate('After a talk', estimate_items[3], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Within a week', estimate_items[3], callback)
    },
    // How long
    function (callback) {
      estimateItemDetailCreate('Just once', estimate_items[4], callback)
    },
    function (callback) {
      estimateItemDetailCreate('A month', estimate_items[4], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Three months', estimate_items[4], callback)
    },
    function (callback) {
      estimateItemDetailCreate('One year', estimate_items[4], callback)
    },
    // Cost
    function (callback) {
      estimateItemDetailCreate('Instant payment', estimate_items[5], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Pay per month', estimate_items[5], callback)
    },
    function (callback) {
      estimateItemDetailCreate('After a talk', estimate_items[5], callback)
    },
    // City
    function (callback) {
      estimateItemDetailCreate('Seoul', estimate_items[6], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Incheon', estimate_items[6], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Busan', estimate_items[6], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Jeju', estimate_items[6], callback)
    },
    // Feedback
    function (callback) {
      estimateItemDetailCreate('Calling', estimate_items[7], callback)
    },
    function (callback) {
      estimateItemDetailCreate('Online chatting', estimate_items[7], callback)
    },
  ],
  cb)
}

function createUserPersonals(cb) {
  async.parallel([
    function (callback) {
      userPersonalCreate('bunny', '123', 'so cute', 'male', '1990-12-13', false, '01022223333', 'bunny@example.com', callback)
    }, 
    function (callback) {
      userPersonalCreate('bird', '123', 'fly high', 'male', '1988-06-24', false, '01022223333', 'bird@example.com', callback)
    }, 
    function (callback) {
      userPersonalCreate('monkey', '123', 'love tree', 'female', '1996-03-11', false, '01022223333', 'monkey@example.com', callback)
    }, 
    function (callback) {
      userPersonalCreate('dog', '123', 'bark again', 'male', '2001-11-04', false, '01022223333', 'dog@example.com', callback)
    }, 
  ],
  cb)
}

function createUserBusinesses(cb) {
  async.parallel([
    function (callback) {
      userBusinessCreate('apple', '123', 'red green', '01011112222', 'apple@example.com', 'We are selling apple', false, false, callback)
    },
    function (callback) {
      userBusinessCreate('banana', '123', 'yellow gold', '01011112222', 'banana@example.com', 'We are selling banana', false, false, callback)
    },
    function (callback) {
      userBusinessCreate('strawberry', '123', 'deep red', '01011112222', 'strawberry@example.com', 'We are selling strawberry', false, false, callback)
    },
  ], 
  cb)
}

function createEstimateRequests(cb) {
  async.parallel([
    function (callback) {
      estimateRequestCreate(
        user_personals[0]._id, 
        [platforms[0]._id,], 
        [businesses[0]._id, businesses[2]._id,], 
        [goals[0]._id, goals[3],], 
        [startdays[1]._id,], 
        [howlongs[2]._id,], 
        [costs[0]._id,], 
        [cities[3]._id,], 
        [feedbacks[0]._id,], 
        callback
        )
    },
    function (callback) {
      estimateRequestCreate(
        user_personals[0]._id, 
        [platforms[2]._id,], 
        [businesses[5]._id, businesses[6]._id,], 
        [goals[2]._id, goals[3]._id,], 
        [startdays[1]._id,], 
        [howlongs[2]._id,], 
        [costs[2]._id,], 
        [cities[1]._id,], 
        [feedbacks[1]._id,], 
        callback
        )
    },
    function (callback) {
      estimateRequestCreate(
        user_personals[0]._id, 
        [platforms[4]._id,], 
        [businesses[1]._id,businesses[3]._id,businesses[4]._id,], 
        [goals[1]._id, goals[3]._id,], 
        [startdays[0]._id,], 
        [howlongs[2]._id,], 
        [costs[1]._id,], 
        [cities[1]._id,], 
        [feedbacks[1]._id,], 
        callback
        )
    },
    function (callback) {
      estimateRequestCreate(
        user_personals[1]._id, 
        [platforms[7]._id,], 
        [businesses[5]._id, businesses[6]._id,], 
        [goals[1]._id,], 
        [startdays[0]._id,], 
        [howlongs[3]._id,], 
        [costs[1]._id,], 
        [cities[0]._id,], 
        [feedbacks[1]._id,], 
        callback
        )
    },
  ], 
  cb);
}

function createEstimateResponses(cb) {
  async.series([
    function (callback) {
      estimateResponseCreate(estimates[0], user_businesses[0], ['take a photo', 'blog posting', 'TV commercial'], ['500', '300', '600'], ['We use a DSLR Camera', '', 'including YouTube'], callback)
    },
    function (callback) {
      estimateResponseCreate(estimates[0], user_businesses[1], ['blog posting', 'increasing SNS follower'], ['400', '550'], ['per 10 blogs', 'Our main target is Instagram'], callback)
    },
  ],
  cb)
}

function createBusinessReviews(cb) {
  async.parallel([
    function (callback) {
      businessReviewCreate(user_businesses[0], user_personals[0], 'Good service, but expensive!', callback)
    },
    function (callback) {
      businessReviewCreate(user_businesses[0], user_personals[1], 'highly recommended.', callback)
    },
    function (callback) {
      businessReviewCreate(user_businesses[0], user_personals[2], 'I do not recommend', callback)
    },
    function (callback) {
      businessReviewCreate(user_businesses[0], user_personals[3], 'Still good in every aspects', callback)
    },
  ], 
  cb)
} 


async.series([
  createEstimateItems,
  createEstimateItemDetails,
  createUserPersonals,
  createUserBusinesses,
  createEstimateRequests,
  createEstimateResponses,
  createBusinessReviews,
],
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('FINAL RESULTS: ' + results)
  }
  mongoose.connection.close()
})


