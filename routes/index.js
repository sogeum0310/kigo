var express = require('express');
var router = express.Router();
var async = require('async');

/* For controller */
var Model = require('../models/model');
const { Mongoose } = require('mongoose');

var steve = 'Pizza steve';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KIGO' });
});

router.get('/test', function (res, res, next) {

  function doSomething(callback) {
    Model.EstimateCompany.findById('612db970e49ade1a3d78c29b').exec(function (err, results) {
      callback(results, results.company)
    })
  }

  function doSomethingElse(data1, data2) {
    Model.CompanyReview.find({'company': data2}).exec(function (err, results) {
      console.log(data1)
      console.log(results)
      res.render('test', { title: 'test', results: results })
    })
  }

  doSomething(doSomethingElse)
})


/* Estimate Routing */
router.get('/estimates', function (req, res, next) {

  // function doSomething(callback) {
  //   Model.EstimateCompany.countDocuments({estimate: '61288ee9e9f6434b360e4776'}, function (err, results) {
  //     callback(results)
  //   })
  // }

  // function doSomethingElse(data) {
  //   console.log(data)
  // }

  // doSomething(doSomethingElse)

  async.parallel({ // 안녕 랩탑, 안녕 데스크탑, 이제 그만
    estimates: function (callback) {
      Model.Estimate.find().exec(callback)
    }
  }, function (err, results) {
    res.render('estimate_list', { 
      title: 'Estimate list', 
      get results() {
        for (i=0; i<results.estimates.length; i++) {

          Model.EstimateCompany.countDocuments({estimate: results.estimates[i]._id}, function (err, results) { 
            // results.estimates[i].count = results
            console.log(results)
          })
        }
        return results.estimates
      }
    })
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

  function doSomething(callback) {
    Model.EstimateCompany.findById(req.params.id2).exec(function (err, results) {
      callback(results, results.company)
    })
  }

  function doSomethingElse(data1, data2) {
    Model.CompanyReview.find({'company': data2}).exec(function (err, results) {
      console.log(data1)
      console.log(results)
      res.render('estimate_detail', { 
        title: 'Estimate for company', 
        estimate_companies: data1, 
        company_reviews: results 
      })
    })
  }

  doSomething(doSomethingElse)

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
      Model.EstimateCompany.find({ 'company': req.session.user })
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




/* Chat routing */
router.get('/chatUser', function (req, res, next) {

  async.parallel({
    chat_content: function (callback) {
      Model.ChatContent.find().exec(callback)
    },
    user: function (callback) {
      Model.User.findById(req.session.user).exec(callback)
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
    Model.User.findOne({'user_id': req.body.login_id}).exec(function (err, results) {
      if (!results) {
        console.log('no user')
      } else {
        if (req.body.login_password != results.password) {
          console.log('wrong password')
        } else {
          console.log(results)
          req.session.user = results._id
          res.render('success', { title: 'Hi ' + req.session.user_id })
        }
      }
    })
  }
  if (req.body.login_type == 'business') {
    Model.UserCompany.findOne({'user_id': req.body.login_id}).exec(function (err, results) {
      if (!results) {
        console.log('no user')
      } else {
        if (req.body.login_password != results.password) {
          console.log('wrong password')
        } else {
          console.log('login success')
          req.session.user = results._id
          res.render('success', { title: 'Hi ' + results.user_id })
        }
      }
    })
  }
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


module.exports = router;
