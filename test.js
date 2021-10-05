// app.use
// app.get
// router.use
// router.get

// your app routes first
app.use(app.router)

// then you register a catch all 404 handler for all other requests that do not
// map to a route
app.use(function (req, res, next) {
  res.render('404', { status: 404, url: req.url })
})

// finally a 500 handler is registered as follows:
app.use(function (err, req, res, next) {
  if (err) {
    res.render('error')
  }
})

// app.get('/estimate/request/:id', function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })
// app.use('/estimate/request/:id', function (req, res, next) {
//   res.send('USER')
// })
// app.use('/estimate/request/:id', function (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })
// app.use('/estimate/request/:id', function (req, res, next) {
//   console.log('ID: ', req.params.id)
//   next()
// }, function (req, res, next) {
//   res.send('User Info')
// })
// app.get('/estimate/request/:id', function (req, res, next) {
//   // if the user ID is 0, skip to the next route
//   if (req.params.id == 0) next('route');
//   // otherwise pass the control to the next middleware function in this stack
//   else next(); //
// }, function (req, res, next) {
//   // render a regular page
//   res.render('regular');
// });


app.post('forget-password', (req, res) => {
  // email 입력 확인
  if (req.body.email === '') {
    res.status(400).send('email required');
  }
  // 유저 데이터베이스에 존재하는 이메일인지 확인
  User.findOne({
    where: {
      email: {
        like: req.body.email
      }
    }
  })
});

const crypto = require('crypto');

User.findOne(...)
.then((user) => {
    const token = crypto.randomBytes(20).toString('hex'); // token 생성
    const data = { // 데이터 정리
      token,
      userId: user.id,
      ttl: 300 // ttl 값 설정 (5분)
    };
    Auth.create(data); // 데이터베이스 Auth 테이블에 데이터 입력
  })


const nodemailer = require('nodemailer');
// nodemailer Transport 생성
const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: { // 이메일을 보낼 계정 데이터 입력
          user: 'test@gmail.com',
          pass: 'test',
        },
      });
const emailOptions = { // 옵션값 설정
          from: 'test@gmail.com',
          to: 'user@gmail.com',
          subject: '비밀번호 초기화 이메일입니다.',
          html: '비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요.'
           + `http://localhost/reset/${token}`,
        };
        transporter.sendMail(emailOptions, res); //전송


app.post('reset-password', (req, res) => {
  // 입력받은 token 값이 Auth 테이블에 존재하며 아직 유효한지 확인
  Auth.findOne({
    where: {
      token: {
        like: req.body.token
      },
      created: {
        greater: new Date.now() - ttl
      }
    }
  }).then((Auth) => { // 유저데이터 호출
    User.find(...)
  }).then(user) => { // 유저 비밀번호 업데이트
    User.update(...)
  }
});


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

