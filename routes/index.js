var express = require('express');
var router = express.Router();
const cors = require('cors');
const path = require('path')
const { getAllData } = require('../controllers/getArbitrage.controller');
const { initializeTelegramBot, sendMessageAlert, sendRandomExchange } = require('../controllers/telegram.controller');
const { timerRandomMessage } = require('../controllers/time.controller');
const { getNetworkBitget, getNetworkKucoin, getNetworkBybit, getNetworkHuobi, getNetworkCryptoDotCom, getNetworkGateIo, getNetworkMexc, getNetworkOkx, getNetworkDigifinex, getNetworkBinance } = require('../controllers/network.controller');
const { getAllNetworks } = require('../controllers/getNetwork.controller');

//!Schemas
/**
 * @swagger
 * components:
 *   schemas:
 *     NetworksResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/NetworkInfo'
 *
 *     NetworkInfo:
 *       type: object
 *       properties:
 *         symbol:
 *           type: string
 *         networks:
 *           $ref: '#/components/schemas/NetworksData'
 *
 *     NetworksData:
 *       type: object
 *       properties:
 *         binance:
 *           oneOf:
 *             - $ref: '#/components/schemas/NetworkDetail'
 *             - type: null
 *         kucoin:
 *           oneOf:
 *             - $ref: '#/components/schemas/NetworkDetail'
 *             - type: null
 *         bybit:
 *           type: null
 *         huobi:
 *           oneOf:
 *             - $ref: '#/components/schemas/NetworkDetail'
 *             - type: null
 *         gateIo:
 *           oneOf:
 *             - $ref: '#/components/schemas/NetworkDetail'
 *             - type: null
 *         mexc:
 *           oneOf:
 *             - $ref: '#/components/schemas/NetworkDetail'
 *             - type: null
 *         bitget:
 *           oneOf:
 *             - $ref: '#/components/schemas/NetworkDetail'
 *             - type: null
 *         digifinex:
 *           oneOf:
 *             - $ref: '#/components/schemas/NetworkDetail'
 *             - type: null
 *   
 *     NetworkDetail:
 *       type: object 
 *       properties:
 *         networkName:
 *           type: string
 *         depositEnable:
 *           type: boolean
 *         withdrawEnable:
 *           type: boolean
 */


// swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require ('swagger-jsdoc')
const swaggerSpec = {
  definition : {
    openapi : "3.0.0",
    info : {
      title : "CoinstarBot",
      version: "1.0.0",
    },
    servers :[
      {
        url: `http://localhost:${process.env.PORT || 3000}`
      }
    ]
  },
  apis:[`${path.join(__dirname, './index.js')}`]
}
// middlewares
router.use(
  '/api-doc', 
  swaggerUI.serve, 
  swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
  /**
   * @swagger
   * /networks:
   *  get:
   *    summary: Get all data of the cryptocurrencys
   *    tags: [BlockChains]
   *    responses:
   *     '200':
   *      description: Respuesta exitosa
   *      content:
   *        application/json:
   *          schema:
   *            type: array
   *            $ref: '#/components/schemas/NetworksResponse'
   *     
   */

//?ChatBot telegram
//initializeTelegramBot();
//timerRandomMessage();
//sendRandomExchange();


router.get('/data/:min?/:max?', cors(), getAllData);
router.get("/", cors(), getNetworkDigifinex);
router.get('/networks', cors(),getAllNetworks )


//router.post('/telegram/alert', cors(),(req, res)=> sendMessageAlert(req, res))



//router.get('/arbitraje', cors(), getArbitrageTableData)


module.exports = router;
