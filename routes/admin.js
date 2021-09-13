var express = require('express');
var router = express.Router();
var async = require('async');

/* For controller */
var Model = require('../models/model');
const { Mongoose } = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin' });
});

router.get('/personal_members', function (req, res, next) {
  Model.User.find().exec(function (err, results) {
    res.render('admin/personal_member_list', { title: 'Personal members', results: results })
  })
})

router.get('/business_members', function (req, res, next) {
  Model.UserCompany.find().exec(function (err, results) {
    res.render('admin/business_member_list', { title: 'Business members', results: results })
  })
})

router.get('/estimates', function (req, res, next) {
  Model.Estimate.find().populate('platform').exec(function (err, results) {
    res.render('admin/estimate_list', { title: 'Estimate List', results: results })
  })
})

module.exports = router;
