var Model = require('../models/model')
var async = require('async')
var nodemailer = require('nodemailer')


exports.login_get = (req, res, next) => {
  if (req.session.user) {
    res.render('success', { title: 'on ' + req.session.user.user_id })
  } else {
    res.render('user_login', { title: 'Login' })
  }

  Model.UserPersonal.updateMany({ auth: 1 }).exec()


}
exports.login_post = async (req, res, next) => {
  if (req.body.login_type==='personal') {
    var user = await Model.UserPersonal.findOne({'user_id': req.body.login_id}).exec()
    loginProcess(user)
  }
  if (req.body.login_type==='business') {
    var user = await Model.UserBusiness.findOne({'user_id': req.body.login_id}).exec()
    loginProcess(user)
  }
  function loginProcess(user) {
    if (!user) { return console.log('no user') } 
    if (req.body.login_password != user.password) { return console.log('wrong password') } 
    if (user.auth===0) { return console.log('Wait for authorization') }
    req.session.user = user
    res.redirect('/login')
  }
}
exports.logout = (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
}

exports.user_id_check = async (req, res, next) => {
  var user_id = req.body.user_id
  var user = await Model.UserPersonal.findOne({ user_id: req.body.user_id }).exec()
  if (!user_id.match(/[a-z]/)) {
    res.send('lowercase alphabet only')
  } else if (user) {
    res.send('already signed up')
  } else {
    res.send('success')
  }
}

exports.lost_password_get = async (req, res, next ) => {
  res.render('user_lost_password', { title: 'Lost password?' })
}

exports.lost_password_post = async (req, res, next) => {

  var email = req.body.email

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sogeum0310@gmail.com',
      pass: 'hyun0831**'
    }
  });

  var mailOptions = {
    from: 'sogeum0310@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.signup_option = (req, res, next) => {
  res.render('user_signup_option', { title: 'Signup option' })
}
exports.signup_personal_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  res.render('user_signup_personal', { title: 'Signup for personal', cities: cities,})
}
exports.signup_personal_post = async (req, res, next) => {
  var user = new Model.UserPersonal({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    date_of_birth: req.body.birth_date,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email
  })
  await user.save()
  var message = 'Signup success'
  res.redirect('/success/?message=' + message)
}
exports.signup_business_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  res.render('user_signup_business', { title: 'Signup for business',cities: cities, platforms: platforms, })
}
exports.signup_business_post = async (req, res, next) => {
  var user_business = new Model.UserBusiness({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    city: req.body.city,
    platform: req.body.platform,
  })
  
  portfolio = req.files.portfolio
  var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
  upload_path = 'files/' + new_file_name
  portfolio.mv(upload_path)

  var file = new Model.File({
    parent: req.session.user._id,
    name: portfolio.name,
    md_name: new_file_name
  })

  await file.save()
  await user_business.save()
  
  var message = 'Request for signing up has been accepted successfully' 
  res.redirect('/success/?message=' + message)
}


exports.mypage_personal = async (req, res, next) => {
  res.render('user_mypage', { title: 'User personal', user_account: 'personal' })
}
exports.mypage_business = async (req, res, next) => {
  res.render('user_mypage', { title: 'User business', user_account: 'business' })
}
exports.mypage_personal_account_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var user_personal = await Model.UserPersonal.findById(req.session.user._id).exec()
  res.render('user_signup_personal', { title: 'Mypage for personal account', user_personal: user_personal, cities: cities, })
}
exports.mypage_business_account_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var file = await Model.File.findOne({ parent: req.session.user._id }).exec()
  var user_business = await Model.UserBusiness.findById(req.session.user._id).exec()

  for (var i=0; i<platforms.length; i++) {
    for (var j=0; j<user_business.platform.length; j++) {
      if (platforms[i]._id.toString()===user_business.platform[j]._id.toString()) {
        platforms[i].checked='true'
      }
    }
  } 
  res.render('user_signup_business', { title: 'Mypage for business account', user_business: user_business, file: file, cities: cities, platforms: platforms, })
}
exports.mypage_personal_account_post = async (req, res, next) => {
  var user_personal = new Model.UserPersonal({
    user_id: req.body.user_id,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    date_of_birth: req.body.birth_date,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email,
    _id: req.session.user._id
  })
  await Model.UserPersonal.findByIdAndUpdate(req.session.user._id, user_personal, {})
  var message = 'user for personal is updated!'
  res.redirect('/success/?message=' + message)
}

exports.mypage_business_account_post = async (req, res, next) => {
  var user_business = new Model.UserBusiness({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    city: req.body.city,
    platform: req.body.platform,
    _id: req.session.user._id
  })

  // if (!req.files) {
  //   console.log(res)
  //   return res.status(500).send('error 500!')
  // }

  if (req.files) {
    portfolio = req.files.portfolio
    var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
    upload_path = 'files/' + new_file_name
    portfolio.mv(upload_path)
  
    var file = new Model.File({
      parent: req.session.user._id,
      name: portfolio.name,
      md_name: new_file_name
    })
    await file.save()
  }

  await Model.UserBusiness.findByIdAndUpdate(req.session.user._id, user_business, {}) 
  var message = 'user for business is updated!'
  res.redirect('/success/?message=' + message)
}
exports.mypage_personal_review_list = async (req, res, next) => {
  res.render('mypage_personal_review_list', { title: 'My review list' })
}
exports.mypage_personal_qna_list = async (req, res, next) => {
  var qna_questions = await Model.QnaQuestion.find({ user_id: req.session.user._id }).exec()
  for (qna_question of qna_questions) {
    qna_question.qna_answer = await Model.QnaAnswer.findOne({ parent: qna_question._id }).exec()
  }
  res.render('mypage_qna_list', { title: 'Qna list for personal', qna_list: qna_questions })
}

exports.mypage_business_qna_list = async (req, res, next) => {
  res.render('mypage_qna_list', { title: 'Qna list for business', qna_list: '' })
}

