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
  
  var estimate_items
  var cities

  function getEstimateItem(callback) {
    Model.EstimateItem.find().exec(function (err, results) {
      estimate_items = results
      callback()
    })
  }  
  function getCity(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[6] }).exec(function (err, results) {
      cities = results
      callback()
    })
  }
  function nowRender() {
    res.render('user_signup_personal', { 
      title: 'Signup for personal',
      cities: cities,
    })
  }
  
  async.series([
    getEstimateItem,
    getCity,
    nowRender
  ])
  
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

  var estimate_items = []
  var cities = []
  var platforms = []

  function getEstimateItem(callback) {
    Model.EstimateItem.find().exec(function (err, results) {
      estimate_items = results
      callback()
    })
  }  
  function getCity(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[6] }).exec(function (err, results) {
      cities = results
      callback()
    })
  }
  function getPlatform(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[0] }).exec(function (err, results) {
      platforms = results
      callback()
    })
  }
  function nowRender() {
    res.render('user_signup_business', { 
      title: 'Signup for business',
      cities: cities,
      platforms: platforms,
    })
  }
  
  async.series([
    getEstimateItem,
    getCity,
    getPlatform, 
    nowRender
  ])
  
}

exports.signup_business_post = function(req, res, next) {

  // if(!(req.body.platform instanceof Array)){
  //   if(typeof req.body.platform==='undefined')
  //   req.body.platform=[]
  //   else
  //   req.body.platform=new Array(req.body.platform)
  // }

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

  console.log(user_business)

  var file = new Model.File({
    parent: user_business._id,
    name: sampleFile.name,
    md_name: newFile
  })

  console.log(file)

  // userCompany.save(function (err) {
  //   if (err) { return next(err) }
  //   res.render('success', { title: 'Signup for company success!' })
  // })
}

exports.user_personal_get = function(req, res, next) {
  var estimate_items
  var user_personal
  var cities

  function getEstimateItem(callback) {
    Model.EstimateItem.find().exec(function (err, results) {
      estimate_items = results
      callback()
    })
  }  
  function getCity(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[6] }).exec(function (err, results) {
      cities = results
      callback()
    })
  }

  function getUserPersonal(callback) {
    Model.UserPersonal.findById(req.session.user).exec(function (err, results) {
      user_personal = results
      console.log(user_personal)
      callback()
    })
  }

  function nowRender() {
    res.render('user_signup_personal', { 
      title: 'Mypage for personal account',
      user_personal: user_personal,
      cities: cities,
    })
  }
  
  async.series([
    getEstimateItem,
    getCity,
    getUserPersonal,
    nowRender
  ])

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
  console.log(user_personal)

  Model.UserPersonal.findByIdAndUpdate(req.session.user, user_personal, {}, function (err, results) {
    if (err) { return next(err) }
    res.render('success', { title: 'user for personal is updated!' })
  })

}

exports.user_business_get = function(req, res, next) {

  var estimate_items
  var file
  var cities
  var platforms

  function getEstimateItem(callback) {
    Model.EstimateItem.find().exec(function (err, results) {
      estimate_items = results
      callback()
    })
  }  
  function getFile(callback) {
    Model.File.findOne({ 'parent': req.session.user }).exec(function (err, results) {
      file = results
      console.log(file)
      callback()
    })
  }
  function getCity(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[6] }).exec(function (err, results) {
      cities = results
      callback()
    })
  }
  function getPlatform(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[0] }).exec(function (err, results) {
      platforms = results
      callback()
    })
  }
  function nowRender() {
    Model.UserBusiness.findById(req.session.user).exec(function (err, user_business) {

      for (var i=0; i<platforms.length; i++) {
        for (var j=0; j<user_business.platform.length; j++) {
          if (platforms[i]._id.toString()===user_business.platform[j]._id.toString()) {
            platforms[i].checked='true'
          }
        }
      }

      res.render('user_signup_business', { 
        title: 'Mypage for business account',
        user_business: user_business,
        file: file,
        cities: cities,
        platforms: platforms,
      })
    })
  }
  
  async.series([
    getEstimateItem,
    getFile,
    getCity,
    getPlatform, 
    nowRender
  ], function (err, results) {  
    if (err) { console.log(err) }
    console.log(results)
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