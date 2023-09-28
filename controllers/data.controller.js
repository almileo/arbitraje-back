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
  gateIoDataArr.forEach(e => {
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
const getDataMexc = async (req, res, next) => {
  const dataMexc = await axios.get(ConstantURL.mexc.url);
  const mexcDataArr = dataMexc.data.data;
  const status = dataMexc.data.code;
  mexcDataArr.forEach(e => {
    e.url = `https://www.mexc.com/es-ES/exchange/${e.symbol}`;
    e.symbol = e.symbol.replace(/_/, '');
    e.price = e.last;
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.volume = e.volume;
    e.bid = parseFloat(e.bid);
    e.ask = parseFloat(e.ask);
  })
  const filteredData = hasFailedSymbols(failMexc, mexcDataArr);
  if (status === 200) {
    return res.json(filteredData).status(200);
  } else {
    return res.json(statusText).status(status);
  }
}
const getDataLbank = async (req, res, next) => {
  const dataLbank = await axios.get(ConstantURL.lbank.url);
  const lbankDataArr = dataLbank.data
  lbankDataArr.forEach(e => {
    e.symbol = e.symbol.replace(/_/, '').toUpperCase();
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.price = e.ticker.latest;
    e.volume = e.ticker.vol;
  })
  const filteredData = hasFailedSymbols(comprobatedSymbols, lbankDataArr);
  return res.json(filteredData).status(200);
}
const getDataBitget = async (req, res, next) => {
  const dataBitget = await axios.get(ConstantURL.bitget.url);
  const bitgetDataArr = dataBitget.data.data;
  const status = dataBitget.data.code;
  bitgetDataArr.forEach(e => {
    e.price = e.close;
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.url = `https://www.bitget.com/es/spot/${e.symbol}_SPBL`
    e.volume = e.usdtVol;
    e.bid = parseFloat(e.buyOne);
    e.ask = parseFloat(e.sellOne);
  })
  const filteredData = hasFailedSymbols(failBitget, bitgetDataArr);
  if (status === "00000") {
    return res.json(filteredData).status(200);
  } else {
    return res.json(statusText).status(status);
  }
}
/*const getDataKraken = async (req, res, next) => {
  const dataKraken = await axios.get(ConstantURL.kraken.url);
  const krakenDataArr = dataKraken.data.result;
  krakenDataArr.forEach(e => {
    e.symbol = e;
    let coin = e.symbol;
    let base = e.symbol.slice(-4);
    let url = '';
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    if (base === 'BUSD' || base === 'USDT' || base === 'USDC') {
      url = `${coin.slice(0, -4)}${'-'}${base}`
    } else {
      base = e.symbol.slice(-3);
      url = `${coin.slice(0, -3)}${'-'}${base}`
    }
    e.price = e[1].c[0];
    e.url = `https://trade.kraken.com/es-es/charts/KRAKEN:${url}`;
    e.volume = e[1].v[1];
    e.bid = parseFloat(e[1].b[0]);
    e.ask = parseFloat(e[1].a[0]);
  })
  const filteredData = hasFailedSymbols(comprobatedSymbols, krakenDataArr);
  return res.json(filteredData).status(200);
}*/
const getDataOkx = async (req, res, next) => {
  const dataOkx = await axios.get(ConstantURL.okx.url);
  const OkxDataArr = dataOkx.data.data;
  const status = dataOkx.data.code
  OkxDataArr.forEach(e => {
    e.url = `https://www.okx.com/es-es/trade-spot/${e.instId}`;
    e.symbol = e.instId.replace(/-/, '');
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.price = e.last;
    e.volume = e.vol24h;
    e.bid = parseFloat(e.bidPx);
    e.ask = parseFloat(e.askPx);
  })
  const filteredData = hasFailedSymbols(comprobatedSymbols, OkxDataArr)
  if (status === "0") {
    return res.json(filteredData).status(200);
  } else {
    return res.json(statusText).status(status);
  }
}
const getDataBingx = async (req, res, next) => {
  const dataBingx = await axios.get(ConstantURL.bingx.url);
  const BingxDataArr = dataBingx.data.data.tickers;
  const status = dataBingx.data.code;
  BingxDataArr.forEach(e => {
    e.symbol = e.symbol.replace(/-/, '');
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.price = e.lastPrice;
    e.url = `https://bingx.com/es-es/spot/${e.symbol}`;
    e.volume = e.volume;
    e.bid = parseFloat(e.bidPrice);
    e.ask = parseFloat(e.askPrice)
  })
  const filteredData = hasFailedSymbols(comprobatedSymbols,BingxDataArr)
  if (status === 0) {
    return res.json(filteredData).status(200);
  } else {
    return res.json(statusText).status(status);
  }
}
const getDataBitstamp = async(req, res, next)=>{
  const dataBitstamp = await axios.get(ConstantURL.bitstamp.url);
  const bitstampDataArr = dataBitstamp.data
  bitstampDataArr.forEach(e => {
    e.price = e.last;
    e.symbol = e.pair.split('/').join('');
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.volume = e.volume;
    e.bid = parseFloat(e.bid);
    e.ask = parseFloat(e.ask);
  });
  const filteredData = hasFailedSymbols(comprobatedSymbols, bitstampDataArr)
  return res.json(filteredData).status(200);

}


module.exports = { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget,/*getDataKraken*/ getDataOkx, getDataBingx, getDataBitstamp }
