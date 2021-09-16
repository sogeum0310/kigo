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
    platforms: data
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
