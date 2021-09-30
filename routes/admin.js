var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/adminController')


/* GET home page. */
router.get('/', admin_controller.index);
router.get('/success', admin_controller.success)

router.get('/user/personal/list', admin_controller.user_personal_list)
router.get('/user/personal/:id', admin_controller.user_personal_detail)
router.get('/user/business/list', admin_controller.user_business_list)
router.get('/user/business/:id', admin_controller.user_business_detail)
router.get('/estimate/request/list', admin_controller.estimate_request_list)
router.get('/estimate/request/:id', admin_controller.estimate_request_detail)
router.get('/estimate/response/list', admin_controller.estimate_response_list)
router.get('/estimate/response/:id', admin_controller.estimate_response_detail)

router.get('/notice/list', admin_controller.notice_list)
router.get('/notice/create', admin_controller.notice_create_get)
router.post('/notice/create', admin_controller.notice_create_post)
router.get('/notice/:id', admin_controller.notice_detail)
router.get('/notice/:id/update', admin_controller.notice_update_get)
router.post('/notice/:id/update', admin_controller.notice_update_post)

router.get('/event/list', admin_controller.event_list)
router.get('/event/create', admin_controller.event_create_get)
router.post('/event/create', admin_controller.event_create_post)
router.get('/event/:id', admin_controller.event_detail)
router.get('/event/:id/update', admin_controller.event_update_get)
router.post('/event/:id/update', admin_controller.event_update_post)

router.get('/faq/list', admin_controller.faq_list)
router.get('/faq/create', admin_controller.faq_create_get)
router.post('/faq/create', admin_controller.faq_create_post)
router.get('/faq/:id', admin_controller.faq_detail)
router.get('/faq/:id/update', admin_controller.faq_update_get)
router.post('/faq/:id/update', admin_controller.faq_update_post)

router.get('/qna/list', admin_controller.qna_list)
router.get('/qna/:id', admin_controller.qna_detail_get)
router.post('/qna/:id', admin_controller.qna_detail_post)

router.get('/message/list', admin_controller.message_list)
router.get('/message/:id', admin_controller.message_detail)


module.exports = router;
