function doSomething(callback) {
  Model.EstimateItem.find().exec(function (err, results) {
    callback(results[0])
  })
}
function doSomethingElse(data, callback) {
  Model.EstimateItemDetail.find({ 'estimate_item': data }).exec(function (err, results) {
    callback(results)
  })
}
function doThirdThing(data) {
  res.render('estimate_form', { 
    title: 'Estimate form', 
  })
}
doSomething(function (result) { doSomethingElse(result, doThirdThing) })


function first(callback) {
  var estimate_requests;

  Model.EstimateRequest.find().populate('platform').exec(function (err, results) {
    // estimate_requests = results
    // callback(estimate_requests)
    console.log(results[0])
  })
}

function second(estimate_requests, callback) {
  for (i=0; i<estimate_requests.length; i++) {
    Model.EstimateResponse.countDocuments({ 'estimate_request': estimate_requests[i]._id }, function (err, results) {
      estimate_requests[i].count = results
      if (i===3) {
        callback(estimate_requests)
      }
    })
  }
}

function third(data) {
  res.render('estimate_request_list', { 
    title: 'Estimate requests', 
    estimate_requests: data
  })
}

  // if (!(req.body.platform instanceof Array)) {
  //   if (typeof req.body.platform==='undefined')
  //   req.body.platform=[]
  //   else
  //   req.body.platform=new Array(req.body.platform)
  // }

// function (req, res, next) {

  // function doSomething(callback) {
  //   Model.EstimateCompany.findById('612db970e49ade1a3d78c29b').exec(function (err, results) {
  //     callback(results, results.company)
  //   })
  // }

  // function doSomethingElse(data1, data2) {
  //   Model.CompanyReview.find({'company': data2}).exec(function (err, results) {
  //     console.log(data1)
  //     console.log(results)
  //     res.render('test', { title: 'test', results: results })
  //   })
  // }

  // doSomething(doSomethingElse)

  // var bunny = new Model.User({
  //   city: '6127581b3eef7c51a4095713',
  //   _id: req.session.user
  // })

  // Model.User.findByIdAndUpdate(req.session.user, bunny, {}, function (err, results) {
  //   if (err) { return next(err) }
  //   console.log('so good')
  // })

  // Model.User.updateMany({ city: '6127581b3eef7c51a4095715' }, function (err, results) {
  //   console.log('so good')
  // })
// }

function estimateRequestCreate(user_id, platform, business, goal, start_day, how_long, cost, city, feedback, cb) {
  estimate_request_detail = {
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

  var estimate_request = new Model.EstimateRequest(estimate_request_detail)

  estimate_request.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Estimate: ' + estimate_request)
      cb(err, null)
      return
    }
    console.log('New Estimate: ' + estimate_request)
    estimate_requests.push(estimate_request)
    cb(null, estimate_request)
  })
}


function createEstimateRequests(cb) {
  async.parallel([
    function (callback) {
      estimateRequestCreate(
        user_personals[0]._id, 
        [platforms[0]._id,], 
        [businesses[0]._id, businesses[2]._id,], 
        [goals[0]._id, goals[3],], 
        [start_days[1]._id,], 
        [how_longs[2]._id,], 
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
        [start_days[1]._id,], 
        [how_longs[2]._id,], 
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
        [start_days[0]._id,], 
        [how_longs[2]._id,], 
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
        [start_days[0]._id,], 
        [how_longs[3]._id,], 
        [costs[1]._id,], 
        [cities[0]._id,], 
        [feedbacks[1]._id,], 
        callback
        )
    },
  ], 
  cb);
}