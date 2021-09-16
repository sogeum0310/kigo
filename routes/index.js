var express = require('express');
var router = express.Router();
var async = require('async');

/* For controller */
var Model = require('../models/model');
const { Mongoose } = require('mongoose');

var steve = 'Pizza steve';

// router.get(['/', '/*'], function (req, res, next) {
//   console.log('Look at me: ' + req.session.user)
//   next()
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KIGO',  results: req.session.user});
});

router.get('/test', function (req, res, next) {

  // function doSomething(callback) {
  //   Model.EstimateCompany.findById('612db970e49ade1a3d78c29b').exec(function (err, results) {
  //     callback(results, results.company)
  //   })
  // }

  // function doSomethingElse(data1, data2) {
  //   Model.CompanyReview.find({'company': data2}).exec(function (err, results) {
  //     console.log(data1)
  //     console.log(results)
  //     res.render('test', { title: 'test', results: results })
  //   })
  // }

  // doSomething(doSomethingElse)

  // var bunny = new Model.User({
  //   city: '6127581b3eef7c51a4095713',
  //   _id: req.session.user
  // })

  // Model.User.findByIdAndUpdate(req.session.user, bunny, {}, function (err, results) {
  //   if (err) { return next(err) }
  //   console.log('so good')
  // })

  // Model.User.updateMany({ city: '6127581b3eef7c51a4095715' }, function (err, results) {
  //   console.log('so good')
  // })
})


/* Estimate Routing */
router.get('/estimate/request/list', function (req, res, next) {
  Model.EstimateRequest.find({ 'user_id': req.session.user }).populate('platform').exec(function (err, results) {
    console.log(results)
    res.render('estimate_request_list', { title: 'Estimate Requests', estimate_requests: results })
  })
})


router.get('/estimate/request/:id', function (req, res, next) {

  async.parallel({
    estimate_request: function (callback) {

      Model.EstimateRequest.findById(req.params.id)
      .populate('platform')
      .populate('business')
      .populate('goal')
      .populate('start_day')
      .populate('how_long')
      .populate('cost')
      .populate('city')
      .populate('feedback')
      .exec(callback)
    },
    estimate_responses: function (callback) {
      Model.EstimateResponse.find({ 'estimate_request': req.params.id }).populate('user_id').exec(callback)
    }
  }, function (err, results) {

    // console.log(results)
    
    if (err) { return next(err) }

    res.render('estimate_request_detail', { 
      title: 'Estimate', 
      estimate_request: results.estimate_request, 
      estimate_responses: results.estimate_responses,
    })
  })
})


router.get('/estimate/response/:id', function (req, res, next) {

  var estimate_response;
  var file;
  var business_reviews;

  function getEstimateResponse(callback) {
    Model.EstimateResponse.findById(req.params.id).exec(function (err, results) {
      estimate_response = results
      console.log(estimate_response)
      callback()
    })
  }

  function getFile(callback) {
    Model.File.findOne({ 'parent': estimate_response.user_id }).exec(function (err, results) {
      file = results
      console.log(file)
      callback()
    })
  }

  function getBusinessReview(callback) {
    Model.BusinessReview.find({ 'user_business': estimate_response.user_id }).exec(function (err, results) {
      business_reviews = results
      console.log(business_reviews)
      callback()
    })
  }

  function nowRender() {
    res.render('estimate_response_detail', { 
      title: 'Estimate Response', 
      estimate_response: estimate_response,
      portfolio: file,
      business_reviews: business_reviews
    })
  }

  async.series([
    getEstimateResponse,
    getFile,
    getBusinessReview,
    nowRender
  ])

})


/* Estimate Routing for Company */
router.get('/estimatesCompany', function (req, res, next) {
  Model.EstimateRequest.find().populate('user_id').populate('platform').exec(function (err, results) {
    if (err) {return next(err)}

    res.render('estimate_received_list', { title: 'Estimate Received', estimate_list: results })
    console.log(results)
  })
})

router.get('/estimateCompany/:id', function (req, res, next) {

  Model.EstimateRequest.findById(req.params.id)
  .populate('platform')
  .populate('business')
  .populate('goal')
  .populate('start_day')
  .populate('how_long')
  .populate('cost')
  .populate('city')
  .populate('feedback')
  .exec(function (err, results) {
    // console.log(results)
    res.render( 'estimate_received_detail', { title: 'Estimate for company', results: results} )
  })
})

router.post('/estimateCompany/:id', function (req, res, next) {
  console.log('- - -')
  console.log(req.session.user)
  console.log(req.params.id)
  console.log(req.body.item)
  console.log(req.body.cost)
  console.log(req.body.note)
})

router.get('/estimatesComplete', function (req, res, next) {

  Model.EstimateResponse.find({ 'user_id': req.session.user })
  .populate({
    path: 'estimate_request',
    populate: {
      path: 'platform'
    }
  })
  .exec(function (err, results) {
    res.render('estimate_sent_list', { title: 'Estimate sent', results: results })
  })

})

router.get('/estimateComplete/:id', function (req, res, next) {

  Model.EstimateResponse.findById(req.params.id)
  .populate({
    path: 'estimate_request',
    populate: {
      path: 'platform'
    }
  })
  .exec(function (err, results) {
    res.render('estimate_sent_detail', { title: 'Estimate sent detail', results: results })
  })

})

router.get('/estimate/request/form', function(req, res, next) {

  var estimate_items = []
  var platforms = []
  var businesses = []
  var goals = []
  var start_days = []
  var how_longs = []
  var costs = []
  var cities = []
  var feedbacks = []

  function getEstimateItem(callback) {
    Model.EstimateItem.find().exec(function (err, results) {
      estimate_items = results
      callback()
    })
  }

  function getPlatform(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[0] }).exec(function (err, results) {
      platforms = results
      callback()
    })
  }
  function getBusiness(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[1] }).exec(function (err, results) {
      businesses = results
      callback()
    })
  }
  function getGoal(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[2] }).exec(function (err, results) {
      goals = results
      callback()
    })
  }
  function getStartDay(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[3] }).exec(function (err, results) {
      start_days = results
      callback()
    })
  }
  function getHowLong(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[4] }).exec(function (err, results) {
      how_longs = results
      callback()
    })
  }
  function getCost(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[5] }).exec(function (err, results) {
      costs = results
      callback()
    })
  }
  function getCity(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[6] }).exec(function (err, results) {
      cities = results
      callback()
    })
  }
  function getFeedback(callback) {
    Model.EstimateItemDetail.find({ 'estimate_item': estimate_items[7] }).exec(function (err, results) {
      feedbacks = results
      callback()
    })
  }
  function nowRender() {
    res.render('estimate_request_form', { 
      title: 'Estimate form',
      platforms: platforms,
      businesses: businesses,
      goals: goals,
      start_days: start_days,
      how_longs: how_longs,
      costs: costs,
      cities: cities,
      feedbacks: feedbacks
    })
  }

  async.series([
    getEstimateItem,
    getPlatform, 
    getBusiness, 
    getGoal, 
    getStartDay,
    getHowLong,
    getCost,
    getCity,
    getFeedback,
    nowRender
  ], function (err, results) {
    if (err) { console.log(results) }
  })
});

router.post('/estimateForm', function (req, res, next) {
  var estimate = new Model.EstimateRequest({
    user_id: req.session.user,
    platform: req.body.platform,
    business: req.body.business,
    goal: req.body.goal,
    start_day: req.body.startday,
    how_long: req.body.howlong,
    cost: req.body.cost,
    city: req.body.city,
    feedback: req.body.feedback
  })

  estimate.save(function (err) {
    if (err) { return next(err) }
    res.render('success', { title: 'form submitted!' })
  })
})


/* Chat routing */
router.get('/chatUser', function (req, res, next) {

  async.parallel({
    chat_content: function (callback) {
      Model.ChatContent.find().exec(callback)
    },
    user: function (callback) {
      Model.UserPersonal.findById(req.session.user).exec(callback)
    }
  }, function (err, results) {
    console.log(results)
    res.render('chat_user', { title: 'Chat', user: results.user, chat_contents: results.chat_content })
  })
})

router.post('/chatAjax', function (req, res, next) {

  var chat = new Model.ChatContent({
    user_id: req.body.chat_user,
    content: req.body.chat_content,
    room: '6127581b3eef7c51a40956d2'
  })

  console.log(chat)

  chat.save(function (err) {
    if (err) { return next(err) }
    console.log('so good')
  })

})


/* User Routing */
router.get('/login', function(req, res, next) {
  if (req.session.user) {
    // console.log(req.session.user.user_id)
    res.render('success', { title: 'Hi ' + req.session.user })
  } else {
    res.render('user_login', { title: 'Login' });
  }
});

router.post('/login', function(req, res, next) {
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
});

router.get('/logout', function (req, res, next) {
  req.session.destroy()
  res.redirect('/')
})

router.get('/signupOption', function(req, res, next) {
  res.render('user_signup_option', { title: 'Signup option' });
});

router.get('/signup', function(req, res, next) {
  res.render('user_signup', { title: 'Signup' });
});

router.post('/signup', function(req, res, next) {
  
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

});

router.get('/signupCompany', function(req, res, next) {

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
  ], function (err, results) {  
    if (err) { console.log(err) }
    console.log(results)
  })
  
});

router.post('/signupCompany', function(req, res, next) {

  // if(!(req.body.platform instanceof Array)){
  //   if(typeof req.body.platform==='undefined')
  //   req.body.platform=[];
  //   else
  //   req.body.platform=new Array(req.body.platform);
  // }

  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
  uploadPath = 'files/' + sampleFile.name
  var newFile = sampleFile.md5 + '.' + sampleFile.name.split('.').pop()

  // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv(uploadPath, function(err) {
  //   if (err)
  //     return res.status(500).send(err);

  //   res.send('File uploaded!');
  // });
  
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
});


router.get('/alarm', function(req, res, next) {
  res.render('user_alarm', { title: 'Alarm' });
});


router.get('/mypage', function(req, res, next) {
  var estimate_items;
  var user_personal;
  var cities;

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

});

router.post('/mypage', function (req, res, next) {
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

})

router.get('/mypageCompany', function(req, res, next) {

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
        cities: cities,
        platforms: platforms,
      })
    })
  }
  
  async.series([
    getEstimateItem,
    getCity,
    getPlatform, 
    nowRender
  ], function (err, results) {  
    if (err) { console.log(err) }
    console.log(results)
  })

});

router.post('/mypageCompany', function (req, res, next) {

  // if (!(req.body.platform instanceof Array)) {
  //   if (typeof req.body.platform==='undefined')
  //   req.body.platform=[]
  //   else
  //   req.body.platform=new Array(req.body.platform)
  // }

  let sampleFile;
  let uploadPath;

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send('No files were uploaded.');
  // }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
  var newFile = sampleFile.md5 + '.' + sampleFile.name.split('.').pop()

  uploadPath = 'files/' + newFile

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
  });

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

  var file = new Model.File({
    parent: req.session.user,
    name: sampleFile.name,
    md_name: newFile
  })

  file.save()

  Model.UserBusiness.findByIdAndUpdate(req.session.user, user_business, {}, function (err, results) {
    if (err) {return next(err)}
    res.render('success', { title: 'user for business is updated!' })
  })
})


router.get('/myqna', function(req, res, next) {
  res.render('user_myqna', { title: 'My qna' });
});


router.get('/myreview', function(req, res, next) {
  res.render('user_myreview', { title: 'My review' });
});


module.exports = router;
