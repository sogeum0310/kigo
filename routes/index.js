var express = require('express');
var router = express.Router();
var async = require('async');

/* For controller */
var Model = require('../models/model')

/* Temporary user and company user */
var bunny = '612845b73ee69214177b350d'
var strawberry = '612845b83ee69214177b351b'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KIGO' });
});


/* Estimate Routing */
router.get('/estimates', function (req, res, next) {

  Model.Estimate.find().populate('platform').exec(function (err, results) {
    res.render('estimate_list', { 
      title: 'Estimates', 
      estimates: results,
    })

    console.log(results)
  })
  
})

router.get('/estimate/:id', function (req, res, next) {

  async.parallel({
    estimate: function (callback) {

      Model.Estimate.findById(req.params.id)
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
      Model.EstimateCompany.find({ 'estimate': req.params.id }).populate('company').exec(callback)
    }
  }, function (err, results) {
    if (err) { return next(err) }

    res.render('estimate', { 
      title: 'Estimate', 
      estimate: results.estimate, 
      estimate_companies: results.estimate_company,
    })
    console.log(results.estimate_company.length)
  })
})

router.get('/estimate/:id/:id2', function (req, res, next) {

  // async.parallel({
  //   estimate_companies: function (callback) {
  //     Model.EstimateCompany.findById(req.params.id2).exec(callback)
  //   },
  //   company_reviews: function (callback) {
  //     Model.CompanyReview.find({ 'company': strawberry}).exec(callback)
  //   }
  // }, function (err, results) {
  //   console.log(results)
  // })

  function myFunction(data) {
    console.log(data)
  }

  async.series([
    setTimeout(function () { myFunction(1) }, 0),
    setTimeout(function () { myFunction(2) }, 0),
    setTimeout(function () { myFunction(3) }, 0),
  ], function (err, results) { return results })

})


/* Estimate Routing for Company */
router.get('/estimatesCompany', function (req, res, next) {
  Model.Estimate.find().populate('user_id').populate('platform').exec(function (err, list_estimates) {
    if (err) {return next(err)}

    else {
      res.render('estimate_list_company', { title: 'Estimate List for Company', estimate_list: list_estimates })
      console.log(list_estimates)
    }
  })
})

router.get('/estimateCompany/:id', function (req, res, next) {

  Model.Estimate.findById(req.params.id)
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
    res.render( 'estimate_detail_company', { title: 'Estimate for company', results: results} )
  })
})

router.get('/estimatesComplete', function (req, res, next) {

  async.parallel({
    estimate: function (callback) {
      Model.Estimate.find().exec(callback)
    },
    estimate_company: function (callback) {
      Model.EstimateCompany.find({ 'company': strawberry })
      .populate({
        path: 'estimate', populate: {
          path: 'platform'
        }
      })
      .populate({
        path: 'estimate', populate: {
          path: 'user_id'
        }
      })
      .exec(callback)
    }
  }, function (err, results) {
    res.render('estimates_complete', { 
      title: "Estimates completed", 
      estimates: results.estimate,
      estimate_companies: results.estimate_company
    })
    console.log(results)
  })
})

router.get('/estimateComplete/:id', function (req, res, next) {

  async.parallel({
    estimate: function (callback) {
      Model.Estimate.find().exec(callback)
    },
    estimate_company: function (callback) {
      Model.EstimateCompany.findById(req.params.id).exec(callback)
    }
  }, function (err, results) {
    res.render('estimate_complete', { 
      title: "Estimate completed", 
      results: results.estimate_company
    })
  })
})

router.get('/estimateForm', function(req, res, next) {

  Model.EstimateItem.find({}).populate('detail').exec(function (err, results) {
    console.log(results)
    res.render('estimate_form', { title: 'Estimate form', results: results })
  })
});

router.post('/estimateForm', function (req, res, next) {
  var estimate = new Estimate({
    // user_id: req.session.user_id
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
      Model.EstimateItem.find(callback).populate('detail')
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
  Model.User.findById(req.params.id).exec(function(err, results) {
    if (err) {return next(err)}
  res.render('user_signup', { title: 'My page', user: results});
  })
});

router.get('/mypageCompany/:id', function(req, res, next) {
  async.parallel(
    {
      user_company: function (callback) {
        Model.UserCompany.findById(req.params.id).populate('detail').exec(callback);
      },
      platforms: function (callback) {
        Model.EstimateItem.find(callback).populate('detail')
      },  
    },
    function (err, results) {
      if (err) { return next(err) }

      for (var i=0; i<results.platforms[0].detail.length; i++) {
        for (var j=0; j<results.user_company.platform.length; j++) {
          if (results.platforms[0].detail[i]._id.toString()===results.user_company.platform[j]._id.toString()) {
            results.platforms[0].detail[i].checked='true'
          }
        }
      }

      res.render('user_signup_company', { title: 'Mypage for Company', user_company: results.user_company, platforms: results.platforms[0].detail })
    }
  )
});

router.post('/mypageCompany/:id', function (req, res, next) {

  // if (!(req.body.platform instanceof Array)) {
  //   if (typeof req.body.platform==='undefined')
  //   req.body.platform=[]
  //   else
  //   req.body.platform=new Array(req.body.platform)
  // }

  var userCompany = new Model.UserCompany({
    user_id : req.body.user_id,
    password : req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    about: req.body.about,
    platform: req.body.platform,
    _id: req.params.id
  })

  console.log('pizza steve')
  console.log(userCompany)

  // Model.UserCompany.findByIdAndUpdate(req.params.id, userCompany, {}, function (err, theuserCompany) {
  //   if (err) {return next(err)}
  //   res.render('success', { title: 'user for company is updated!' })
  // })
})

router.get('/myqna', function(req, res, next) {
  res.render('user_myqna', { title: 'My qna' });
});

router.get('/myreview', function(req, res, next) {
  res.render('user_myreview', { title: 'My review' });
});


/* Company Routing */
// router.get('/about', function(req, res, next) {
//   res.render('company_about', { title: 'About' });
// });
// router.get('/cs', function(req, res, next) {
//   res.render('company_cs', { title: 'Customer Center' });
// });
// router.get('/event', function(req, res, next) {
//   res.render('compant_event', { title: 'Event' });
// });
// router.get('/faqCompany', function(req, res, next) {
//   res.render('company_faq_company', { title: 'FAQ company' });
// });
// router.get('/faq', function(req, res, next) {
//   res.render('company_faq', { title: 'FAQ' });
// });
// router.get('/manualCompany', function(req, res, next) {
//   res.render('company_manual_company', { title: 'Manual for company' });
// });
// router.get('/manual', function(req, res, next) {
//   res.render('company_manual', { title: 'Manual for user' });
// });
// router.get('/notice', function(req, res, next) {
//   res.render('company_notice', { title: 'Notice' });
// });
// router.get('/qna', function(req, res, next) {
//   res.render('company_qna', { title: 'QnA' });
// });
// router.get('/sendMessage', function(req, res, next) {
//   res.render('company_send_message', { title: 'Send message' });
// });
// router.get('/share', function(req, res, next) {
//   res.render('company_share', { title: 'Share' });
// });


module.exports = router;
