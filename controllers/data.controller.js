const axios = require('axios');
const { ConstantURL } = require('../utils/constants/url');
const { comprobatedSymbols, failsSymbolsBinance, failKucoin, failBitget, failHuobi, failMexc, failGateio, failDigifinex } = require('../utils/constants/failsSymbols');
const { hasFailedSymbols } = require('../helpers/hasFailedSymbols');

const getDataBinance = async (req, res, next) => {
  const { data, status, statusText } = await axios.get(ConstantURL.binance.price_change)

  let arrayData = data

  arrayData.forEach(e => {
    let coin = e.symbol;
    let base = e.symbol.slice(-4);
    let url = '';

    if (base === 'BUSD' || base === 'USDT' || base === 'USDC') {
      url = `${coin.slice(0, -4)}${'_'}${base}`
    } else {
      base = e.symbol.slice(-3);
      url = `${coin.slice(0, -3)}${'_'}${base}`
    }
    e.url = `https://www.binance.com/es/trade/${url}`;
    e.price = e.lastPrice;
    e.volume = parseFloat(e.volume)
    e.bid = parseFloat(e.bidPrice)
    e.ask = parseFloat(e.askPrice)

    e.isComprobated = comprobatedSymbols.includes(e.symbol)
  })

  const filteredData = hasFailedSymbols(failsSymbolsBinance, arrayData)

  if (status === 200) {
    return res.json(filteredData).status(200); 
  }

  return res.json(statusText).status(status);
}

module.exports = { getDataBinance }
