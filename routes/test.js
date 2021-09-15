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