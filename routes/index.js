var express = require('express');
var router = express.Router();
const { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget,  getDataOkx, getDataBingx, getDataBitstamp } = require('../controllers/data.controller');
const cors = require('cors');


router.get('/',cors(), getDataBitstamp);


module.exports = router;
