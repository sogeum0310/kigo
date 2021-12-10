const Model = require('../models/model')


// Polling to track for user business data
const something = function (req, res, next) {
  try { 
    setInterval(async () => {
      if (!req.user) { return }      
      var user = await Model.User.findById(req.user.id)

      if (user.account==='business') {
        // Level
        if (user.start_date) {
          var m = 3600000 * 24 * 30 // 1 month 
          if (user.level===1 && Date.now() + 32400000 - user.start_date > m) {
            user.level = 2
          }
        }
        // Counting reviews
        var review_count = await Model.Review.countDocuments({ parent: user._id })
        user.review = review_count
        // Scoring reviews
        var num = 0
        var reviews = await Model.Review.find({ parent: user._id })
        for (review of reviews) {
          num += review.rating
        }
        user.score = num
        // Counting a number of contracts
        var contracts = await Model.EstimateResponse.countDocuments({ user: user._id, submit: true })
        user.contract = contracts

        await user.save()
      }
    }, 1000)
  } catch (error) {
    console.log(error)
  }
  next()
}


module.exports = something