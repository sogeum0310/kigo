var express = require('express');
var router = express.Router();
var async = require('async');

/* For controller */
var User = require('../models/user')
var UserCompany = require('../models/user_company')
var Item = require('../models/item')
var Estimate = require('../models/estimate');
var EstimateCompany = require('../models/estimate_company');
const { findById } = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KIGO' });
});


/* User Routing */
router.get('/login', function(req, res, next) {
  res.render('user_login', { title: 'Login' });
});

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

  async.parallel({
    platforms: function (callback) {
      Item.Platform.find(callback)
    }, 
  }, function (err, results) {
    if (err) {return next(err)}
    res.render('user_signup_company', { title: 'Signup for company', platforms: results.platforms})
    console.log(results)
  })

});

router.post('/signupCompany', function(req, res, next) {

  if(!(req.body.platform instanceof Array)){
    if(typeof req.body.platform==='undefined')
    req.body.platform=[];
    else
    req.body.platform=new Array(req.body.platform);
  }
  
  var userCompany = new UserCompany({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    platform: req.body.platform
  })
  userCompany.save(function (err) {
    if (err) { return next(err) }
    res.render('success', { title: 'Signup for company success!' })
  })
});

router.get('/alarm', function(req, res, next) {
  res.render('user_alarm', { title: 'Alarm' });
});

router.get('/mypage/:id', function(req, res, next) {
  User.findById(req.params.id).exec(function(err, results) {
    if (err) {return next(err)}
  res.render('user_signup', { title: 'My page', user: results});
  })
});

router.get('/mypageCompany/:id', function(req, res, next) {
  async.parallel(
    {
      user_company: function (callback) {
        UserCompany.findById(req.params.id).populate('platform').exec(callback);
      },
      platforms: function (callback) {
        Item.Platform.find(callback)
      },  
    },
    function (err, results) {
      if (err) { return next(err) }

      for (var all_g_iter = 0; all_g_iter < results.platforms.length; all_g_iter++) {
        for (var user_company_g_iter = 0; user_company_g_iter < results.user_company.platform.length; user_company_g_iter++) {
          if (results.platforms[all_g_iter]._id.toString()===results.user_company.platform[user_company_g_iter]._id.toString()) {
            results.platforms[all_g_iter].checked='true'
          }
        }
      }
      res.render('user_signup_company', { title: 'Mypage for Company', user_company: results.user_company, platforms: results.platforms })
    }
  )
});

router.post('/mypageCompany/:id', function (req, res, next) {

  if (!(req.body.platform instanceof Array)) {
    if (typeof req.body.platform==='undefined')
    req.body.platform=[]
    else
    req.body.platform=new Array(req.body.platform)
  }

  var userCompany = new UserCompany({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    platform: req.body.platform,
    _id: req.params.id
  })

  UserCompany.findByIdAndUpdate(req.params.id, userCompany, {}, function (err, theuserCompany) {
    if (err) {return next(err)}
    res.render('success', { title: 'user for company is updated!' })
  })
})

router.get('/myqna', function(req, res, next) {
  res.render('user_myqna', { title: 'My qna' });
});

router.get('/myreview', function(req, res, next) {
  res.render('user_myreview', { title: 'My review' });
});


/* Company Routing */
router.get('/about', function(req, res, next) {
  res.render('company_about', { title: 'About' });
});
router.get('/cs', function(req, res, next) {
  res.render('company_cs', { title: 'Customer Center' });
});
router.get('/event', function(req, res, next) {
  res.render('compant_event', { title: 'Event' });
});
router.get('/faqCompany', function(req, res, next) {
  res.render('company_faq_company', { title: 'FAQ company' });
});
router.get('/faq', function(req, res, next) {
  res.render('company_faq', { title: 'FAQ' });
});
router.get('/manualCompany', function(req, res, next) {
  res.render('company_manual_company', { title: 'Manual for company' });
});
router.get('/manual', function(req, res, next) {
  res.render('company_manual', { title: 'Manual for user' });
});
router.get('/notice', function(req, res, next) {
  res.render('company_notice', { title: 'Notice' });
});
router.get('/qna', function(req, res, next) {
  res.render('company_qna', { title: 'QnA' });
});
router.get('/sendMessage', function(req, res, next) {
  res.render('company_send_message', { title: 'Send message' });
});
router.get('/share', function(req, res, next) {
  res.render('company_share', { title: 'Share' });
});


/* Estimate Routing */
router.get('/estimateList', function (req, res, next) {
  Estimate.find()
  .populate('platform').exec(function (err, list_estimates) {
    if (err) {return next(err)}
    else {
      res.render('estimate_list', { title: 'Estimate List', estimate_list: list_estimates })
      console.log(list_estimates)
    }
  })
})

router.get('/estimateDetail/:id', function (req, res, next) {

  // Estimate.findById(req.params.id)
  // .populate('platform')
  // .populate('business')
  // .populate('goal')
  // .populate('start_day')
  // .populate('how_long')
  // .populate('cost')
  // .populate('city')
  // .populate('feedback')
  // .exec(function (err, estimate) {
  //   if (err) { return next(err) }
  //   res.render('estimate_detail', { title: 'Estimate Detail', estimate: estimate })
  // })

  async.parallel(
    {
      estimate: function (callback) {
        Estimate.findById(req.params.id)
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
      estimate_company: function (callback) {
        EstimateCompany.find({ 'estimate': req.params.id })
        .exec(callback)
      }
    },

    function (err, results) {
      if (err) {return next(err)}
      res.render('estimate_detail', { title: 'Estimate detail', estimate: results.estimate, estimate_company: results.estimate_company })
    }
  )
})

router.get('/estimateForm', function(req, res, next) {

  async.parallel({
    platforms: function (callback) {
      Item.Platform.find(callback)
    }, 
    businesses: function (callback) {
      Item.Business.find(callback)
    }, 
    goals: function (callback) {
      Item.Goal.find(callback)
    }, 
    start_days: function (callback) {
      Item.Start_day.find(callback)
    }, 
    how_longs: function (callback) {
      Item.How_long.find(callback)
    },
    costs: function (callback) {
      Item.Cost.find(callback)
    },
    cities: function (callback) {
      Item.City.find(callback)
    },
    feedbacks: function (callback) {
      Item.Feedback.find(callback)
    }
  }, 
  
  function (err, results) {
    if (err) {return next(err)}
    res.render('estimate_form', { 
      title: 'Estimate form', 
      platforms: results.platforms,
      businesses: results.businesses,
      goals: results.goals,
      start_days: results.start_days,
      how_longs: results.how_longs,
      costs: results.costs,
      cities: results.cities,
      feedbacks: results.feedbacks
    })
    // console.log(results)
  })

});

router.post('/estimateForm', function (req, res, next) {
  var estimate = new Estimate({
    platform: req.body.platform,
    business: req.body.business,
    goal: req.body.goal,
    start_day: req.body.start_day,
    how_long: req.body.how_long,
    cost: req.body.cost,
    city: req.body.city,
    feedback: req.body.feedback
  })

  estimate.save(function (err) {
    if (err) { return next(err) }
    res.render('success', { title: 'form submitted!' })
  })
})

router.get('/estimateDetail/:id/estimateFormCompany', function (req, res, next) {
  res.render('estimate_form_company', { title: 'Estimate for Company' })
})

router.get('/estimateDetail/:id/estimateDetailCompany/:id_2', function (req, res, next) {
  // console.log(req.params.id) 
  // console.log(req.params.id_2)
  // id = estimate detail of user
  // id_2 = estimate detail of company

  EstimateCompany.findById(req.params.id_2).exec(function (err, results) {
    if (err) { return next(err) }

    UserCompany.findById(results.company).exec(function (err, results) {
      if (err) { return next(err) }
      console.log(results)
    })
  
    res.render('estimate_detail_company', { title: 'Estimate detail for Company', estimate_detail: results })
  })
})

router.post('/estimateDetail/:id/estimateFormCompany', function (req, res, next) {

  var estimate_company = new EstimateCompany({
    estimate: req.params.id,
    company: '611cb02de195412248e28f27', // sogeum 
    unit: req.body.unit,
    cost: req.body.cost,
    msg: req.body.msg
  })

  estimate_company.save(function(err) {
    if (err) { next(err) }
    res.render('success', { title: 'Estimate for company is completed!' })
  })

  console.log(req.params.id)
  console.log(req.body.unit)
  console.log(req.body.cost)
  console.log(req.body.msg)
})


module.exports = router;
