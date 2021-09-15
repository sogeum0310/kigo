
// Import Model 
// DB connection

var estimateitemdetails = [];

var platforms = []
var businesses = []
var goals = []
var startdays = []
var howlongs = []
var costs = []
var cities = []
var feedbacks = []

var estimateitems = [];

var estimates = []

var users = []
var usercompanies = []

var estimatecompanies = []
var companyreviews = []


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

function userCreate(user_id, password, name, gender, date_of_birth, city, phone, email, cb) {
  userdetail = {
    user_id: user_id,
    password: password,
    name: name,
    gender: gender, 
    date_of_birth: date_of_birth,
    city: city,
    phone: phone,
    email: email
  }

  var user = new User(userdetail)

  user.save(function (err) {
    if (err) {
      console.log('ERROR CREATING User: ' + user)
      cb(err, null)
      return
    }
    console.log('New User: ' + user)
    users.push(user)
    cb(null, user)
  })
}

function userCompanyCreate(user_id, password, name, phone, email, about, platform, cb) {
  usercompanydetail = {
    user_id: user_id,
    password: password,
    name: name,
    phone: phone,
    email: email,
    about: about,
  }

  if (platform != false) usercompanydetail.platform = platform

  var usercompany = new UserCompany(usercompanydetail)

  usercompany.save(function (err) {
    if (err) {
      console.log('ERROR CREATING UserCompany: ' + usercompany)
      cb(err, null)
      return
    }
    console.log('New UserCompany: ' + usercompany);
    usercompanies.push(usercompany)
    cb(null, usercompany)
  })
}

function estimateCreate(user_id, platform, business, goal, start_day, how_long, cost, city, feedback, cb) {
  estimatedetail = {
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

  var estimate = new Estimate(estimatedetail)

  estimate.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Estimate: ' + estimate)
      cb(err, null)
      return
    }
    console.log('New Estimate: ' + estimate)
    estimates.push(estimate)
    cb(null, estimate)
  })
}

function estimateCompanyCreate(estimate, company, item, cost, note, cb) {
  estimatecompanydetail = {
    estimate: estimate, 
    company: company,
    item: item,
    cost: cost,
    note: note,
  }

  var estimatecompany = new EstimateCompany(estimatecompanydetail)

  estimatecompany.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New EstimateCompany: ' + estimatecompany)
    estimatecompanies.push(estimatecompany)
    cb(null, estimatecompany)
  })
}

function companyReviewCreate(company, user, content, cb) {
  companyreviewdetail = {
    company: company,
    user: user,
    content: content
  }

  var companyreview = new CompanyReview(companyreviewdetail)

  companyreview.save(function (err) {
    if (err) {
      console.log('ERROR CREATING CompanyReview: ' + companyreview)
      cb(err, null)
      return
    }
    console.log('New CompanyReview: ' + companyreview)
    companyreviews.push(companyreview)
    cb(null, companyreview)
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

function createUsers(cb) {
  async.parallel([
    function (callback) {
      userCreate('bunny', '123', 'so cute', 'male', '1990-12-13', [cities[0]], '01022223333', 'bunny@example.com', callback)
    }, 
    function (callback) {
      userCreate('bird', '123', 'fly high', 'male', '1988-06-24', [cities[0]], '01022223333', 'bird@example.com', callback)
    }, 
    function (callback) {
      userCreate('monkey', '123', 'love tree', 'female', '1996-03-11', [cities[0]], '01022223333', 'monkey@example.com', callback)
    }, 
    function (callback) {
      userCreate('dog', '123', 'bark again', 'male', '2001-11-04', [cities[0]], '01022223333', 'dog@example.com', callback)
    }, 
  ],
  cb)
}

function createUserCompanies(cb) {
  async.parallel([
    function (callback) {
      userCompanyCreate('apple', '123', 'red green', '01011112222', 'apple@example.com', 'We are selling apple', [platforms[0]], false, callback)
    },
    function (callback) {
      userCompanyCreate('banana', '123', 'yellow gold', '01011112222', 'banana@example.com', 'We are selling banana', [platforms[0]], false, callback)
    },
    function (callback) {
      userCompanyCreate('strawberry', '123', 'deep red', '01011112222', 'strawberry@example.com', 'We are selling strawberry', [platforms[0]], false, callback)
    },
  ], 
  cb)
}

function createEstimates(cb) {
  async.parallel([
    function (callback) {
      estimateCreate(
        users[0]._id, 
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
      estimateCreate(
        users[0]._id, 
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
      estimateCreate(
        users[0]._id, 
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
      estimateCreate(
        users[1]._id, 
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

function createEstimateCompanies(cb) {
  async.series([
    function (callback) {
      estimateCompanyCreate(estimates[0], usercompanies[0], ['take a photo', 'blog posting', 'TV commercial'], ['500', '300', '600'], ['We use a DSLR Camera', '', 'including YouTube'], callback)
    },
    function (callback) {
      estimateCompanyCreate(estimates[0], usercompanies[1], ['blog posting', 'increasing SNS follower'], ['400', '550'], ['per 10 blogs', 'Our main target is Instagram'], callback)
    },
  ],
  cb)
}

function createCompanyReviews(cb) {
  async.parallel([
    function (callback) {
      companyReviewCreate(usercompanies[0], users[0], 'Good service, but expensive!', callback)
    },
    function (callback) {
      companyReviewCreate(usercompanies[0], users[1], 'highly recommended.', callback)
    },
    function (callback) {
      companyReviewCreate(usercompanies[0], users[2], 'I do not recommend', callback)
    },
    function (callback) {
      companyReviewCreate(usercompanies[0], users[3], 'Still good in every aspects', callback)
    },
  ], 
  cb)
} 


async.series([
  createEstimateItemDetails,
  createEstimateItems,
  createUsers,
  createUserCompanies,
  createEstimates,
  createEstimateCompanies,
  createCompanyReviews,
],
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err)
  } else {
    console.log('FINAL RESULTS: ' + results)
  }
  mongoose.connection.close()
})