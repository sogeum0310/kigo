var express = require('express')
var router = express.Router()

var estimate_controller = require('../controllers/estimateController')
var user_controller = require('../controllers/userController')
var other_controller = require('../controllers/otherController')

// router.use(function (req, res, next) {
//   console.log('router Time: ', Date.now())
//   next()
// })

/* GET home page. */
router.get('/', other_controller.index)
router.get('/test', other_controller.test)

/* Estimate */
router.get('/estimate/request/list', estimate_controller.estimate_request_list)
router.get('/estimate/request/form', estimate_controller.estimate_request_create_get)
router.post('/estimate/request/form', estimate_controller.estimate_request_create_post)
router.get('/estimate/request/:id', estimate_controller.estimate_request_detail)

router.get('/estimate/response/:id', estimate_controller.estimate_response_detail)

router.get('/estimate/received/list', estimate_controller.estimate_received_list)
router.get('/estimate/received/:id', estimate_controller.estimate_received_detail_get)
router.post('/estimate/received/:id', estimate_controller.estimate_received_detail_post)

router.get('/estimate/sent/list', estimate_controller.estimate_sent_list)
router.get('/estimate/sent/:id', estimate_controller.estimate_sent_detail)

/* User */
router.get('/login', user_controller.login_get)
router.post('/login', user_controller.login_post)
router.get('/logout', user_controller.logout)

router.get('/signup/option', user_controller.signup_option)


router.get('/signup/personal', user_controller.signup_personal_get)
router.post('/signup/personal', user_controller.signup_personal_post)

router.get('/mypage/personal', user_controller.mypage_personal)
router.get('/mypage/personal/account', user_controller.mypage_personal_account_get)
router.post('/mypage/personal/account', user_controller.mypage_personal_account_post)
router.get('/mypage/personal/review/list', user_controller.mypage_personal_review_list)
router.get('/mypage/personal/qna/list', user_controller.mypage_personal_qna_list)
router.get('/mypage/personal/qna/create', user_controller.mypage_personal_qna_create_get)
router.post('/mypage/personal/qna/create', user_controller.mypage_personal_qna_create_post)

router.get('/contact/list', other_controller.contact_list)

router.get('/contact/qna/create', other_controller.qna_create_get)
router.post('/contact/qna/create', other_controller.qna_create_post)
router.get('/contact/message/create', other_controller.message_create_get)
router.post('/contact/message/create', other_controller.message_create_post)


router.get('/signup/business', user_controller.signup_business_get)
router.post('/signup/business', user_controller.signup_business_post)
router.get('/user/business', user_controller.user_business_get)
router.post('/user/business', user_controller.user_business_post)

router.get('/success', other_controller.success)

/* Chat */
router.get('/chat/list', other_controller.chat_list)
router.get('/chat/:id', other_controller.chat_detail)
router.post('/chat/create', other_controller.chat_create)


module.exports = router
