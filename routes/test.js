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

// hey


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

first(function (result) { second(result, third) })

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
