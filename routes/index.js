var express = require('express');
var router = express.Router();
const { getData } = require('../controllers/data.controller')

router.get('/', getData);

module.exports = router;
