var local_url = 'http://127.0.0.1:3000' 
var aws_url = 'http://ec2-15-164-219-91.ap-northeast-2.compute.amazonaws.com:3000'


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



exports.ids = {
  github: {
    clientID: '2d3d55fc2527eb971341',
    clientSecret: 'af8d4e43ec1253138651631e20eaeed2b84b5b2a',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  google: {
    clientID: '738752283482-olqdsce5bnmv42n97f65mf1i3knpg6hh.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  naver: {
    clientID: 'WBiXYsHWHW31TrZ_mMQe',
    clientSecret: 'uhwf8XD8Ka',
    callbackURL: "http://127.0.0.1:3000/auth/naver/callback"
  }, 
  kakao: {
    clientID: 'e85f175e8e70b47d7841946416781856',
    clientSecret: '',
    callbackURL: "http://127.0.0.1:3000/auth/kakao/callback"
  }
};
