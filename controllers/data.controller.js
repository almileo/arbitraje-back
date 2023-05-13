const axios = require('axios');
const { ConstantURL } = require('../utils/constants/url');
const { comprobatedSymbols, failsSymbolsBinance, failKucoin, failBitget, failHuobi, failMexc, failGateio, failDigifinex } = require('../utils/constants/failsSymbols')

const getDataBinance = async (req, res, next) => {
  const response = await axios.get(ConstantURL.binance.price_change);
  console.log(response)
  let binanceObj = {}
  for (const key of response.data) {
    let isFail = failsSymbolsBinance.includes(key.symbol);
    binanceObj[key.symbol] = { price: (isFail ? null : parseFloat(key.price)), url: (isFail ? null : key.url), isComprobated: key.isComprobated, volume: (isFail ? null : key.volume), bid: isFail || key.bid === 0 ? null : key.bid, ask: isFail || key.ask === 0 ? null : key.ask };
  }
  console.log(binanceObj)
  if (response.status === 200) {
    return res.json(binanceObj).status(200); 
  }

  return res.json(response.statusText).status(response.status);
}

// const getDataKucoin = async (req, res, next) => {
//   const response = await axios.get(ConstantURL.kucoin.url);

//   if (response.status === 200) {
//     return res.json(response.data).status(200); 
//   }

//   return res.json(response.statusText).status(response.status);
// }

// const getDataBybit= async (req, res, next) => {
//   const response = await axios.get(ConstantURL.bybit.url);

//   if (response.status === 200) {
//     return res.json(response.data).status(200); 
//   }

//   return res.json(response.statusText).status(response.status);
// }

module.exports = { getDataBinance }
