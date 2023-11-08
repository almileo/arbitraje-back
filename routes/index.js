var express = require('express');
var router = express.Router();
const { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget,  getDataOkx, getDataBingx, getDataBitstamp, getDataBitmart, getDataKraken, getDataDigifinex, getDataTidex, getDataBigone } = require('../controllers/data.controller');
const cors = require('cors');


router.get('/',cors(), getDataBigone);

//router.get('/arbitraje', cors(), getArbitrageTableData)


module.exports = router;
