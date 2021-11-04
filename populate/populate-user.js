var Model = require('./models/model')


async function populateUser() {
  var estimate_items = await Model.EstimateItem.find().exec()
  var platforms = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[0]._id }).exec()
  var how_manys = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[1]._id }).exec()
  var businesses = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[2]._id }).exec()
  var goals = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[3]._id }).exec()
  var start_days = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[4]._id }).exec()
  var how_longs = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[5]._id }).exec()
  var costs = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[6]._id }).exec()
  var cities = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[7]._id }).exec()
  var feedbacks = await Model.EstimateItemDetail.find({ estimate_item: estimate_items[8]._id }).exec()

  console.log(estimate_items)

  function createUserPersonal(username, password, name, gender, date_of_birth, city, phone, email) {
    user_personal_detail = {
      username: username,
      password: password,
      name: name,
      gender: gender, 
      date_of_birth: date_of_birth,
      city: city,
      phone: phone,
      email: email,
      auth: 1,
      account: 'personal'
    }
    var user_personal = new Model.User(user_personal_detail)
    user_personal.save()
  }

  function createUserBusiness(username, password, name, phone, email, about, city, platform) {
    user_business_detail = {
      username: username,
      password: password,
      name: name,
      phone: phone,
      email: email,
      about: about,
      city: city,
      platform: platform,
      auth: 0,
      account: 'business'
    }
    var user_business = new Model.User(user_business_detail)
    user_business.save()
  }


  createUserPersonal('bunny', '123', '토끼', 'male', '1990-12-25', [cities[0]._id,], '01011112222', 'bunny@example.com')
  createUserPersonal('cat', '123', '고양이', 'male', '1990-12-25', [cities[1]._id,], '01011112222', 'cat@example.com')
  createUserPersonal('dog', '123', '강아지', 'female', '1990-12-25', [cities[1]._id,], '01011112222', 'dog@example.com')
  createUserPersonal('monkey', '123', '원숭이', 'female', '1990-12-25', [cities[1]._id,], '01011112222', 'monkey@example.com')
  createUserPersonal('bird', '123', '새', 'female', '1990-12-25', [cities[2]._id,], '01011112222', 'bird@example.com')
  

  createUserBusiness('apple', '123', '사과', '01088889999', 'apple@example.com', 'We are selling apple', [cities[0]._id,], [platforms[0]._id, platforms[1]._id,])
  createUserBusiness('mango', '123', '망고', '01088889999', 'mango@example.com', 'We are selling mango', [cities[0]._id,], [platforms[1]._id, platforms[2]._id,])
  createUserBusiness('banana', '123', '바나나', '01088889999', 'banana@example.com', 'We are selling banana', [cities[1]._id,], [platforms[0]._id, platforms[1]._id, platforms[2]._id,])
  createUserBusiness('grape', '123', '포도', '01088889999', 'grape@example.com', 'We are selling grape', [cities[1]._id,], [platforms[1]._id, platforms[2]._id,])
  createUserBusiness('melon', '123', '메론', '01088889999', 'melon@example.com', 'We are selling melon', [cities[1]._id,], [platforms[0]._id,])
  
  createUserBusiness('strawberry', '123', '딸기', '01088889999', 'strawberry@example.com', 'We are selling strawberry', [cities[1]._id,], [platforms[0]._id, platforms[1]._id, platforms[2]._id,])
  createUserBusiness('cherry', '123', '체리', '01088889999', 'cherry@example.com', 'We are selling cherry', [cities[1]._id,], [platforms[1]._id, platforms[2]._id,])
  createUserBusiness('blueberry', '123', '블루베리', '01088889999', 'blueberry@example.com', 'We are selling blueberry', [cities[1]._id,], [platforms[0]._id, platforms[1]._id,])
  createUserBusiness('orange', '123', '오렌지', '01088889999', 'orange@example.com', 'We are selling orange', [cities[2]._id,], [platforms[0]._id,])
  createUserBusiness('tomato', '123', '토마토', '01088889999', 'tomato@example.com', 'We are selling tomato', [cities[2]._id,], [platforms[1]._id,])
}


populateUser()
