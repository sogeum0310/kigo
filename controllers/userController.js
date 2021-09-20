var Model = require('../models/model')
var async = require('async')


exports.login_get = function(req, res, next) {
  if (req.session.user) {
    // console.log(req.session.user.user_id)
    res.render('success', { title: 'Hi ' + req.session.user })
  } else {
    res.render('user_login', { title: 'Login' })
  }
}

exports.login_post = function(req, res, next) {
  if (req.body.login_type == 'personal') {
    Model.UserPersonal.findOne({'user_id': req.body.login_id}).exec(function (err, results) {
      if (!results) {
        console.log('no user')
      } else {
        if (req.body.login_password != results.password) {
          console.log('wrong password')
        } else {
          console.log(results)
          req.session.user = results._id
          res.redirect('/login')
        }
      }
    })
  }
  if (req.body.login_type == 'business') {
    Model.UserBusiness.findOne({'user_id': req.body.login_id}).exec(function (err, results) {
      if (!results) {
        console.log('no user')
      } else {
        if (req.body.login_password != results.password) {
          console.log('wrong password')
        } else {
          console.log('login success')
          req.session.user = results._id
          res.redirect('/login')
        }
      }
    })
  }
}

exports.logout = function (req, res, next) {
  req.session.destroy()
  res.redirect('/')
}

exports.signup_option = function(req, res, next) {
  res.render('user_signup_option', { title: 'Signup option' })
}

exports.signup_personal_get = function(req, res, next) {
  Model.EstimateItem.find().exec(function (err, estimate_items) {
    async.parallel({
      cities: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[6]._id }).exec(callback)
      },
    }, function (err, results) {
      res.render('user_signup_personal', { 
        title: 'Signup for personal',
        cities: results.cities,
      })
    })
  })
}

exports.signup_personal_post = function(req, res, next) {
  var user = new User({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    date_of_birth: req.body.birth_date,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email
  })
  user.save(function (err) {
    if (err) { return next(err) }
    res.render('success', { title: 'Signup success!' })
  })
}

exports.signup_business_get = function(req, res, next) {
  Model.EstimateItem.find().exec(function (err, estimate_items) {
    async.parallel({
      platforms: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec(callback)
      },
      cities: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[6]._id }).exec(callback)
      },
    }, function (err, results) {
      res.render('user_signup_business', { 
        title: 'Signup for business',
        cities: results.cities,
        platforms: results.platforms,
      })
    })
  })  
}

exports.signup_business_post = function(req, res, next) {
  let sampleFile
  let uploadPath
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile
  // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name
  uploadPath = 'files/' + sampleFile.name
  var newFile = sampleFile.md5 + '.' + sampleFile.name.split('.').pop()
  // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv(uploadPath, function(err) {
  //   if (err)
  //     return res.status(500).send(err)

  //   res.send('File uploaded!')
  // })
  var user_business = new Model.UserBusiness({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    city: req.body.city,
    platform: req.body.platform
  })
  var file = new Model.File({
    parent: user_business._id,
    name: sampleFile.name,
    md_name: newFile
  })
  // userCompany.save(function (err) {
  //   if (err) { return next(err) }
  //   res.render('success', { title: 'Signup for company success!' })
  // })
}

exports.user_personal_get = function(req, res, next) {
  Model.EstimateItem.find().exec(function (err, estimate_items) {
    async.parallel({
      cities: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[6] }).exec(callback)
      },
      user_personal: function (callback) {
        Model.UserPersonal.findById(req.session.user).exec(callback)
      }
    }, function (err, results) {
      res.render('user_signup_personal', { 
        title: 'Mypage for personal account',
        user_personal: results.user_personal,
        cities: results.cities,
      })
    })
  })
}

exports.user_personal_post = function (req, res, next) {
  var user_personal = new Model.UserPersonal({
    user_id: req.body.user_id,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    date_of_birth: req.body.birth_date,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email,
    _id: req.session.user
  })
  Model.UserPersonal.findByIdAndUpdate(req.session.user, user_personal, {}, function (err, results) {
    if (err) { return next(err) }
    res.render('success', { title: 'user for personal is updated!' })
  })
}

exports.user_business_get = function(req, res, next) {
  Model.EstimateItem.find().exec(function (err, estimate_items) {
    async.parallel({
      platforms: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec(callback)
      },
      cities: function (callback) {
        Model.EstimateItemDetail.find({ estimate_item: estimate_items[6]._id }).exec(callback)
      },
      portfolio: function (callback) {
        Model.File.findOne({ parent: req.session.user }).exec(callback)
      },
      user_business: function (callback) {
        Model.UserBusiness.findById(req.session.user).exec(callback)
      }
    }, function (err, results) {
      for (var i=0; i<results.platforms.length; i++) {
        for (var j=0; j<results.user_business.platform.length; j++) {
          if (results.platforms[i]._id.toString()===results.user_business.platform[j]._id.toString()) {
            results.platforms[i].checked='true'
          }
        }
      } 
      res.render('user_signup_business', { 
        title: 'Mypage for business account',
        user_business: results.user_business,
        file: results.file,
        cities: results.cities,
        platforms: results.platforms,
      })
    })
  })  
}

exports.user_business_post = function (req, res, next) {
  var user_business = new Model.UserBusiness({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    city: req.body.city,
    platform: req.body.platform,
    _id: req.session.user
  })
  if (req.files) {
    let sampleFile
    let uploadPath
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).send('No files were uploaded.')
    // }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile
    // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name
    var newFile = sampleFile.md5 + '.' + sampleFile.name.split('.').pop()
    uploadPath = 'files/' + newFile
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err)
    })
    var file = new Model.File({
      parent: req.session.user,
      name: sampleFile.name,
      md_name: newFile
    })
    file.save()
  }
  Model.UserBusiness.findByIdAndUpdate(req.session.user, user_business, {}, function (err, results) {
    if (err) {return next(err)}
    res.render('success', { title: 'user for business is updated!' })
  })
}