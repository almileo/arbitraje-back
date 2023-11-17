const axios = require('axios');
const { ConstantURL } = require('../utils/constants/url');
const { comprobatedSymbols, failsSymbolsBinance, failKucoin, failBitget, failHuobi, failMexc, failGateio, failDigifinex, failByBit, failCryptoDotCom, failOkx, failBingx, failBitstamp, failBitmart, failTidex, failBigone, failLbank, failKraken } = require('../utils/constants/failsSymbols');



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
  if (status === 200) {
    return binanceDataArr;
  }
  return res.json(statusText).status(status);

}
const getDataKucoin = async (req, res, next) => {
  const { data, status, statusText } = await axios.get(ConstantURL.kucoin.url)
  let kucoinDataArr = data.data.ticker;
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
if (status === 200) {
    return kucoinDataArr;
  } else {
    return res.json(statusText).status(status);
  }


}
const getDataBybit = async (req, res, next) => {
  const data = await axios.get(ConstantURL.bybit.url)
  let bybitDataArr = data.data.result;
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
  if (data.data.ret_code === 0) {
    return bybitDataArr;
  } else {
    return res.json(data.data.ret_msg).status(data.data.ret_code);
  }

}
const getDataHuobi = async (req, res, next) => {
  const dataHuobi = await axios.get(ConstantURL.houbi.url);
  const huobiDataArr = dataHuobi.data.data;
  const status = dataHuobi.data.status;
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
  if (status === 'ok') {
    return huobiDataArr;
  } else {
    return res.json(status).status(status);
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
  if (status === 0) {
    return cryptoDotComDataArr;
  } else {
    return res.json(status).status(status);
  }
}
const getDataGateIo = async (req, res, next) => {
  const { data, status, statusText } = await axios.get(ConstantURL.gate_io.url)
  const gateIoDataArr = data
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
  if (status === 200) {
    return gateIoDataArr;
  } else {
    return res.json(statusText).status(status);
  }
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
  if (status === 200) {
    return mexcDataArr;
  } else {
    return res.json(status).status(status);
  }
}
const getDataLbank = async (req, res, next) => {
  const dataLbank = await axios.get(ConstantURL.lbank.url);
  const lbankDataArr = dataLbank.data;
  const status = dataLbank.status;
  const statusText = dataLbank.statusText;
  lbankDataArr.forEach(e => {
    e.symbol = e.symbol.replace(/_/, '').toUpperCase();
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.price = e.ticker.latest;
    e.volume = e.ticker.vol;
  })
  if (status === 200) {
    return lbankDataArr
  } else {
    return res.json(statusText).status(status);
  }
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
  if (status === "00000") {
    return bitgetDataArr;
  } else {
    return res.json(dataBitget.data.msg).status(status);
  }
}
const getDataKraken = async (req, res, next) => {
  const dataKraken = await axios.get(ConstantURL.kraken.url);
  const krakenDataArr = Object.entries(dataKraken.data.result);
  const status = dataKraken.status;
  krakenDataArr.forEach(e => {
    e.symbol = e[0];
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
  if (status === 200) {
    return krakenDataArr;
  } else {
    return res.json(dataKraken.statusText).status(status);
  }
}
const getDataOkx = async (req, res, next) => {
  const dataOkx = await axios.get(ConstantURL.okx.url);
  const okxDataArr = dataOkx.data.data;
  const status = dataOkx.data.code
  okxDataArr.forEach(e => {
    e.url = `https://www.okx.com/es-es/trade-spot/${e.instId}`;
    e.symbol = e.instId.replace(/-/, '');
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.price = e.last;
    e.volume = e.vol24h;
    e.bid = parseFloat(e.bidPx);
    e.ask = parseFloat(e.askPx);
  })

  if (status === "0") {
    return okxDataArr;
  } else {
    return res.json(dataOkx.statusText).status(status);
  }
}
const getDataBingx = async (req, res, next) => {
  const dataBingx = await axios.get(ConstantURL.bingx.url);
  const bingxDataArr = dataBingx.data.data.tickers;
  const status = dataBingx.data.code;
  bingxDataArr.forEach(e => {
    e.symbol = e.symbol.replace(/-/, '');
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.price = e.lastPrice;
    e.url = `https://bingx.com/es-es/spot/${e.symbol}`;
    e.volume = e.volume;
    e.bid = parseFloat(e.bidPrice);
    e.ask = parseFloat(e.askPrice)
  })
  if (status === 0) {
    return bingxDataArr;
  } else {
    return res.json(dataBingx.statusText).status(status);
  }
}
const getDataBitstamp = async (req, res, next) => {
  const dataBitstamp = await axios.get(ConstantURL.bitstamp.url);
  const bitstampDataArr = dataBitstamp.data;
  const status = dataBitstamp.status;
  bitstampDataArr.forEach(e => {
    e.price = e.last;
    e.symbol = e.pair.split('/').join('');
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.volume = e.volume;
    e.bid = parseFloat(e.bid);
    e.ask = parseFloat(e.ask);
  });
  if (status === 200) {
    return bitstampDataArr;
  } else {
    return res.json(dataBitstamp.statusText).status(status);
  }
}
const getDataBitmart = async (req, res, next) => {
  const dataBitmart = await axios.get(ConstantURL.bitmart.url);
  const bitmartDataArr = dataBitmart.data.data.tickers;
  const status = dataBitmart.data.code;
  bitmartDataArr.forEach(e => {
    e.symbol = e.symbol.replace(/_/, '');
    let isComprobated = comprobatedSymbols.includes(e.symbol);
    e.isComprobated = isComprobated;
    e.price = e.last_price;
    e.volume = e.base_volume_24h;
    e.bid = parseFloat(e.best_bid);
    e.ask = parseFloat(e.best_ask);
  })

  if (status === 1000) {
    return bitmartDataArr;
  } else {
    return res.json(dataBitmart.statusText).status(status);
  }
}
const getDataDigifinex = async (req, res, next) => {
  const dataDigifinex = await axios.get(ConstantURL.digifinex.url);
  const digifinexDataArr = dataDigifinex.data.ticker;
  const status = dataDigifinex.status;
  digifinexDataArr.forEach(e => {
    const split = e.symbol.split('_');
    e.symbol = e.symbol.replace(/_/, '').toUpperCase();
    e.price = e.last;
    e.url = `https://www.digifinex.com/es-es/trade/${split[1]}/${split[0]}`;
    e.volume = e.vol;
    e.bid = parseFloat(e.buy);
    e.ask = parseFloat(e.sell);
  })
  if (status === 200) {
    return digifinexDataArr;
  } else {
    return res.json(statusText).status(status);
  }
}
const getDataTidex = async (req, res, next) => {
  const dataTidex = await axios.get(ConstantURL.tidex.url);
  const status = dataTidex.status
  const tidexDataArr = Object.entries(dataTidex.data.result);
  tidexDataArr.forEach(e => {
    const split = e[0].split('_');
    e.symbol = e[0].replace(/_/, '');
    e.price = e[1].ticker.last;
    e.bid = e[1].ticker.bid;
    e.ask = e[1].ticker.ask;
    e.volume = e[1].ticker.vol;
    e.url = `https://tidex.com/es/exchange/${split[0]}/${split[1]}`;
  })
  if (status === 200) {
    return tidexDataArr;
  } else {
    return res.json(statusText).status(status);
  }
}
const getDataBigone = async (req, res, next) => {
  const dataBigone = await axios.get(ConstantURL.bigone.url);
  const status = dataBigone.status;
  const bigoneDataArr = dataBigone.data.data;
  bigoneDataArr.forEach(e => {
    e.symbol = e.asset_pair_name.replace(/-/, '');
    e.price = e.close;
    e.bid = parseFloat(e.bid?.price);
    e.ask = parseFloat(e.ask?.price);
    e.url = `https://big.one/es/trade/${e.asset_pair_name}`
    e.volume = e.volume;
  })
  if (status === 200) {
    return bigoneDataArr;
  } else {
    return res.json(bigoneDataArr.statusText).status(status);
  }
}

module.exports = { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget, getDataKraken, getDataOkx, getDataBingx, getDataBitstamp, getDataBitmart, getDataDigifinex, getDataTidex, getDataBigone }
