var express = require('express');
var router = express.Router();
const passport = require('passport');
var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var entity = {
    username: req.body.username,
    password: hash,
  };

  userModel.add(entity).then(id => {
    res.status(200).json({ messages: "Success!!!" });
  }).catch(reason => {
    res.status(500).json({ messages: "Error!!!" });
  })
})

/* POST login. */
router.post('/login', function (req, res, next) {
  console.log("user/login:: start");
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log("user/login:: in callback of authenicate");;

    if (err || !user) {
      console.log('user/login:: ', err);
      return res.status(400).json({
        message: 'Something is not right',
        user: null
      });
    }
    console.log('user/login: raw user: ',user);
    req.login(user, { session: false }, (err) => {
      console.log('user/login:: user', user);
      if (err) {
        console.log('user/login:: ', err);
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
