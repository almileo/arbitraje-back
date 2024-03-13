var express = require('express');
var router = express.Router();
const cors = require('cors');
const path = require('path')
const { getAllData } = require('../controllers/getArbitrage.controller');
const { initializeTelegramBot, sendMessageAlert, sendRandomExchange } = require('../controllers/telegram.controller');
const { timerRandomMessage } = require('../controllers/time.controller');
const { getNetworkBitget, getNetworkKucoin, getNetworkBybit, getNetworkHuobi, getNetworkCryptoDotCom, getNetworkGateIo, getNetworkMexc, getNetworkOkx, getNetworkDigifinex, getNetworkBinance } = require('../controllers/network.controller');
const { getAllNetworks } = require('../controllers/getNetwork.controller');

//!Schemas getallnetworks
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
 *    
 */
//!Schemas getalldata

/**
  * @swagger
 * components:
 *   schemas:
 *     SymbolData:
 *       type: object
 *       properties:
 *         symbol:
 *           type: string
 *         prices:
 *           $ref: '#/components/schemas/Prices'
 *         urls:
 *           $ref: '#/components/schemas/Urls'
 *         isComprobated:
 *           type: boolean
 *         volume:
 *           $ref: '#/components/schemas/Volume'
 *         bid:
 *           $ref: '#/components/schemas/Bid'
 *         ask:
 *           $ref: '#/components/schemas/Ask'
 *         profit:
 *           type: number
 *         maxBid:
 *           type: number
 *         minAsk:
 *           type: number
 *
 *     Prices:
 *       type: object
 *       properties:
 *         binance:
 *           type: number | null
 *         bigone:
 *           type: number | null
 *         kucoin:
 *           type: number | null
 *         bybit:
 *           type: number | null
 *         gateIo:
 *           type: number | null
 *         huobi:
 *           type: number | null
 *         mexc:
 *           type: number | null
 *         cryptoDotCom:
 *           type: number | null
 *         lbank:
 *           type: number | null
 *         bitget:
 *           type: number | null
 *         kraken:
 *           type: number | null
 *         okx:
 *           type: number | null
 *         bingx:
 *           type: number | null
 *         bitstamp:
 *           type: number | null
 *         bitmart:
 *           type: number | null
 *         digifinex:
 *           type: number | null
 *         tidex:
 *           type: number | null
 *
 *     Urls:
 *       type: object
 *       properties:
 *         binance:
 *           type: string | null
 *         kucoin:
 *           type: string | null
 *         bybit:
 *           type: string | null
 *         gateIo:
 *           type: string | null
 *         huobi:
 *           type: string | null
 *         mexc:
 *           type: string | null
 *         cryptoDotCom:
 *           type: string | null
 *         lbank:
 *           type: string | null
 *         bitget:
 *           type: string | null
 *         kraken:
 *           type: string | null
 *         okx:
 *           type: string | null
 *         bingx:
 *           type: string | null
 *         bitstamp:
 *           type: string | null
 *         bitmart:
 *           type: string | null
 *         digifinex:
 *           type: string | null
 *         tidex:
 *           type: string | null
 *         bigone:
 *           type: string | null
 *
 *     Volume:
 *       type: object
 *       properties:
 *         kucoin:
 *           type: string | number | null
 *         bybit:
 *           type: string | number | null
 *         huobi:
 *           type: string | number | null
 *         cryptoDotCom:
 *           type: string | number | null
 *         gateIo:
 *           type: string | number | null
 *         bitget:
 *           type: string | number | null
 *         lbank:
 *           type: string | number | null
 *         mexc:
 *           type: string | number | null
 *         kraken:
 *           type: string | number | null
 *         okx:
 *           type: string | number | null
 *         bingx:
 *           type: string | number | null
 *         bitstamp:
 *           type: string | number | null
 *         bitmart:
 *           type: string | number | null
 *         digifinex:
 *           type: string | number | null
 *         tidex:
 *           type: string | number | null
 *         bigone:
 *           type: string | number | null
 *
 *     Bid:
 *       type: object
 *       properties:
 *         binance:
 *           type: number | null
 *         kucoin:
 *           type: number | null
 *         bybit:
 *           type: number | null
 *         huobi:
 *           type: number | null
 *         cryptoDotCom:
 *           type: number | null
 *         gateIo:
 *           type: number | null
 *         bitget:
 *           type: number | null
 *         lbank:
 *           type: number | null
 *         mexc:
 *           type: number | null
 *         kraken:
 *           type: number | null
 *         okx:
 *           type: number | null
 *         bingx:
 *           type: number | null
 *         bitstamp:
 *           type: number | null
 *         bitmart:
 *           type: number | null
 *         digifinex:
 *           type: number | null
 *         tidex:
 *           type: number | null
 *         bigone:
 *           type: number | null
 * 
 *     Ask:
 *       type: object
 *       properties:
 *         binance:
 *           type: number | null
 *         kucoin:
 *           type: number | null
 *         bybit:
 *           type: number | null
 *         huobi:
 *           type: number | null
 *         cryptoDotCom:
 *           type: number | null
 *         gateIo:
 *           type: number | null
 *         bitget:
 *           type: number | null
 *         lbank:
 *           type: number | null
 *         mexc:
 *           type: number | null
 *         kraken:
 *           type: number | null
 *         okx:
 *           type: number | null
 *         bingx:
 *           type: number | null
 *         bitstamp:
 *           type: number | null
 *         bitmart:
 *           type: number | null
 *         digifinex:
 *           type: number | null
 *         tidex:
 *           type: number | null
 *         bigone:
 *           type: number | null
 */



// swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CoinstarBot",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`
      },
      {
        url: `https://back-coinstartbot.onrender.com/`
      }
    ]
  },
  apis: [`${path.join(__dirname, './index.js')}`]
}
// middlewares
router.use(
  '/api-doc',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

//!getAllNetworks
/**
 * @swagger
 * /networks:
 *  get:
 *    summary: Get the networks of the cryptocurrencys
 *    tags: [Networks]
 *    responses:
 *     '200':
 *      description: Succes response
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            $ref: '#/components/schemas/NetworksResponse'
 *     
 */
//!GetAllData
/**
* @swagger
* /data/{min}/{max}:
*   get:
*     summary: Get data within a specific range
*     tags:
*       - Arbitrage
*     parameters:
*       - in: path
*         name: min
*         schema:
*           type: integer
*           default: 1
*         description: Minimum value
*       - in: path
*         name: max
*         schema:
*           type: integer
*           default: 30
*         description: Maximum value
*     responses:
*       '200':
*         description: Data obtained successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/SymbolData'
*       '400':
*         description: Invalid parameters
*/

//!Post Telegram

/**
 * @swagger
 * /telegram/alert:
 *   post:
 *     summary: Send alert via Telegram
 *     tags: [Telegram]
 *     requestBody:
 *       description: Message body for alert
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Alert sent successfully
 *       '400':
 *         description: Error sending alert
 */


//?ChatBot telegram
initializeTelegramBot();
timerRandomMessage();
//sendRandomExchange();


router.get('/data/:min?/:max?', cors(), getAllData);
router.get("/test", cors(), getNetworkBybit);
router.get('/networks', cors(), getAllNetworks)


router.post('/telegram/alert', cors(), (req, res) => sendMessageAlert(req, res))




module.exports = router;
