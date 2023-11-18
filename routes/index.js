var express = require('express');
var router = express.Router();
const cors = require('cors');
const { getAllData } = require('../controllers/getArbitrage.controller');
const { initializeTelegramBot, sendMessageAlert, sendRandomExchange} = require('../controllers/telegram.controller');


initializeTelegramBot();
sendRandomExchange();
const randomMessage = setInterval(sendRandomExchange,process.env.MESSAGE_TIME)


router.get('/data/:min?/:max?',cors(), getAllData);
router.get("/",(req, res)=>{
    res.send('Esto es el Backend de la Crypto!');   
  });

//router.post('/telegram/alert', cors(),(req, res)=> sendMessageAlert(req, res))



//router.get('/arbitraje', cors(), getArbitrageTableData)


module.exports = router;
