var express = require('express');
var router = express.Router();
const { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget,  getDataOkx, getDataBingx, getDataBitstamp, getDataBitmart, getDataKraken, getDataDigifinex, getDataTidex, getDataBigone } = require('../controllers/data.controller');
//const getAllData= require('../controllers/getArbitrage.controller');
const cors = require('cors');
const { getAllData } = require('../controllers/getArbitrage.controller');
const { initializeTelegramBot, sendMessageAlert } = require('../controllers/telegram.controller');
const TelegramBot = require('node-telegram-bot-api');


initializeTelegramBot();

router.get('/data/:min/:max',cors(), getAllData);
router.get("/",(req, res)=>{
    res.send('Esto es el Backend de la Crypto!');   
  });

router.post('/telegram/alert', cors(),(req, res)=> sendMessageAlert(req, res))



//router.get('/arbitraje', cors(), getArbitrageTableData)


module.exports = router;
