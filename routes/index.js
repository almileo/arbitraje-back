var express = require('express');
var router = express.Router();
const cors = require('cors');
const cron = require('node-cron');
const moment = require('moment-timezone');
const { getAllData } = require('../controllers/getArbitrage.controller');
const { initializeTelegramBot, sendMessageAlert, sendRandomExchange} = require('../controllers/telegram.controller');
const { timerRandomMessage } = require('../controllers/time.controller');
const { getNetworkBitget, getNetworkKucoin, getNetworkBybit } = require('../controllers/network.controller');

//initializeTelegramBot();
//timerRandomMessage();
//sendRandomExchange();
//const randomMessage = setInterval(sendRandomExchange,process.env.MESSAGE_TIME);



router.get('/data/:min?/:max?',cors(), getAllData);
router.get("/",cors(), getNetworkBybit);

//router.post('/telegram/alert', cors(),(req, res)=> sendMessageAlert(req, res))



//router.get('/arbitraje', cors(), getArbitrageTableData)


module.exports = router;
