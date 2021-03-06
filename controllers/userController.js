const Model = require('../models/model')
const async = require('async')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const config = require('../config')
const path = require('path');

var passportLocal = require('../auth/local');
var passportGoogle = require('../auth/google')
var passportNaver = require('../auth/naver')
var passportKakao = require('../auth/kakao')


// Login
exports.login_get = (req, res, next) => {
  try {
    if (req.user) {
      res.redirect('/')
    } else {
      res.render('user_form_login', { title: '로그인' })
    }
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.login_post = passportLocal.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
})

exports.auth_google = passportGoogle.authenticate('google', {
  scope: ['profile'] 
})

exports.auth_google_callback = passportGoogle.authenticate('google', { 
  successRedirect: '/',
  failureRedirect: '/login' 
})

exports.auth_naver = passportNaver.authenticate('naver', {
  scope: ['profile'] 
})

exports.auth_naver_callback = passportNaver.authenticate('naver', {
  successRedirect: '/',
  failureRedirect: '/login',
}), 

exports.auth_kakao = passportKakao.authenticate('kakao')

exports.auth_kakao_callback = passportKakao.authenticate('kakao', {
  successRedirect: '/',
  failureRedirect: '/login',
})

// Logout
exports.logout = (req, res, next) => {
  try {
    req.logout()
    res.redirect('/')
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Sign up - Personal account
exports.signup_option = async (req, res, next) => {
  try {
    res.render('user_signup_option', { title: '회원가입' })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.signup_personal_get = async (req, res, next) => {
  try {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()

    res.render('user_form_profile_a', { title: '일반사용자 회원가입', cities: cities,})
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.signup_personal_post = async (req, res, next) => {
  try {
    var salt = crypto.randomBytes(16).toString('hex');
    var hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256').toString('hex')

    var user_personal = new Model.User({
      username : req.body.username,
      password : hashedPassword,
      salt: salt,
      name: req.body.name,
      gender: req.body.gender,
      date_of_birth: req.body.birth_date,
      phone: req.body.phone,
      email: req.body.email,
      city: req.body.city,
      service: true,
      reg_date: Date.now() + 32400000,
      account: 'personal',
      social: false,
      authorization: true,
      drop: false,
    })

    await user_personal.save()

    req.login(user_personal, function (err) {
      res.redirect('/')
    });
    
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Sign up - Business account
exports.signup_business_get = async (req, res, next) => {
  try {
    var platforms = await Model.EstimateTopic.find().exec()
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()
    res.render('user_form_profile_b', { title: '광고업체 회원가입', cities: cities, platforms: platforms, })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.signup_business_post = async (req, res, next) => {
  try {
    var salt = crypto.randomBytes(16).toString('hex');
    var hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256').toString('hex')

    var user_business = new Model.User({
      username : req.body.username,
      password : hashedPassword,
      salt: salt,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      about: req.body.about,
      city: req.body.city,
      platform: req.body.platform,
      service: false,
      reg_date: Date.now() + 32400000,
      account: 'business',
      social: false,
      authorization: true,
      online: true,
      drop: false,
      level: 1,
      review: 0,
      score: 0,
      contract: 0
    })

    await user_business.save()

    if (req.files) {
      var data = req.files.my_files
      var portfolios = data instanceof Array ? data : [data]
      
      for (portfolio of portfolios) {
        var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
        upload_path = 'files/user/' + new_file_name
        portfolio.mv(upload_path)

        var file = new Model.File({
          table: 'user',
          parent: user_business._id,
          name: portfolio.name,
          md_name: new_file_name
        })
        await file.save()
      }
    }
    res.redirect('/')
  } catch (error) {
    res.render('error', { error: error })
  }
}

// My page
exports.mypage = async (req, res, next) => {
  try { 
    var user = await Model.User.findById(req.user.id)
    res.render('user_mypage', { title: '마이페이지', user: user })
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Account for Personal
exports.mypage_personal_account_get = async (req, res, next) => {
  try {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()
    var user_personal = await Model.User.findById(req.user.id).exec()

    res.render('user_form_profile_a', { title: '나의 정보', user_personal: user_personal, cities: cities })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.mypage_personal_account_post = async (req, res, next) => {
  try {
    var user_personal = new Model.User({
      username: req.body.username,
      name: req.body.name,
      gender: req.body.gender,
      date_of_birth: req.body.birth_date,
      city: req.body.city,
      phone: req.body.phone,
      email: req.body.email,
      _id: req.user.id
    })
    await Model.User.findByIdAndUpdate(req.user.id, user_personal)

    res.redirect('/mypage')
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Account for Business
exports.mypage_business_account_get = async (req, res, next) => {
  try {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()
    var platforms = await Model.EstimateTopic.find()
    var files = await Model.File.find({ table: 'user', parent: req.user.id })
    var user_business = await Model.User.findById(req.user.id).exec()

    for (platform of platforms) {
      if (user_business.platform.includes(platform._id)) {
        platform.checked=true
      }
    }

    res.render('user_form_profile_b', { title: '나의 정보', user_business: user_business, files: files, cities: cities, platforms: platforms })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.mypage_business_account_post = async (req, res, next) => {
  try {
    var user_business = new Model.User({
      username : req.body.username,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      about: req.body.about,
      city: req.body.city,
      platform: req.body.platform,
      _id: req.user.id
    })

    await Model.User.findByIdAndUpdate(req.user.id, user_business) 

    if (req.files) {
      var data = req.files.my_files
      var portfolios = data instanceof Array ? data : [data]

      for (portfolio of portfolios) {
        var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
        upload_path = 'files/user/' + new_file_name
        portfolio.mv(upload_path)
  
        var file = new Model.File({
          table: 'user',
          parent: user_business._id,
          name: portfolio.name,
          md_name: new_file_name
        })
        await file.save()
      }
    }

    res.redirect('/mypage')
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.ajax_file_delete = async (req, res, next) => {
  try {
    await Model.File.findByIdAndDelete(req.body.id)
    res.send('ok')
  } catch (error) {
    console.log(error)
  }
}

// My page - Qna
exports.mypage_qna_list = async (req, res, next) => {
  try {
    var qna_questions = await Model.QnaQuestion.find({ user: req.user.id }).exec()
    for (qna_question of qna_questions) {
      qna_question.qna_answer = await Model.QnaAnswer.findOne({ parent: qna_question._id }).exec()
    }
    res.render('user_qna_list', { title: '나의 Q&A', qna_list: qna_questions })
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Lost username
exports.lost_username_get = async (req, res, next) => {
  try {
    res.render('user_form_username', { title: '아이디 찾기' })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.lost_username_post = async (req, res, next) => {
  try {
    var user = await Model.User.findOne({ email: req.body.email })
    if (user) {
      res.send(user.username)
    } else {
      res.send('일치하는 회원 정보를 찾을 수 없습니다')
    }
  } catch (error) {
    console.log(error)
  }
}

// Change password
exports.access_password_get = async (req, res, next) => {
  try {
    res.render('user_form_access', { title: '비밀번호 변경', message: req.session.my_message })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.access_password_post = async (req, res, next) => {
  try {
    var user = await Model.User.findById(req.user.id)
    var hashedPassword = crypto.pbkdf2Sync(req.body.password, user.salt, 310000, 32, 'sha256').toString('hex')

    if (user.password!==hashedPassword) {
      return res.redirect('access_password')
    }

    res.render('user_form_password', { title: '비밀번호 변경', password_change: true })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.change_password = async (req, res, rext) => {
  try {
    var errors = []
    var error

    if (!req.body.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      error = '비밀번호는 최소 1개 이상의 영어 대문자 및 소문자, 숫자가 있어야합니다. 길이는 최소 8자 이상이어야 합니다'
      errors.push(error)
    }
    if (req.body.password!==req.body.password_confirm) {
      error = '비밀번호가 일치하지 않습니다'
      errors.push(error)
    }
    
    if (errors.length > 0) {
      return res.render('user_form_password', { errors: errors })
    }

    var salt = crypto.randomBytes(16).toString('hex');
    var hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256').toString('hex')

    await Model.User.findByIdAndUpdate(req.user.id, { password: hashedPassword, salt: salt })

    res.redirect('/mypage')

  } catch (error) {
    res.render('error', { error: error })
  }
}

// Lost password
exports.lost_password_get = async (req, res, next ) => {
  try {
    res.render('user_form_email', { title: '비밀번호 찾기' })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.lost_password_post = async (req, res, next) => {
  try {
    const user = await Model.User.findOne({ email: req.body.email });
    if (!user) {
      return res.render('user_form_email', { title: '비밀번호 찾기', error: '일치하는 회원정보를 찾을 수 없습니다.' })
    }
    if (user && user.social===true) {
      return res.render('user_form_email', { title: '비밀번호 찾기', error: '소셜로그인 회원입니다' })
    }
    let token = await Model.Token.findOne({ userId: user.id });
    if (!token) {
      token = await new Model.Token({
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = config.account.url + `/password-reset/${user.id}/${token.token}`;
    await sendEmail(user.email, "비밀번호 재설정", link);
    res.send("비밀번호 재설정 링크를 등록된 이메일로 발송하였습니다");
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.user_reset_password_get = async (req, res, next) => {
  try {
    res.render('user_form_password', { title: '비밀번호 재설정' })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.user_reset_password_post = async (req, res, next) => {
  try {
    // Check user
    const user = await Model.User.findById(req.params.userId);
    if (!user) return res.status(400).send("회원이 존재하지 않습니다");
    
    // Check token
    const token = await Model.Token.findOne({
      userId: user.id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("유효하지 않거나 만료된 링크입니다");
    
    // Check password
    var errors = []
    var error

    if (!req.body.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      error = '비밀번호는 최소 1개 이상의 영어 대문자 및 소문자, 숫자가 있어야합니다. 길이는 최소 8자 이상이어야 합니다'
      errors.push(error)
    }
    if (req.body.password!==req.body.password_confirm) {
      error = '비밀번호가 일치하지 않습니다'
      errors.push(error)
    }

    if (errors.length > 0) {
      return res.render('user_form_password', { errors: errors })
    }

    // Success, save new password
    var salt = crypto.randomBytes(16).toString('hex');
    var hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256').toString('hex')

    user.password = hashedPassword
    user.salt = salt
    await user.save();
    
    // Delete token
    await token.delete();

    // -
    res.send("비밀번호 재설정이 완료되었습니다");
  } catch (error) {
    res.render('error', { error: error })
  }
}

// Validation check
exports.validity = async (req, res, next) => {
  try {
    // Validation check for Signup only
    if (req.body.update==="false") {
      var user = await Model.User.findOne({ username: req.body.username })
    }
    var email = await Model.User.findOne({ email: req.body.email })
    var errors = []
    var error

    // Validation check for Signup only
    if (req.body.update==="false") {
      if (user) {
        error = '이미 사용중인 아이디입니다'
        errors.push(error)
      }
      if (!req.body.username.match(/[a-z0-9]{6,}/)) {
        error = '아이디 생성 규칙을 따라주십시오'
        errors.push(error)
      }
      if (!req.body.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
        error = '비밀번호 생성 규칙을 따라주십시오'
        errors.push(error)
      }
      if (req.body.password!==req.body.password_confirm) {
        error = '비밀번호가 일치하지 않습니다'
        errors.push(error)
      }
      if (email) {
        error = '이미 가입된 이메일입니다'
        errors.push(error)
      }
    }

    if (!req.body.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      error = '유효하지 않은 이메일입니다'
      errors.push(error)
    }

    if (errors.length>0) {
      res.send({ errors: errors })
    } else {
      res.send({ errors: null })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.drop_get = async (req, res, next) => {
  try {
    res.render('user_form_drop', { title: '회원탈퇴' })
  } catch (error) {
    res.render('error', { error: error })
  }
 }

exports.drop_post = async (req, res, next) => {
  try{
    await Model.User.findByIdAndUpdate(req.user.id, { drop: true })
    req.logout()
    res.redirect('/')
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.mypage_alarm_get = async (req, res, next) => {
  try {
    var user = await Model.User.findById(req.user.id)
    res.render('user_form_alarm', { title: '알람설정', online: user.online })
  } catch (error) {
    res.render('error', { error: error })
  }
}

exports.mypage_alarm_post = async (req, res, next) => {
  try {
    if (req.body.alarm) {
      var user = await Model.User.findById(req.user.id)
      var results = user.online===true ? false : true
      
      await Model.User.findByIdAndUpdate(req.user.id, { online: results })
      console.log(user.online)
      res.send('so good')
    } 
  } catch (error) {
    console.log(error)
  }
}