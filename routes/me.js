var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log(req.user);
    const { id, username } = req.user;
    res.status(200).json({ id, username });
});



module.exports = router;
