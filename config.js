// Database connection
exports.mydb = {
  name: 'mongodb',
  // url: 'mongodb://localhost:27017/local_kigo',
  // url: 'mongodb://sogeum0310:hyun0831**@ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:27017/test?authSource=admin&authMechanism=SCRAM-SHA-1',
  url: 'mongodb://sogeum0310:hyun0831**@ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:27017/kiwon?authSource=admin&authMechanism=SCRAM-SHA-1'
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
    clientID: 'a',
    clientSecret: 'a',
    callbackURL: "a"
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
