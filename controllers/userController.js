const Model = require('../models/model')
const async = require('async')
const { body, checkSchema, validationResult } = require('express-validator')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const validCheck = require('../utils/valid')


exports.login_get = (req, res, next) => {
  if (req.session.user) {
    res.render('success', { title: '안녕하세요! ' + req.session.user.username, go_to: '/' })
  } else {
    res.render('user_login', { title: '로그인' })
  }
}

exports.login_post = async (req, res, next) => {
  if (req.body.login_type=='personal') {
    var user = await Model.User.findOne({ username: req.body.username, account: 'personal' }).exec()
    loginProcess(user)
  }
  if (req.body.login_type=='business') {
    var user = await Model.User.findOne({ username: req.body.username, account: 'business' }).exec()
    loginProcess(user)
  }
  function loginProcess(user) {
    var errors = []
    var error

    if (!user) { 
      error = '아이디와 비밀번호를 확인하세요'
      errors.push(error)
    } else {
      if (req.body.password != user.password) {
        error = '아이디와 비밀번호를 확인하세요'
        errors.push(error)
      } 
      if (user.auth===0) {
        error = '심사 진행중입니다'
        errors.push(error)
      }
    }
    if (errors.length>0) {
      return res.render('user_login', { title: '로그인', errors: errors })
    }

    req.session.user = user
    res.redirect('/login')
  }
}

exports.logout = (req, res, next) => {
  req.session.destroy()

  var message = '로그아웃되었습니다'
  var url = '/'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

exports.lost_password_get = async (req, res, next ) => {
  res.render('user_lost_password', { title: '비밀번호 찾기' })
}

exports.lost_password_post = async (req, res, next) => {
  try {
    const user = await Model.User.findOne({ email: req.body.email });
    let token = await Model.Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Model.Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "비밀번호 재설정", link);
    res.send("비밀번호 재설정 링크를 등록된 이메일로 발송하였습니다");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
}

exports.user_reset_password_get = async (req, res, next) => {
  res.render('user_reset_password', { title: '비밀번호 재설정' })
}

exports.user_reset_password_post = async (req, res, next) => {
  try {
    const user = await Model.User.findById(req.params.userId);
    if (!user) return res.status(400).send("회원이 존재하지 않습니다");
    const token = await Model.Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("유효하지 않거나 만료된 링크입니다");
    user.password = req.body.password;
    await user.save();
    await token.delete();
    res.send("비밀번호 재설정이 완료되었습니다");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
}

exports.signup_option = async (req, res, next) => {
  res.render('user_signup_option', { title: '회원가입' })
}
exports.signup_personal_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  res.render('user_signup_personal', { title: '일반사용자 회원가입', cities: cities,})
}

exports.signup_personal_post = async (req, res, next) => {
  var user = await Model.User.findOne({ username: req.body.username })
  var errors = validCheck(req.body.username, user, req.body.password, req.body.password_confirm, req.body.email)

  if (errors.length>0) {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
    var user_personal = {
      username: req.body.username,
      name: req.body.name,
      gender: req.body.gender,
      date_of_birth_yyyy_mm_dd: req.body.birth_date,
      phone: req.body.phone,
      email: req.body.email,
    }
    return res.render('user_signup_personal', { title: '일반사용자 회원가입', user_personal: user_personal, cities: cities, errors: errors })
  }

  var user_personal = new Model.User({
    username : req.body.username,
    password : req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    date_of_birth: req.body.birth_date,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email,
    auth: 1,
    account: 'personal'
  })
  await user_personal.save()

  var message = 'Signup success!'
  var url = '/'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

exports.signup_business_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  res.render('user_signup_business', { title: '광고업체 회원가입',cities: cities, platforms: platforms, })
}
exports.signup_business_post = async (req, res, next) => {
  var user = await Model.User.findOne({ username: req.body.username })
  var errors = validCheck(req.body.username, user, req.body.password, req.body.password_confirm, req.body.email)

  if (errors.length>0) {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
    var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()

    var user_business = {
      username: req.body.username,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      about: req.body.about,
      city: req.body.city,
      platform: req.body.platform
    }

    for (platform of platforms) {
      if (req.body.platform.includes(platform._id.toString())) {
        platform.checked='true'
      }
    }
    
    return res.render('user_signup_business', { title: '광고업체 회원가입', user_business: user_business, cities: cities, platforms: platforms, errors: errors })
  }

  var user_business = new Model.User({
    username : req.body.username,
    password : req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    city: req.body.city,
    platform: req.body.platform,
    auth: 0,
    account: 'business'
  })

  await user_business.save()
  
  portfolio = req.files.portfolio
  var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
  upload_path = 'files/' + new_file_name
  portfolio.mv(upload_path)

  var file = new Model.File({
    parent: user_business._id,
    name: portfolio.name,
    md_name: new_file_name
  })
  await file.save()
  
  var message = '회원가입 신청이 완료되었습니다'
  var url = '/'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

exports.mypage = async (req, res, next) => {
  res.render('user_mypage', { title: 'My page', user: req.session.user })
}

exports.account_access_get = async (req, res, next) => {
  res.render('user_account_access', { title: '비밀번호 확인' })
}

exports.account_access_post = async (req, res, next) => {
  var user = await Model.User.findById(req.session.user._id)
  if (user.password!==req.body.password) {
    var error = '비밀번호를 확인하세요'
    return res.render('user_account_access', { title: '비밀번호 확인', error: error })
  }
  if (user.account==='personal') {
    res.redirect('/mypage/personal/account')
  } else {
    res.redirect('/mypage/business/account')
  }
}

exports.mypage_personal_access_get = async (req, res, next) => {
  res.render('user_account_access', { title: '비밀번호 확인' })
}

exports.mypage_personal_access_post = async (req, res, next) => {
  var user = await Model.User.findById(req.session.user._id)

  if (user.password!==req.body.password) {
    var error = '비밀번호를 확인하세요'
    return res.render('user_account_access', { title: '비밀번호 확인', error: error })
  }

  var estimate_items = await Model.EstimateItem.find().exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var user_personal = await Model.User.findById(req.session.user._id).exec()
  res.render('user_signup_personal', { title: '나의 정보', user_personal: user_personal, cities: cities, })
}

exports.mypage_personal_account = async (req, res, next) => {
  var user = await Model.User.findOne({ username: req.body.username })
  var errors = validCheck(req.body.username, '', req.body.password, req.body.password_confirm, req.body.email)

  if (errors.length>0) {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
    return res.render('user_signup_personal', { title: '나의 정보', user_personal: user, cities: cities, errors: errors })
  }

  var user_personal = new Model.User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    date_of_birth: req.body.birth_date,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email,
    _id: user._id
  })
  await Model.User.findByIdAndUpdate(user._id, user_personal, {})

  var message = '정보수정이 완료되었습니다'
  var url = '/mypage'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

exports.mypage_business_access_get = async (req, res, next) => {
  res.render('user_account_access', { title: '비밀번호 확인' })
}

exports.mypage_business_access_post = async (req, res, next) => {
  var user = await Model.User.findById(req.session.user._id)

  if (user.password!==req.body.password) {
    var error = '비밀번호를 확인하세요'
    return res.render('user_account_access', { title: '비밀번호 확인', error: error })
  }

  var estimate_items = await Model.EstimateItem.find().exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  var file = await Model.File.findOne({ parent: req.session.user._id }).exec()
  var user_business = await Model.User.findById(req.session.user._id).exec()

  for (var i=0; i<platforms.length; i++) {
    for (var j=0; j<user_business.platform.length; j++) {
      if (platforms[i]._id.toString()===user_business.platform[j]._id.toString()) {
        platforms[i].checked='true'
      }
    }
  } 
  res.render('user_signup_business', { title: '나의 정보', user_business: user_business, file: file, cities: cities, platforms: platforms, })
}

exports.mypage_business_account = async (req, res, next) => {
  var user = await Model.User.findOne({ username: req.body.username })
  var errors = validCheck(req.body.username, '', req.body.password, req.body.password_confirm, req.body.email)

  if (errors.length>0) {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
    var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
    var file = await Model.File.findOne({ parent: user._id }).exec()

    for (platform of platforms) {
      if (user.platform.includes(platform._id)) {
        platform.checked='true'
      }
    }

    return res.render('user_signup_business', { title: '나의 정보', user_business: user, file: file, cities: cities, platforms: platforms, errors: errors })
  }

  var user_business = new Model.User({
    username : req.body.username,
    password : req.body.password_confirm,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    city: req.body.city,
    platform: req.body.platform,
    _id: user._id
  })
  await Model.User.findByIdAndUpdate(user._id, user_business, {}) 

  if (req.files) {
    portfolio = req.files.portfolio
    var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
    upload_path = 'files/' + new_file_name
    portfolio.mv(upload_path)
  
    var file = new Model.File({
      parent: user._id,
      name: portfolio.name,
      md_name: new_file_name
    })
    await file.save()
  }

  var message = '회원정보 수정이 완료되었습니다'
  var url = '/mypage'
  res.redirect(`/success/?message=${message}&go_to=${url}`)
}

exports.mypage_personal_review_list = async (req, res, next) => {
  var review_list = await Model.Review.find({ user_personal: req.session.user._id })
  res.render('mypage_personal_review_list', { title: '나의 리뷰', review_list: review_list })
}

exports.mypage_qna_list = async (req, res, next) => {
  var qna_questions = await Model.QnaQuestion.find({ user: req.session.user._id }).exec()
  for (qna_question of qna_questions) {
    qna_question.qna_answer = await Model.QnaAnswer.findOne({ parent: qna_question._id }).exec()
  }
  res.render('mypage_qna_list', { title: '나의 Q&A', qna_list: qna_questions })
}
