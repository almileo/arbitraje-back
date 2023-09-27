const axios = require('axios');
const { ConstantURL } = require('../utils/constants/url');
const { comprobatedSymbols, failsSymbolsBinance, failKucoin, failBitget, failHuobi, failMexc, failGateio, failDigifinex } = require('../utils/constants/failsSymbols');
const { hasFailedSymbols } = require('../helpers/hasFailedSymbols');


const getDataBinance = async (req, res, next) => {
  const { data, status, statusText } = await axios.get(ConstantURL.binance.price_change)

  let binanceDataArr = data

  binanceDataArr.forEach(e => {
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

  const filteredData = hasFailedSymbols(failsSymbolsBinance, binanceDataArr)
  if (status === 200) {
    return res.json(filteredData).status(200);
  }

  return res.json(statusText).status(status);
}

const getDataKucoin = async (req, res, next) => {
  const dataK = await axios.get(ConstantURL.kucoin.url)

  let kucoinDataArr = dataK.data.data.ticker;
  let status = parseInt(dataK.data.code);
  kucoinDataArr.forEach(e => {
    let url = e.symbol;
    let dashIndex = url.indexOf('-');
    let currency = url.slice(0, dashIndex);
    e.currency = currency;
    e.symbol = url.replace(/-/g, '');
    e.price = e.last;
    e.url = `https://www.kucoin.com/es/trade/${url}`;
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;

    e.volume = parseFloat(e.vol);
    e.bid = parseFloat(e.buy);
    e.ask = parseFloat(e.sell);
  })
  const filteredData = hasFailedSymbols(failKucoin, kucoinDataArr)
  console.log('FilteredData: ', filteredData);
  if (status === 200000) {
    return res.json(filteredData).status(200);
  } else {
    return res.json(statusText).status(status);
  }


}

const getDataBybit = async (req, res, next) => {
  const dataBybit = await axios.get(ConstantURL.bybit.url)

  let bybitDataArr = dataBybit.data.result;
  console.log('bybitdataArr: ', dataBybit.data.result);
  bybitDataArr.forEach(e => {
    let url = '';
    let base = e.symbol.slice(-4);
    e.price = e.last_price;
    if (base === 'USDT' || base === 'USDC') {
      url = `${e.symbol.slice(0, -4)}${'/'}${base}`;
    } else {
      url = `${e.symbol.slice(0, -3)}${'/'}${e.symbol.slice(0, -3)}`;
    }
    e.url = `https://www.bybit.com/es-AR/trade/spot/${url}`;
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.volume = parseFloat(e.volume_24h);
    e.bid = parseFloat(e.bid_price);
    e.ask = parseFloat(e.ask_price);
  })
  const filteredData = hasFailedSymbols(comprobatedSymbols, bybitDataArr)
  console.log('FilteredData: ', filteredData);
  
}



module.exports = { getDataBinance, getDataKucoin, getDataBybit }
