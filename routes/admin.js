const express = require('express');
const router = express.Router();
// Import controller
const admin_controller = require('../controllers/adminController')
const comment_controller = require('../controllers/commentController')


// Index
router.get(['/', '/*'], admin_controller.login_get)
router.get('/', admin_controller.index)

// Login
router.post('/login', admin_controller.login_post)
router.get('/mypage', admin_controller.mypage)
router.get('/logout', admin_controller.logout)

// User
router.get('/user/personal/list', admin_controller.user_personal_list)
router.get('/user/business/list', admin_controller.user_business_list)
router.get('/user/detail/:id', admin_controller.user_detail_get)
// User update
router.post('/user/detail/auth', admin_controller.user_detail_auth)
router.post('/user/detail/service', admin_controller.user_detail_service)
router.post('/user/detail/level', admin_controller.user_detail_level)
router.post('/user/detail/drop', admin_controller.user_detail_drop)

// Estimate 
router.get('/estimate/list', admin_controller.estimate_list)
router.get('/estimate/:id', admin_controller.estimate_detail)

// Notice
router.get('/notice/list', admin_controller.notice_list)
router.get('/notice/create', admin_controller.notice_create_get)
router.post('/notice/create', admin_controller.notice_create_post)
router.get('/notice/:id', admin_controller.notice_detail)
router.get('/notice/:id/update', admin_controller.notice_update_get)
router.post('/notice/:id/update', admin_controller.notice_update_post)
router.post('/notice/:id/delete', admin_controller.notice_delete)

// Event
router.get('/event/list', admin_controller.event_list)
router.get('/event/create', admin_controller.event_create_get)
router.post('/event/create', admin_controller.event_create_post)
router.get('/event/:id', admin_controller.event_detail)
router.get('/event/:id/update', admin_controller.event_update_get)
router.post('/event/:id/update', admin_controller.event_update_post)
router.post('/event/:id/delete', admin_controller.event_delete)

// Faq
router.get('/faq/list', admin_controller.faq_list)
router.get('/faq/create', admin_controller.faq_create_get)
router.post('/faq/create', admin_controller.faq_create_post)
router.get('/faq/:id', admin_controller.faq_detail)
router.get('/faq/:id/update', admin_controller.faq_update_get)
router.post('/faq/:id/update', admin_controller.faq_update_post)
router.post('/faq/:id/delete', admin_controller.faq_delete)

// Qna
router.get('/qna/list', admin_controller.qna_list)
// Qna-Comment
router.get('/qna/:id', comment_controller.qna_detail)
router.post('/qna/comment/create', comment_controller.qna_comment_create)
router.post('/qna/comment/delete', comment_controller.qna_comment_delete)

// Message
router.get('/message/list', admin_controller.message_list)
router.get('/message/:id', admin_controller.message_detail)
router.post('/message/:id/delete', admin_controller.message_delete)

// Summernote ajax
router.post('/summernote_ajax', admin_controller.summernote_ajax)


// Exports module
module.exports = router;
