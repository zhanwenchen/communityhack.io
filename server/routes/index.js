var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Create new user
router.post('/users', function(req, res) {
  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(function(user) {
    res.json(user);
  });
});

// get all users
router.get('/users', function(req, res) {
  models.User.findAll({}).then(function(users) {
    res.json(users);
  });
});

// get all teams
router.get('/teams', function(req, res) {
  models.Team.findAll({}).then(function(teams) {
    res.json(teams);
  });
});


module.exports = router;
