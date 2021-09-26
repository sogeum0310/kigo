// app.use
// app.get
// router.use
// router.get

// your app routes first
app.use(app.router)

// then you register a catch all 404 handler for all other requests that do not
// map to a route
app.use(function (req, res, next) {
  res.render('404', { status: 404, url: req.url })
})

// finally a 500 handler is registered as follows:
app.use(function (err, req, res, next) {
  if (err) {
    res.render('error')
  }
})

// app.get('/estimate/request/:id', function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })
// app.use('/estimate/request/:id', function (req, res, next) {
//   res.send('USER')
// })
// app.use('/estimate/request/:id', function (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })
// app.use('/estimate/request/:id', function (req, res, next) {
//   console.log('ID: ', req.params.id)
//   next()
// }, function (req, res, next) {
//   res.send('User Info')
// })
// app.get('/estimate/request/:id', function (req, res, next) {
//   // if the user ID is 0, skip to the next route
//   if (req.params.id == 0) next('route');
//   // otherwise pass the control to the next middleware function in this stack
//   else next(); //
// }, function (req, res, next) {
//   // render a regular page
//   res.render('regular');
// });



