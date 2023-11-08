var express = require('express');
var router = express.Router();
const { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget,  getDataOkx, getDataBingx, getDataBitstamp, getDataBitmart, getDataKraken, getDataDigifinex, getDataTidex, getDataBigone, getHome } = require('../controllers/data.controller');
const cors = require('cors');


router.get('/data',cors(), getDataBigone);
router.get("/",(req, res)=>{
    res.send('Esto es el Backend de la Crypto!');   
  });
//router.get('/', cors(), getHome);

//router.get('/arbitraje', cors(), getArbitrageTableData)


module.exports = router;
