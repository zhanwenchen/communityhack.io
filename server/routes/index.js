var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', function(req, res) {
  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(function(user) {
    res.json(user);
  });
});

module.exports = router;
