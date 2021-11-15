// Database connection
exports.mydb = {
  name: 'mongodb',
  url: 'mongodb://localhost:27017/local_kigo',
  // url: 'mongodb://sogeum0310:hyun0831**@ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:27017/test?authSource=admin&authMechanism=SCRAM-SHA-1'
}

// Mailing account
exports.account = {
  email: 'sogeum0310@gmail.com',
  password: 'hyun0831**',
  url: 'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000',
  service: 'gmail'
}

// Social login
exports.ids = {
  google: {
    clientID: 'x',
    clientSecret: 'x',
    callbackURL: "x"
  },
  naver: {
    clientID: 'a',
    clientSecret: 'a',
    callbackURL: "a"
  }, 
  kakao: {
    clientID: 'a',
    clientSecret: 'a',
    callbackURL: "a"
  }
};

// 구글
// sogeum0310
// hyun0831**

// 클라이언트id
// 526707866896-pjrnbbvt1vtjojlocp2juh77sr6eb438.apps.googleusercontent.com

// 클라이언트 비밀번호
// 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

// 네이버
// idendrive
// hyun6004**

// 클라이언트id
// 7j693ZkVrhj1R9wWidAT

// clientSecret
// s3QAv5oDt1

// 카카오
// sogeum9300@daum.net

// clientSecret
// e11159ccad8f896ae82a8db559c740fb
