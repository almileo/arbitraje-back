var express = require('express');
var router = express.Router();
const cors = require('cors');
const { getAllData } = require('../controllers/getArbitrage.controller');
const { initializeTelegramBot, sendMessageAlert, sendRandomExchange } = require('../controllers/telegram.controller');
const { timerRandomMessage } = require('../controllers/time.controller');
const { getNetworkBitget, getNetworkKucoin, getNetworkBybit, getNetworkHuobi, getNetworkCryptoDotCom, getNetworkGateIo, getNetworkMexc, getNetworkOkx, getNetworkDigifinex, getNetworkBinance } = require('../controllers/network.controller');



require('dotenv').config();
initializeTelegramBot();
timerRandomMessage();
sendRandomExchange();

router.get('/data/:min?/:max?', cors(), getAllData);
router.get("/", cors(), getNetworkBinance);


//router.post('/telegram/alert', cors(),(req, res)=> sendMessageAlert(req, res))



//router.get('/arbitraje', cors(), getArbitrageTableData)


module.exports = router;
