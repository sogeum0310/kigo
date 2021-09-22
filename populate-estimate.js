var Model = require('./models/model')


function createEstimateRequest(user_id, platform, how_many, business, goal, start_day, how_long, cost, city, feedback) {
  var estimate_request = new Model.EstimateRequest({
    user_id: user_id, 
    platform: platform,
    how_many: how_many,
    business: business,
    goal: goal,
    start_day: start_day,
    how_long: how_long,
    cost: cost,
    city: city,
    feedback: feedback
  })
  // estimate_request.save()
  console.log(estimate_request)
}

function estimateResponseCreate(estimate_request, user_id, item, cost, note, cb) {
  var estimate_response = new Model.EstimateResponse({
    estimate_request: estimate_request, 
    user_id: user_id,
    item: item,
    cost: cost,
    note: note,
  })
  // estimate_response.save()
  console.log(estimate_response)
}

