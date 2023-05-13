var express = require('express');
var router = express.Router();
const { getDataBinance } = require('../controllers/data.controller')

router.get('/', getDataBinance);

module.exports = router;
