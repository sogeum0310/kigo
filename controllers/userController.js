var Model = require('../models/model')
var async = require('async')
var nodemailer = require('nodemailer')
var { body, checkSchema, validationResult } = require('express-validator')
var crypto = require('crypto')


exports.login_get = (req, res, next) => {
  if (req.session.user) {
    res.render('success', { title: 'on ' + req.session.user.username })
  } else {
    res.render('user_login', { title: 'Login' })
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
    if (!user) { return console.log('no user') } 
    if (req.body.password != user.password) { return console.log('wrong password') } 
    if (user.auth===0) { return console.log('unauthorized') }
    req.session.user = user
    res.redirect('/login')
  }
}


exports.logout = (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
}





const sendEmail = async (email, subject, text) => {
  try {
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'sogeum0310@gmail.com',
              pass: 'hyun0831**'
          },
      });

      await transporter.sendMail({
          from: 'sogeum0310@gmail.com',
          to: email,
          subject: subject,
          text: text,
      });

      console.log("email sent sucessfully");
  } catch (error) {
      console.log(error, "email not sent");
  } 
}

exports.lost_password_get = async (req, res, next ) => {
  res.render('user_lost_password', { title: 'Lost password?' })
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
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

exports.user_reset_password_get = async (req, res, next) => {
  res.render('user_reset_password', { title: 'password reset' })
}

exports.user_reset_password_post = async (req, res, next) => {
    try {
        const user = await Model.User.findById(req.params.userId);
        if (!user) return res.status(400).send("No user");

        const token = await Model.Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;

        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}






exports.signup_option = async (req, res, next) => {
  res.render('user_signup_option', { title: 'Signup option' })
}
exports.signup_personal_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  res.render('user_signup_personal', { title: 'Signup for personal', cities: cities,})
}

const registrationSchema = {
  username: {
    custom: {
      options: async (value) => {
        var user = await Model.User.findOne({ username: value }).exec()
        // if (value.match(/[a-z0-9]/)) {
        //   return Promise.reject('Only valid in lowercase alphabet and number')
        // }
        if (user) {
          return Promise.reject('Username already in use')
        } 
      }
    }
  },
  password: {
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1
    },
    errorMessage: 'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number'
  },
  email: {
    normalizeEmail: true,
    custom: {
      options: async (value) => {
        var email = await Model.User.findOne({ email: value }).exec()
        if (email) {
          return Promise.reject('E-mail already is use')
        }
      }
    }
  }
}

exports.signup_personal_post = [
  checkSchema(registrationSchema),

  async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      var estimate_items = await Model.EstimateItem.find().exec()
      var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
      return res.render('user_signup_personal', { title: 'Signup for personal', cities: cities, errors: errors.array()})
    }

    console.log('good')

    // var user = new Model.UserPersonal({
    //   user_id : req.body.user_id,
    //   password : req.body.password,
    //   name: req.body.name,
    //   gender: req.body.gender,
    //   date_of_birth: req.body.birth_date,
    //   city: req.body.city,
    //   phone: req.body.phone,
    //   email: req.body.email,
    //   auth: 1,
    //   account: 'personal'
    // })
    // await user.save()
    // var message = 'Signup success'
    // res.redirect('/success/?message=' + message)
  }
]

exports.signup_business_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  res.render('user_signup_business', { title: 'Signup for business',cities: cities, platforms: platforms, })
}
exports.signup_business_post = [
  checkSchema(registrationSchema),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      var estimate_items = await Model.EstimateItem.find().exec()
      var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
      var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
      return res.render('user_signup_business', { title: 'Signup for personal', cities: cities, platforms: platforms, errors: errors.array()})
    }

    console.log('good')

    // var user_business = new Model.User({
    //   username : req.body.user_id,
    //   password : req.body.password,
    //   name: req.body.name,
    //   phone: req.body.phone,
    //   email: req.body.email,
    //   about: req.body.about,
    //   city: req.body.city,
    //   platform: req.body.platform,
    //   auth: 0,
    //   account: 'business'
    // })
    // await user_business.save()
    
    // portfolio = req.files.portfolio
    // var new_file_name = portfolio.md5 + '.' + portfolio.name.split('.').pop()
    // upload_path = 'files/' + new_file_name
    // portfolio.mv(upload_path)

    // var file = new Model.File({
    //   parent: user_business._id,
    //   name: portfolio.name,
    //   md_name: new_file_name
    // })

    // await file.save()
    
    // var message = 'Request for registration is submitted'
    // res.redirect('/success/?message=' + message)
  }
]

exports.mypage = async (req, res, next) => {
  res.render('user_mypage', { title: 'My page', user: req.session.user })
}

exports.account_access_get = async (req, res, next) => {
  res.render('user_account_access', { title: 'Account access' })
}

exports.account_access_post = async (req, res, next) => {
  var user = await Model.User.findById(req.session.user._id)
  if (user.password!==req.body.password) { return console.log('wrong') }
  if (user.account==='personal') {
    res.redirect('/mypage/personal/account')
  } else {
    res.redirect('/mypage/business/account')
  }
}

exports.mypage_personal_account_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var user_personal = await Model.User.findById(req.session.user._id).exec()
  res.render('user_signup_personal', { title: 'Mypage for personal account', user_personal: user_personal, cities: cities, })
}
exports.mypage_business_account_get = async (req, res, next) => {
  var estimate_items = await Model.EstimateItem.find().exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var file = await Model.File.findOne({ parent: req.session.user._id }).exec()
  var user_business = await Model.User.findById(req.session.user._id).exec()

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
  var user_personal = new Model.User({
    username: req.body.user_id,
    password: req.body.password,
    name: req.body.name,
    gender: req.body.gender,
    date_of_birth: req.body.birth_date,
    city: req.body.city,
    phone: req.body.phone,
    email: req.body.email,
    _id: req.session.user._id
  })
  await Model.User.findByIdAndUpdate(req.session.user._id, user_personal, {})
  var message = 'user for personal is updated!'
  res.redirect('/success/?message=' + message)
}

exports.mypage_business_account_post = async (req, res, next) => {
  var user_business = new Model.User({
    username : req.body.user_id,
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

  await Model.User.findByIdAndUpdate(req.session.user._id, user_business, {}) 
  var message = 'user for business is updated!'
  res.redirect('/success/?message=' + message)
}
exports.mypage_personal_review_list = async (req, res, next) => {
  var review_list = await Model.Review.find({ user_personal: req.session.user._id })
  res.render('mypage_personal_review_list', { title: 'My review list', review_list: review_list })
}
exports.mypage_qna_list = async (req, res, next) => {
  var qna_questions = await Model.QnaQuestion.find({ user: req.session.user._id }).exec()
  for (qna_question of qna_questions) {
    qna_question.qna_answer = await Model.QnaAnswer.findOne({ parent: qna_question._id }).exec()
  }
  res.render('mypage_qna_list', { title: 'Qna list', qna_list: qna_questions })
}
