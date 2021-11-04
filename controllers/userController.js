const Model = require('../models/model')
const async = require('async')
const { body, checkSchema, validationResult } = require('express-validator')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const bcrypt = require('bcrypt')
const saltRounds = 10


// Login
exports.login_get = (req, res, next) => {
  try {
    if (req.session.user) {
      res.render('success', { title: '안녕하세요! ' + req.session.user.username, go_to: '/' })
    } else {
      res.render('user_login', { title: '로그인' })
    }
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.login_post = async (req, res, next) => {
  try {
    if (req.body.login_type=='personal') {
      var user = await Model.User.findOne({ username: req.body.username, account: 'personal' }).exec()
      loginProcess(user)
    }
    if (req.body.login_type=='business') {
      var user = await Model.User.findOne({ username: req.body.username, account: 'business' }).exec()
      loginProcess(user)
    }
    async function loginProcess(user) {
      var errors = []
      var error

      if (!user) { 
        error = '아이디와 비밀번호를 확인하세요'
        errors.push(error)
      } else {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
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
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// Logout
exports.logout = (req, res, next) => {
  try {
    req.session.destroy()
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
    
    console.log(cities)

    res.render('user_signup_personal', { title: '일반사용자 회원가입', cities: cities,})
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.signup_personal_post = async (req, res, next) => {
  try {
    var hash = await bcrypt.hash(req.body.password, saltRounds);

    var user_personal = new Model.User({
      username : req.body.username,
      password : hash,
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

    var message = '회원가입이 완료되었습니다'
    var url = '/'
    res.redirect(`/success/?message=${message}&go_to=${url}`)
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
    var hash = await bcrypt.hash(req.body.password, saltRounds);

    var user_business = new Model.User({
      username : req.body.username,
      password : hash,
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

    var portfolios = req.files.portfolio

    for (portfolio of portfolios) {
      var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
      upload_path = 'files/' + new_file_name
      portfolio.mv(upload_path)

      var file = new Model.File({
        parent: user_business._id,
        name: portfolio.name,
        md_name: new_file_name
      })
      await file.save()
    }

    var message = '회원가입 신청이 완료되었습니다'
    var url = '/'
    res.redirect(`/success/?message=${message}&go_to=${url}`)
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// My page
exports.mypage = async (req, res, next) => {
  try {
    res.render('user_mypage', { title: 'My page', user: req.session.user })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

exports.mypage_personal_account_get = async (req, res, next) => {
  try {
    var estimate_items = await Model.EstimateItem.find().exec()
    var cities = await Model.EstimateItemDetail.find({ item: estimate_items[8]._id }).exec()
    var user_personal = await Model.User.findById(req.session.user._id).exec()
    
    console.log(user_personal)

    res.render('user_signup_personal', { title: '나의 정보', user_personal: user_personal, cities: cities, update: true })
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
      _id: req.session.user._id
    })
    await Model.User.findByIdAndUpdate(req.session.user._id, user_personal, {})

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
    var files = await Model.File.find({ parent: req.session.user._id }).sort([[ 'reg_date', 'descending' ]]).exec()
    var user_business = await Model.User.findById(req.session.user._id).exec()

    for (var i=0; i<platforms.length; i++) {
      for (var j=0; j<user_business.platform.length; j++) {
        if (platforms[i]._id.toString()===user_business.platform[j]._id.toString()) {
          platforms[i].checked='true'
        }
      }
    } 

    res.render('user_signup_business', { title: '나의 정보', user_business: user_business, files: files, cities: cities, platforms: platforms, update: true })
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
      _id: req.session.user._id
    })
    await Model.User.findByIdAndUpdate(req.session.user._id, user_business, {}) 

    if (req.files) {
      var portfolios = req.files.portfolio
    
      for (portfolio of portfolios) {
        var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
        upload_path = 'files/' + new_file_name
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
    var review_list = await Model.Review.find({ user_personal: req.session.user._id })
    res.render('mypage_personal_review_list', { title: '나의 리뷰', review_list: review_list })
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}

// My page - Qna
exports.mypage_qna_list = async (req, res, next) => {
  try {
    var qna_questions = await Model.QnaQuestion.find({ user: req.session.user._id }).exec()
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
    const match = await bcrypt.compare(req.body.password, req.session.user.password);

    if (!match) {
      var error = 'wrong password'
      return res.render('user_access_password', { title: 'Access password', error: error })
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

    var user = await Model.User.findById(req.session.user._id)
    var hash = await bcrypt.hash(req.body.password, saltRounds);

    user.password = hash

    await user.save();

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
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("유효하지 않거나 만료된 링크입니다");
    
    if (!req.body.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      return res.send('비밀번호는 최소 1개 이상의 영어 대문자 및 소문자, 숫자가 있어야합니다. 길이는 최소 8자 이상이어야 합니다')
    }
    if (req.body.password!==req.body.password_confirm) {
      return res.send('비밀번호가 일치하지 않습니다')
    }
    user.password = req.body.password;
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
    var user = await Model.User.findOne({ username: req.body.username })
    var email = await Model.User.findOne({ email: req.body.email })
    var errors = []
    var error

    if (user && req.body.update===undefined) {
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
    if (email && req.body.update===undefined) {
      error = '이미 가입된 이메일입니다'
      errors.push(error)
    }
    if (!req.body.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      error = '유효하지 않은 이메일입니다'
      errors.push(error)
    }

    if (errors.length>0) {
      res.send(errors)
    } else {
      res.send('success')
    }
  } catch (error) {
    res.render('error', { message: '', error: error })
  }
}