
const validCheck =  (username, user, password, password_confirm, email) => {

  var errors = []
  var error

  if (!username.match(/[a-z0-9]{5,}/)) {
    error = 'username valid in lowercase alphabet and number only with at least 6 length'
    errors.push(error)
  }
  if (user) {
    error = 'username is already in use'
    errors.push(error)
  }
  if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
    error = 'Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'
    errors.push(error)
  }
  if (password!==password_confirm) {
    error = 'password not identical'
    errors.push(error)
  }
  if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    error = 'Not an valid email'
    errors.push(error)
  }

  return errors
}

module.exports = validCheck