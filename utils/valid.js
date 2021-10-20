
const validCheck =  (username, user, password, password_confirm, email) => {

  var errors = []
  var error

  if (!username.match(/[a-z0-9]{6,}/)) {
    error = '아이디는 영어 소문자와 숫자만 사용 가능합니다. 길이는 최소 6자 이상이어야 합니다.'
    errors.push(error)
  }
  if (user) {
    error = '이미 사용중인 아이디입니다'
    errors.push(error)
  }
  if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
    error = '비밀번호는 최소 1개 이상의 영어 대문자 및 소문자, 숫자가 있어야합니다. 길이는 최소 8자 이상이어야 합니다'
    errors.push(error)
  }
  if (password!==password_confirm) {
    error = '비밀번호가 일치하지 않습니다'
    errors.push(error)
  }
  if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    error = '이메일이 형식에 맞지 않습니다'
    errors.push(error)
  }

  return errors
}

module.exports = validCheck