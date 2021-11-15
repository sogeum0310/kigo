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
    clientID: '526707866896-pjrnbbvt1vtjojlocp2juh77sr6eb438.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/auth/google/callback"
  },
  naver: {
    clientID: '7j693ZkVrhj1R9wWidAT',
    clientSecret: 's3QAv5oDt1',
    callbackURL: "http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/auth/naver/callback"
  }, 
  kakao: {
    clientID: 'e11159ccad8f896ae82a8db559c740fb',
    clientSecret: '',
    callbackURL: "http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000/auth/kakao/callback"
  }
};