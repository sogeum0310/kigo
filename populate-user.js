var Model = require('./models/model')


function createUserPersonal(user_id, password, name, gender, date_of_birth, city, phone, email) {
  user_personal_detail = {
    user_id: user_id,
    password: password,
    name: name,
    gender: gender, 
    date_of_birth: date_of_birth,
    city: city,
    phone: phone,
    email: email
  }
  var user_personal = new Model.UserPersonal(user_personal_detail)
  user_personal.save()
}

function createUserBusiness(user_id, password, name, phone, email, about, city, platform, cb) {
  user_business_detail = {
    user_id: user_id,
    password: password,
    name: name,
    phone: phone,
    email: email,
    about: about,
    city: city,
    platform: platform
  }
  var user_business = new Model.UserBusiness(user_business_detail)
  user_business.save()
}


