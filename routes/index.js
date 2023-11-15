var express = require('express');
var router = express.Router();
const { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget,  getDataOkx, getDataBingx, getDataBitstamp, getDataBitmart, getDataKraken, getDataDigifinex, getDataTidex, getDataBigone } = require('../controllers/data.controller');
//const getAllData= require('../controllers/getArbitrage.controller');
const cors = require('cors');
const { getAllData } = require('../controllers/getArbitrage.controller');


router.get('/data/:min/:max',cors(), getAllData);
router.get("/",(req, res)=>{
    res.send('Esto es el Backend de la Crypto!');   
  });


//router.get('/arbitraje', cors(), getArbitrageTableData)


module.exports = router;
