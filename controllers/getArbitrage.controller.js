const { getDataBinance, getDataKucoin, getDataBybit, getDataHuobi, getDataCryptoDotCom, getDataGateIo, getDataMexc, getDataLbank, getDataBitget, getDataOkx, getDataBingx, getDataBitstamp, getDataBitmart, getDataKraken, getDataDigifinex, getDataTidex, getDataBigone } = require('../controllers/data.controller')
const { comprobatedSymbols, failsSymbolsBinance, failKucoin, failBitget, failHuobi, failMexc, failGateio, failDigifinex, failByBit, failCryptoDotCom, failOkx, failBingx, failBitstamp, failBitmart, failTidex, failBigone, failLbank, failKraken } = require('../utils/constants/failsSymbols');
const { hasFailedSymbols } = require('../helpers/hasFailedSymbols');
const { getNetworkBinance, getNetworkHuobi } = require('./network.controller');
const { normalicedNetworkData } = require('../helpers/normalicedNetworkData');

const getAllData = async (req, res, next) => {
  const minProfit= req?.params.min || process.env.MIN_PROFIT;
  const maxProfit= req?.params.max || process.env.MAX_PROFIT
  let data = []
  const exchangeData = await Promise.all([
    getDataBinance(), 
    getDataKucoin(),
    getDataBybit(), 
    getDataHuobi(), 
    getDataCryptoDotCom(), 
    getDataGateIo(), getDataMexc(), getDataLbank(), getDataBitget(), getDataKraken(), getDataOkx(), getDataBingx(), getDataBitstamp(), getDataBitmart(), getDataDigifinex(), getDataTidex(), getDataBigone(), getNetworkBinance(), getNetworkHuobi() ]).catch(error => console.log('Error', error));
  const binanceArr = exchangeData[0];
  const binanceObj = hasFailedSymbols(failsSymbolsBinance, exchangeData[0]);
  const kucoinObj = hasFailedSymbols(failKucoin, exchangeData[1]);
  const bybitObj = hasFailedSymbols(failByBit, exchangeData[2]);
  const huobiObj = hasFailedSymbols(failHuobi, exchangeData[3]);
  const cryptoDotComObj = hasFailedSymbols(failCryptoDotCom, exchangeData[4]);
  const gateIoObj = hasFailedSymbols(failGateio, exchangeData[5]);
  const mexcObj = hasFailedSymbols(failMexc, exchangeData[6]);
  const lbankObj = hasFailedSymbols(failLbank, exchangeData[7]);
  const bitgetObj = hasFailedSymbols(failBitget, exchangeData[8]);
  const krakenObj = hasFailedSymbols(failKraken, exchangeData[9]);
  const okxObj = hasFailedSymbols(failOkx, exchangeData[10]);
  const bingxObj = hasFailedSymbols(failBingx, exchangeData[11]);
  const bitstampObj = hasFailedSymbols(failBitstamp, exchangeData[12]);
  const bitmartObj = hasFailedSymbols(failBitmart, exchangeData[13]);
  const digifinexObj = hasFailedSymbols(failDigifinex, exchangeData[14]);
  const tidexObj = hasFailedSymbols(failTidex, exchangeData[15]);
  const bigoneObj = hasFailedSymbols(failBigone, exchangeData[16]);
  const binanceNetArr = exchangeData[17];
  const huobiNetArr = normalicedNetworkData(exchangeData[18])
  
  console.log('HuboiNetArr', huobiNetArr);
  
  binanceArr.forEach(elem => {
    const s = elem.symbol
    const n = {
      binance: binanceNetArr[s].networks
      }
    
    const p = {
      binance: binanceObj[s].price,
      bigone: bigoneObj[s]?.price ? bigoneObj[s]?.price : null,
      kucoin: kucoinObj[s]?.price ? kucoinObj[s]?.price : null,
      bybit: bybitObj[s]?.price ? bybitObj[s]?.price : null,
      gateIo: gateIoObj[s]?.price ? gateIoObj[s]?.price : null,
      huobi: huobiObj[s]?.price ? huobiObj[s]?.price : null,
      mexc: mexcObj[s]?.price ? mexcObj[s]?.price : null,
      cryptoDotCom: cryptoDotComObj[s]?.price ? cryptoDotComObj[s]?.price : null,
      lbank: lbankObj[s]?.price ? lbankObj[s]?.price : null,
      bitget: bitgetObj[s]?.price ? bitgetObj[s]?.price : null,
      kraken: krakenObj[s]?.price ? krakenObj[s]?.price : null,
      okx: okxObj[s]?.price ? okxObj[s]?.price : null,
      bingx: bingxObj[s]?.price ? bingxObj[s]?.price : null,
      bitstamp: bitstampObj[s]?.price ? bitstampObj[s]?.price : null,
      bitmart: bitmartObj[s]?.price ? bitmartObj[s]?.price : null,
      digifinex: digifinexObj[s]?.price ? digifinexObj[s]?.price : null,
      tidex: tidexObj[s]?.price ? tidexObj[s]?.price : null,
    }
    const u = {
      binance: binanceObj[s].url,
      kucoin: kucoinObj[s]?.url ? kucoinObj[s]?.url : null,
      bybit: bybitObj[s]?.url ? bybitObj[s]?.url : null,
      gateIo: gateIoObj[s]?.url ? gateIoObj[s]?.url : null,
      huobi: huobiObj[s]?.url ? huobiObj[s]?.url : null,
      mexc: mexcObj[s]?.url ? mexcObj[s]?.url : null,
      cryptoDotCom: cryptoDotComObj[s]?.url ? cryptoDotComObj[s]?.url : null,
      lbank: lbankObj[s]?.url ? lbankObj[s]?.url : null,
      bitget: bitgetObj[s]?.url ? bitgetObj[s]?.url : null,
      kraken: krakenObj[s]?.url ? krakenObj[s]?.url : null,
      okx: okxObj[s]?.url ? okxObj[s]?.url : null,
      bingx: bingxObj[s]?.url ? bingxObj[s]?.url : null,
      bitstamp: bitstampObj[s]?.url ? bitstampObj[s]?.url : null,
      bitmart: bitmartObj[s]?.url ? bitmartObj[s]?.url : null,
      digifinex: digifinexObj[s]?.url ? digifinexObj[s]?.url : null,
      tidex: tidexObj[s]?.url ? tidexObj[s]?.url : null,
      bigone: bigoneObj[s]?.url ? bigoneObj[s]?.url : null,
    }
    const v = {
      binance: binanceObj[s].volume,
      kucoin: kucoinObj[s]?.volume ? kucoinObj[s]?.volume : null,
      bybit: bybitObj[s]?.volume ? bybitObj[s]?.volume : null,
      huobi: huobiObj[s]?.volume ? huobiObj[s]?.volume : null,
      cryptoDotCom: cryptoDotComObj[s]?.volume ? cryptoDotComObj[s]?.volume : null,
      gateIo: gateIoObj[s]?.volume ? gateIoObj[s]?.volume : null,
      bitget: bitgetObj[s]?.volume ? bitgetObj[s]?.volume : null,
      lbank: lbankObj[s]?.volume ? lbankObj[s]?.volume : null,
      mexc: mexcObj[s]?.volume ? mexcObj[s]?.volume : null,
      kraken: krakenObj[s]?.volume ? krakenObj[s]?.volume : null,
      okx: okxObj[s]?.volume ? okxObj[s]?.volume : null,
      bingx: bingxObj[s]?.volume ? bingxObj[s]?.volume : null,
      bitstamp: bitstampObj[s]?.volume ? bitstampObj[s]?.volume : null,
      bitmart: bitmartObj[s]?.volume ? bitmartObj[s]?.volume : null,
      digifinex: digifinexObj[s]?.volume ? digifinexObj[s]?.volume : null,
      tidex: tidexObj[s]?.volume ? tidexObj[s]?.volume : null,
      bigone: bigoneObj[s]?.volume ? bigoneObj[s]?.volume : null,
    }
    const b = {
      binance: binanceObj[s].bid,
      kucoin: kucoinObj[s]?.bid ? kucoinObj[s]?.bid : null,
      bybit: bybitObj[s]?.bid ? bybitObj[s]?.bid : null,
      huobi: huobiObj[s]?.bid ? huobiObj[s]?.bid : null,
      cryptoDotCom: cryptoDotComObj[s]?.bid ? cryptoDotComObj[s]?.bid : null,
      gateIo: gateIoObj[s]?.bid ? gateIoObj[s]?.bid : null,
      bitget: bitgetObj[s]?.bid ? bitgetObj[s]?.bid : null,
      lbank: lbankObj[s]?.bid ? lbankObj[s]?.bid : null,
      mexc: mexcObj[s]?.bid ? mexcObj[s]?.bid : null,
      kraken: krakenObj[s]?.bid ? krakenObj[s]?.bid : null,
      okx: okxObj[s]?.bid ? okxObj[s]?.bid : null,
      bingx: bingxObj[s]?.bid ? bingxObj[s]?.bid : null,
      bitstamp: bitstampObj[s]?.bid ? bitstampObj[s]?.bid : null,
      bitmart: bitmartObj[s]?.bid ? bitmartObj[s]?.bid : null,
      digifinex: digifinexObj[s]?.bid ? digifinexObj[s]?.bid : null,
      tidex: tidexObj[s]?.bid ? tidexObj[s]?.bid : null,
      bigone: bigoneObj[s]?.bid ? bigoneObj[s]?.bid : null,
    }
    const a = {
      binance: binanceObj[s].ask,
      kucoin: kucoinObj[s]?.ask ? kucoinObj[s]?.ask : null,
      bybit: bybitObj[s]?.ask ? bybitObj[s]?.ask : null,
      huobi: huobiObj[s]?.ask ? huobiObj[s]?.ask : null,
      cryptoDotCom: cryptoDotComObj[s]?.ask ? cryptoDotComObj[s]?.ask : null,
      gateIo: gateIoObj[s]?.ask ? gateIoObj[s]?.ask : null,
      bitget: bitgetObj[s]?.ask ? bitgetObj[s]?.ask : null,
      lbank: lbankObj[s]?.ask ? lbankObj[s]?.ask : null,
      mexc: mexcObj[s]?.ask ? mexcObj[s]?.ask : null,
      kraken: krakenObj[s]?.ask ? krakenObj[s]?.ask : null,
      okx: okxObj[s]?.ask ? okxObj[s]?.ask : null,
      bingx: bingxObj[s]?.ask ? bingxObj[s]?.ask : null,
      bitstamp: bitstampObj[s]?.ask ? bitstampObj[s]?.ask : null,
      bitmart: bitmartObj[s]?.ask ? bitmartObj[s]?.ask : null,
      digifinex: digifinexObj[s]?.ask ? digifinexObj[s]?.ask : null,
      tidex: tidexObj[s]?.ask ? tidexObj[s]?.ask : null,
      bigone: bigoneObj[s]?.ask ? bigoneObj[s]?.ask : null,
    }
    data.push({ symbol: s, prices: p, urls: u, isComprobated: elem.isComprobated, currency: elem.currency, volume: v, bid: b, ask: a });
  })
  data = getProfit(minProfit,maxProfit,data)
  return res.json(data);

}

const getProfit = (minProfit, maxProfit, data)=>{
  let bid = [];
  let ask = [];
  data.map(e=>{
    bid= Object.values(e.bid);
    ask= Object.values(e.ask);
    let maxBid= Math.max(...bid);
    let minAsk= Math.min(...ask.filter(e=> e!=null));
    const profit = ((maxBid - minAsk) / maxBid) * 100;
    e.profit = parseFloat(profit.toFixed(2));
    e.maxBid= maxBid;
    e.minAsk= minAsk;  
  })
  
  const dataFiltered = data.filter(e=> e.profit >= minProfit && e.profit<=maxProfit);
  data= dataFiltered;
  data.sort((a,b)=> b.profit - a.profit);
  return data;
}



module.exports = { getAllData }