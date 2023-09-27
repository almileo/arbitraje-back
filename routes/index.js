var express = require('express');
var router = express.Router();
const { getDataBinance, getDataKucoin, getDataBybit } = require('../controllers/data.controller');
const cors = require('cors');


router.get('/',cors(), getDataBybit);


module.exports = router;
