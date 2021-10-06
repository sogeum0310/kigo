var express = require('express')
var router = express.Router()

var estimate_controller = require('../controllers/estimateController')
var user_controller = require('../controllers/userController')
var other_controller = require('../controllers/otherController')


/* GET home page. */
router.get('/', other_controller.index)
router.get('/test', other_controller.test)
router.get('/company/about', other_controller.company_about)
router.get('/company/notice/list', other_controller.company_blog_list)
router.get('/company/guide', other_controller.company_guide)
router.get('/company/event/list', other_controller.company_event_list)
router.get('/company/faq/list', other_controller.company_faq_list)
router.get('/company/share', other_controller.company_share)

router.get('/company/contact/list', other_controller.company_contact_list)
router.get('/company/contact/qna/create', other_controller.company_qna_create_get)
router.post('/company/contact/qna/create', other_controller.company_qna_create_post)
router.get('/company/contact/message/create', other_controller.company_message_create_get)
router.post('/company/contact/message/create', other_controller.company_message_create_post)


/* Estimate */
router.get('/estimate/request/list', estimate_controller.estimate_request_list)
router.get('/estimate/request/form', estimate_controller.estimate_request_create_get)
router.post('/estimate/request/form', estimate_controller.estimate_request_create_post)
router.get('/estimate/request/:id', estimate_controller.estimate_request_detail)

router.get('/estimate/response/:id', estimate_controller.estimate_response_detail_get)
router.post('/estimate/response/:id', estimate_controller.estimate_response_detail_post)

router.get('/estimate/received/list', estimate_controller.estimate_received_list)
router.get('/estimate/received/:id', estimate_controller.estimate_received_detail_get)
router.post('/estimate/received/:id', estimate_controller.estimate_received_detail_post)

router.get('/estimate/sent/list', estimate_controller.estimate_sent_list)
router.get('/estimate/sent/:id', estimate_controller.estimate_sent_detail)


/* User */
router.get('/login', user_controller.login_get)
router.post('/login', user_controller.login_post)
router.get('/logout', user_controller.logout)

router.get('/user/lostpassword', user_controller.lost_password_get)
router.post('/user/lostpassword', user_controller.lost_password_post)

router.get('/password-reset/:userId/:token', user_controller.user_reset_password_get)
router.post('/password-reset/:userId/:token', user_controller.user_reset_password_post)

router.get('/signup/option', user_controller.signup_option)
router.get('/signup/personal', user_controller.signup_personal_get)
router.post('/signup/personal', user_controller.signup_personal_post)
router.get('/signup/business', user_controller.signup_business_get)
router.post('/signup/business', user_controller.signup_business_post)

router.get('/mypage/personal', user_controller.mypage_personal)
router.get('/mypage/personal/account', user_controller.mypage_personal_account_get)
router.post('/mypage/personal/account', user_controller.mypage_personal_account_post)
router.get('/mypage/personal/review/list', user_controller.mypage_personal_review_list)
router.get('/mypage/personal/qna/list', user_controller.mypage_personal_qna_list)

router.get('/mypage/business', user_controller.mypage_business)
router.get('/mypage/business/account', user_controller.mypage_business_account_get)
router.post('/mypage/business/account', user_controller.mypage_business_account_post)
router.get('/mypage/business/qna/list', user_controller.mypage_business_qna_list)

router.get('/success', other_controller.success)


/* Chat */
router.get('/chat/list', other_controller.chat_list)
router.get('/chat/:id', other_controller.chat_detail)
router.post('/chat/create', other_controller.chat_create)


module.exports = router
