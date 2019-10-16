var express = require('express');
var router = express.Router();
const passport = require('passport');
var userModel = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {

  var entity = {
    username: req.body.username,
    password: req.body.password,
  };

  userModel.add(entity).then(id => {
    res.status(200).json({ messages: "Success!!!" });
  })
})

module.exports = router;
