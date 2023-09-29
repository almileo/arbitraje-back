var express = require('express');
var router = express.Router();
const { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget,  getDataOkx, getDataBingx, getDataBitstamp, getDataBitmart, getDataKraken } = require('../controllers/data.controller');
const cors = require('cors');


router.get('/',cors(), getDataGateIo);


module.exports = router;
