var Model = require('./models/model')

async function createEstimateResponse() {
  var user_personals = await Model.UserPersonal.find().exec()
  var user_businesses = await Model.UserBusiness.find().exec()
  var estimate_requests = await Model.EstimateRequest.find().populate('city').populate('platform').exec()

  function createEstimateResponse(estimate_request, user_id, item, cost, note) {
    var estimate_response = new Model.EstimateResponse({
      estimate_request: estimate_request._id, 
      user_id: user_id._id,
      item: item,
      cost: cost,
      note: note,
    })
    // estimate_response.save()
  }

  // console.log(estimate_requests)
  // console.log(user_businesses)


  createEstimateResponse(estimate_requests[0], user_businesses[0], ['nodejs', 'gatsby ', 'nextjs'], ['100', '300', '600'], ['love london', 'need cola', 'love madrid'],)
  createEstimateResponse(estimate_requests[1], user_businesses[2], ['php', 'typescript', 'firebase'], ['500', '300', '600'], ['love osaka', 'need coffee', 'love moscow'],)
  createEstimateResponse(estimate_requests[9], user_businesses[7], ['php', 'linux', 'html/css'], ['400', '300', '600'], ['love osaka', 'need milk', 'love madrid'],)
  createEstimateResponse(estimate_requests[7], user_businesses[3], ['javascript', 'gatsby ', 'firebase'], ['500', '300', '100'], ['love seoul', 'need coffee', 'love sydney'],)
  createEstimateResponse(estimate_requests[1], user_businesses[6], ['php', 'gatsby ', 'mongodb'], ['500', '300', '600'], ['love tokyo', 'need coffee', 'love madrid'],)
  
  createEstimateResponse(estimate_requests[1], user_businesses[1], ['php', 'gatsby ', 'firebase'], ['500', '300', '600'], ['love osaka', 'need coffee', 'love madrid'],)
  createEstimateResponse(estimate_requests[1], user_businesses[2], ['npm', 'vue', 'firebase'], ['500', '300', '600'], ['love osaka', 'need cocktail', 'love madrid'],)
  createEstimateResponse(estimate_requests[0], user_businesses[4], ['php', 'django', 'firebase'], ['500', '200', '600'], ['love paris', 'need water', 'love prague'],)
  createEstimateResponse(estimate_requests[5], user_businesses[1], ['mariadb', 'gatsby ', 'react'], ['700', '300', '600'], ['love osaka', 'need coffee', 'love wellington'],)
  createEstimateResponse(estimate_requests[0], user_businesses[5], ['php', 'gatsby ', 'firebase'], ['500', '300', '200'], ['love berlin', 'need tea', 'love madrid'],)
}

createEstimateResponse()


