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
  let status = parseInt(dataBybit.data.ret_code);
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
  if (status === 0) {
    return res.json(filteredData).status(200);
  } else {
    return res.json(statusText).status(status);
  }

}


const getDataHuobi = async (req, res, next) => {
  const dataHuobi = await axios.get(ConstantURL.houbi.url);
  const huobiDataArr = dataHuobi.data.data;
  const status = dataHuobi.data.status;
  console.log('status: ', status);
  huobiDataArr.forEach(e => {
    let base = e.symbol.slice(-4);
    let url = '';
    if (base === 'usdt' || base === 'usdc' || base === 'usdd' || base === 'husd') {
      url = `${e.symbol.slice(0, -4)}${'_'}${base}`;
    } else {
      url = `${e.symbol.slice(0, -3)}${'_'}${e.symbol.slice(-3)}`;
    }
    e.url = `https://www.huobi.com/es-es/exchange/${url}`;
    e.symbol = e.symbol.toUpperCase();
    e.price = e.close;
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.volume = e.vol;
    e.bid = parseFloat(e.bid);
    e.ask = parseFloat(e.ask);
  })
  const filteredData = hasFailedSymbols(failHuobi, huobiDataArr)
  if (status === 'ok') {
    return res.json(filteredData).status(200);
  } else {
    return res.json(statusText).status(status);
  }
}

const getDataCryptoDotCom = async (req, res, next) => {
  const dataCryptoDotCom = await axios.get(ConstantURL.cryptoDotCom.url);
  const cryptoDotComDataArr = dataCryptoDotCom.data.result.data;
  const status = parseInt(dataCryptoDotCom.data.code);
  cryptoDotComDataArr.forEach(e => {
    e.url = `https://crypto.com/exchange/trade/spot/${e.i}`;
    e.symbol = e.i.replace(/_/, '');
    e.price = e.a;
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.volume = e.vv;
    e.bid = parseFloat(e.b);
    e.ask = parseFloat(e.k);
  })
  const filteredData = hasFailedSymbols(comprobatedSymbols, cryptoDotComDataArr)
  if (status === 0) {
    return res.json(filteredData).status(200);
  } else {
    return res.json(statusText).status(status);
  }
}

const getDataGateIo = async (req, res, next) => {
  const dataGateIo = await axios.get(ConstantURL.gate_io.url)
  const gateIoDataArr = dataGateIo.data
  gateIoDataArr.forEach(e =>{
    e.url = `https://www.gate.io/es/trade/${e.currency_pair}`;
    e.symbol = e.currency_pair.replace(/_/, '');
    e.price = e.last;
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.volume = e.base_volume;
    e.bid = parseFloat(e.highest_bid);
    e.ask = parseFloat(e.lowest_ask);
  })
  const filteredData = hasFailedSymbols(failGateio, gateIoDataArr)
  return res.json(filteredData).status(200);
    
    

}


module.exports = { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo }
