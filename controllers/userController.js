const Model = require('../models/model')
const async = require('async')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

var passport = require('passport')
var passportLocal = require('../auth/local');
var passportGoogle = require('../auth/google')
var passportNaver = require('../auth/naver')
var passportKakao = require('../auth/kakao')


// Login
exports.login_get = (req, res, next) => {
  try {
    if (req.user) {
      res.render('success', { title: '안녕하세요! ' + req.user.username, go_to: '/' })
    } else {
      res.render('user_login', { title: '로그인' })
    }
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.login_post = passport.authenticate('local', {
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
    res.render('error', { message: '', error: error })
  }
}

// Sign up - Personal account
exports.signup_option = async (req, res, next) => {
  try {
    res.render('user_signup_option', { title: '회원가입' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.signup_personal_get = async (req, res, next) => {
  try {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()

    res.render('user_signup_personal', { title: '일반사용자 회원가입', cities: cities,})
  } catch (error) {
    res.render('error', { message: '', error: error })
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
      city: req.body.city,
      phone: req.body.phone,
      email: req.body.email,
      auth: 1,
      account: 'personal'
    })

    await user_personal.save()

    req.login(user_personal, function (err) {
      var message = '회원가입이 완료되었습니다'
      var url = '/'
      res.redirect(`/success/?message=${message}&go_to=${url}`)
    });
    
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Sign up - Business account
exports.signup_business_get = async (req, res, next) => {
  try {
    var platforms = await Model.EstimateTopic.find().exec()
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()
    res.render('user_signup_business', { title: '광고업체 회원가입', cities: cities, platforms: platforms, })
  } catch (error) {
    res.render('error', { message: '', error: error })
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
      auth: 0,
      account: 'business'
    })

    await user_business.save()

    if (req.files) {
      var portfolios = req.files.portfolio

      for (portfolio of portfolios) {
        var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
        upload_path = 'files/user/' + new_file_name
        portfolio.mv(upload_path)

        var file = new Model.File({
          parent: user_business._id,
          name: portfolio.name,
          md_name: new_file_name
        })
        await file.save()
      }
    }

    req.login(user_business, function (err) {
      var message = '회원가입 신청이 완료되었습니다'
      var url = '/'
      res.redirect(`/success/?message=${message}&go_to=${url}`)
    })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// My page
exports.mypage = async (req, res, next) => {
  try { 
    var user = await Model.User.findById(req.user.id)
    res.render('user_mypage', { title: 'My page', user: user })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.mypage_personal_account_get = async (req, res, next) => {
  try {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()
    var user_personal = await Model.User.findById(req.user.id).exec()

    res.render('user_signup_personal', { title: '나의 정보', user_personal: user_personal, cities: cities })
  } catch (error) {
    res.render('error', { message: '', error: error })
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
    await Model.User.findByIdAndUpdate(req.user.id, user_personal, {})

    var message = '정보수정이 완료되었습니다'
    var url = '/mypage'
    res.redirect(`/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.mypage_business_account_get = async (req, res, next) => {
  try {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()
    var platforms = await Model.EstimateTopic.find()
    var files = await Model.File.find({ parent: req.user.id }).sort([[ 'reg_date', 'descending' ]]).exec()
    var user_business = await Model.User.findById(req.user.id).exec()

    for (var i=0; i<platforms.length; i++) {
      for (var j=0; j<user_business.platform.length; j++) {
        if (platforms[i]._id.toString()===user_business.platform[j]._id.toString()) {
          platforms[i].checked='true'
        }
      }
    } 

    res.render('user_signup_business', { title: '나의 정보', user_business: user_business, files: files, cities: cities, platforms: platforms })
  } catch (error) {
    res.render('error', { message: '', error: error })
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
    await Model.User.findByIdAndUpdate(req.user.id, user_business, {}) 

    if (req.files) {
      var data = req.files.portfolio

      var portfolios = data instanceof Array ? data : [data]
    
      for (portfolio of portfolios) {
        var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
        upload_path = 'files/user/' + new_file_name
        portfolio.mv(upload_path)
  
        var file = new Model.File({
          parent: user_business._id,
          name: portfolio.name,
          md_name: new_file_name
        })
        await file.save()
      }
    }

    var message = '회원정보 수정이 완료되었습니다'
    var url = '/mypage'
    res.redirect(`/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Mypage - Review
exports.mypage_personal_review_list = async (req, res, next) => {
  try {
    var review_list = await Model.Review.find({ user_personal: req.user.id })
    res.render('mypage_personal_review_list', { title: '나의 리뷰', review_list: review_list })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// My page - Qna
exports.mypage_qna_list = async (req, res, next) => {
  try {
    var qna_questions = await Model.QnaQuestion.find({ user: req.user.id }).exec()
    for (qna_question of qna_questions) {
      qna_question.qna_answer = await Model.QnaAnswer.findOne({ parent: qna_question._id }).exec()
    }
    res.render('mypage_qna_list', { title: '나의 Q&A', qna_list: qna_questions })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Change password
exports.access_password_get = async (req, res, next) => {
  res.render('user_access_password', { title: 'Access password' })
}

exports.access_password_post = async (req, res, next) => {
  try {
    var user = await Model.User.findById(req.user.id)
    var hashedPassword = crypto.pbkdf2Sync(req.body.password, user.salt, 310000, 32, 'sha256').toString('hex')

    if (user.password!==hashedPassword) {
      return res.redirect('access_password')
    }

    res.render('user_change_password', { title: 'Change password' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.change_password = async (req, res, rext) => {
  try {
    var errors = []

    if (!req.body.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      var error = '비밀번호는 최소 1개 이상의 영어 대문자 및 소문자, 숫자가 있어야합니다. 길이는 최소 8자 이상이어야 합니다'
      errors.push(error)
    }
    if (req.body.password!==req.body.password_confirm) {
      var error = '비밀번호가 일치하지 않습니다'
      errors.push(error)
    }
    if (errors.length>0) {
      return res.render('user_change_password', { title: 'Change password', errors: errors })
    }

    var salt = crypto.randomBytes(16).toString('hex');
    var hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256').toString('hex')

    await Model.User.findByIdAndUpdate(req.user.id, { password: hashedPassword })

    var message = 'Change password successfully'
    var url = '/'
    res.redirect(`/success/?message=${message}&go_to=${url}`)

  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Lost username
exports.lost_username_get = async (req, res, next) => {
  try {
    res.render('user_lost_username', { title: 'Lost username' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.lost_username_post = async (req, res, next) => {
  try {
    var user = await Model.User.findOne({ email: req.body.email })
    if (user) {
      res.send(user.username)
    } else {
      res.send('no user')
    }
  } catch (error) {
    console.log(error)
  }
}

// Lost password
exports.lost_password_get = async (req, res, next ) => {
  try {
    res.render('user_lost_password', { title: '비밀번호 찾기' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.lost_password_post = async (req, res, next) => {
  try {
    const user = await Model.User.findOne({ email: req.body.email });
    let token = await Model.Token.findOne({ userId: user.id });
    if (!token) {
      token = await new Model.Token({
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/password-reset/${user.id}/${token.token}`;
    await sendEmail(user.email, "비밀번호 재설정", link);
    res.send("비밀번호 재설정 링크를 등록된 이메일로 발송하였습니다");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
}

exports.user_reset_password_get = async (req, res, next) => {
  try {
    res.render('user_reset_password', { title: '비밀번호 재설정' })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.user_reset_password_post = async (req, res, next) => {
  try {
    const user = await Model.User.findById(req.params.userId);
    if (!user) return res.status(400).send("회원이 존재하지 않습니다");
    const token = await Model.Token.findOne({
      userId: user.id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("유효하지 않거나 만료된 링크입니다");
    
    if (!req.body.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      return res.send('비밀번호는 최소 1개 이상의 영어 대문자 및 소문자, 숫자가 있어야합니다. 길이는 최소 8자 이상이어야 합니다')
    }
    if (req.body.password!==req.body.password_confirm) {
      return res.send('비밀번호가 일치하지 않습니다')
    }

    var salt = crypto.randomBytes(16).toString('hex');
    var hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256').toString('hex')
    
    user.password = hashedPassword
    await user.save();
    await token.delete();
    res.send("비밀번호 재설정이 완료되었습니다");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
}

// Validation check
exports.validity = async (req, res, next) => {
  try {
    // Validatio check for Signup only
    if (req.body.update==="false") {
      var user = await Model.User.findOne({ username: req.body.username })
    }
    var email = await Model.User.findOne({ email: req.body.email })
    var errors = []
    var error

    // Validatio check for Signup only
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
    res.render('error', { message: '', error: error })
  }
}