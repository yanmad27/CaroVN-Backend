var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/me', (req, res, next) => {
  res.render('index')
});

module.exports = router;
