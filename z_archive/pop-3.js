var Model = require('./models/model')

async function getEstimateItemWithDetail() {
  var estimate_items = await Model.EstimateItem.find().exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  var how_manys = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[1]._id }).exec()
  var businesses = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[2]._id }).exec()
  var goals = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[3]._id }).exec()
  var start_days = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[4]._id }).exec()
  var how_longs = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[5]._id }).exec()
  var costs = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[6]._id }).exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var feedbacks = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[8]._id }).exec()

  var user_personals = await Model.UserPersonal.find().exec()
  var user_businesses = await Model.UserBusiness.find().exec()

  var estimate_requests = []


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
    estimate_requests.push(estimate_request._id)
  }

  function createEstimateResponse(estimate_request, user_id, item, cost, note) {
    var estimate_response = new Model.EstimateResponse({
      estimate_request: estimate_request, 
      user_id: user_id,
      item: item,
      cost: cost,
      note: note,
    })
    // estimate_response.save()
  }


  createEstimateRequest(user_personals[0]._id, [platforms[1]._id,], [how_manys[0]._id,], [businesses[1]._id,], [goals[1]._id, goals[3]._id,], [start_days[1]._id,], [how_longs[0]._id,], [costs[1]._id,], [cities[0]._id, cities[2]._id,], [feedbacks[1]._id,],)
  createEstimateRequest(user_personals[0]._id, [platforms[1]._id,], [how_manys[1]._id,], [businesses[1]._id, businesses[0]._id,], [goals[0]._id, goals[3]._id,], [start_days[0]._id,], [how_longs[2]._id,], [costs[0]._id,], [cities[1]._id,], [feedbacks[1]._id,],)
  createEstimateRequest(user_personals[0]._id, [platforms[1]._id,], [how_manys[1]._id,], [businesses[1]._id,], [goals[1]._id, goals[2]._id,], [start_days[1]._id,], [how_longs[2]._id,], [costs[1]._id,], [cities[0]._id,], [feedbacks[0]._id,],)
  createEstimateRequest(user_personals[0]._id, [platforms[0]._id,], [how_manys[2]._id,], [businesses[1]._id, businesses[2]._id,], [goals[1]._id,], [start_days[0]._id,], [how_longs[0]._id,], [costs[0]._id,], [cities[2]._id,], [feedbacks[2]._id,],)
  createEstimateRequest(user_personals[0]._id, [platforms[0]._id,], [how_manys[1]._id,], [businesses[1]._id,], [goals[0]._id, goals[1]._id,], [start_days[0]._id,], [how_longs[1]._id,], [costs[2]._id,], [cities[1]._id, cities[2]._id,], [feedbacks[1]._id,],)
  
  createEstimateRequest(user_personals[1]._id, [platforms[0]._id,], [how_manys[0]._id,], [businesses[1]._id, businesses[1]._id,], [goals[1]._id, goals[3]._id,], [start_days[0]._id,], [how_longs[2]._id,], [costs[0]._id,], [cities[0]._id, cities[1]._id,], [feedbacks[0]._id,],)
  createEstimateRequest(user_personals[1]._id, [platforms[0]._id,], [how_manys[0]._id,], [businesses[1]._id,], [goals[1]._id,], [start_days[0]._id,], [how_longs[1]._id,], [costs[1]._id,], [cities[1]._id,], [feedbacks[1]._id,],)
  createEstimateRequest(user_personals[1]._id, [platforms[0]._id,], [how_manys[1]._id,], [businesses[1]._id, businesses[2]._id,], [goals[1]._id,], [start_days[1]._id,], [how_longs[2]._id,], [costs[2]._id,], [cities[2]._id,], [feedbacks[0]._id,],)
  createEstimateRequest(user_personals[2]._id, [platforms[0]._id,], [how_manys[0]._id,], [businesses[1]._id,], [goals[3]._id,], [start_days[0]._id,], [how_longs[0]._id,], [costs[1]._id,], [cities[1]._id,], [feedbacks[0]._id,],)
  createEstimateRequest(user_personals[2]._id, [platforms[2]._id,], [how_manys[0]._id,], [businesses[1]._id,], [goals[1]._id, goals[3]._id,], [start_days[1]._id,], [how_longs[2]._id,], [costs[0]._id,], [cities[1]._id, cities[2]._id,], [feedbacks[1]._id,],)

  console.log(estimate_requests)

  createEstimateResponse(estimate_requests[0], user_businesses[0], ['nodejs', 'gatsby ', 'nextjs'], ['100', '300', '600'], ['love london', 'need cola', 'love madrid'],)
  createEstimateResponse(estimate_requests[1], user_businesses[0], ['php', 'typescript', 'firebase'], ['500', '300', '600'], ['love osaka', 'need coffee', 'love moscow'],)
  createEstimateResponse(estimate_requests[9], user_businesses[2], ['php', 'linux', 'html/css'], ['400', '300', '600'], ['love osaka', 'need milk', 'love madrid'],)
  createEstimateResponse(estimate_requests[7], user_businesses[1], ['javascript', 'gatsby ', 'firebase'], ['500', '300', '100'], ['love seoul', 'need coffee', 'love sydney'],)
  createEstimateResponse(estimate_requests[1], user_businesses[0], ['php', 'gatsby ', 'mongodb'], ['500', '300', '600'], ['love tokyo', 'need coffee', 'love madrid'],)
  
  createEstimateResponse(estimate_requests[1], user_businesses[0], ['php', 'gatsby ', 'firebase'], ['500', '300', '600'], ['love osaka', 'need coffee', 'love madrid'],)
  createEstimateResponse(estimate_requests[1], user_businesses[2], ['npm', 'vue', 'firebase'], ['500', '300', '600'], ['love osaka', 'need cocktail', 'love madrid'],)
  createEstimateResponse(estimate_requests[0], user_businesses[0], ['php', 'django', 'firebase'], ['500', '200', '600'], ['love paris', 'need water', 'love prague'],)
  createEstimateResponse(estimate_requests[5], user_businesses[1], ['mariadb', 'gatsby ', 'react'], ['700', '300', '600'], ['love osaka', 'need coffee', 'love wellington'],)
  createEstimateResponse(estimate_requests[0], user_businesses[0], ['php', 'gatsby ', 'firebase'], ['500', '300', '200'], ['love berlin', 'need tea', 'love madrid'],)
}

getEstimateItemWithDetail()


