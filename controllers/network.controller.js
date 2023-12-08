const axios = require('axios');
const { ConstantURL } = require('../utils/constants/url');
const crypto = require('crypto');
const qs = require('qs');




/*const n = {
  binance: {
    chain:[{
      networkName:'',
      depositEnable:true,
      whithdrawEnable:true,
    }]
  }
}*/
const getNetworkBinance = async (req, res, next) => {
  try {
    const binanceConfig = {
      API_KEY: process.env.BINANCE_API_KEY,
      API_SECRET: process.env.BINANCE_API_SECRET,
      HOST_URL: 'https://api.binance.com',
    };

    const data = {
      recvWindow: 20000,
      timestamp: Date.now(),
    };

    const dataQueryString = qs.stringify(data);
    const signature = crypto.createHmac('sha256', binanceConfig.API_SECRET).update(dataQueryString).digest('hex');

    const headers = {
      'X-MBX-APIKEY': binanceConfig.API_KEY,
    };

    const url = `${binanceConfig.HOST_URL}/sapi/v1/capital/config/getall?${dataQueryString}&signature=${signature}`;

    const { data: binanceDataArr } = await axios.get(url, {
      headers,
    });

    binanceDataArr.forEach(e=>{
      e.symbol = e.coin
      e.networks= e.networkList.map(c=>{
        networkName = c.network
        depositEnable=c.depositEnable
        whithdrawEnable= c.withdrawEnable
        return {networkName, depositEnable, whithdrawEnable}
      })
    })
    console.log('Datos', binanceDataArr[7].networks);
    res.json(binanceDataArr).status(200);
    return binanceDataArr;
  } catch (error) {
    console.error('Error de APINetwork de Binance', error);
    return binanceDataArr = [];
  }
};

//OK
const getNetworkKucoin = async (req, res, next) => {
  try {

    const { data } = await axios.get(ConstantURL.kucoin.url_networks)
    let kucoinDataArr = data.data;
    kucoinDataArr.forEach(e => {
      e.symbol = e.currency;
      e.networkName = e.fullName;
      depositEnable = e.isDepositEnabled
      whithdrawEnable = e.isWithdrawEnabled
    })
    return kucoinDataArr;
  } catch (error) {
    console.error('Error de APINetwork de Kucoin', error);
    return kucoinDataArr = [];
  }
}

function getSignature(param, secret, timestamp, apiKey, recvWindow) {
  return crypto.createHmac('sha256', secret).update(timestamp + apiKey + recvWindow + param).digest('hex');
}

//depositEnable and whithdrawEnable: The chain status of deposit. 0: suspend. 1: normal //?OK
const getNetworkBybit = async (req, res, next) => {
  try {
    const timestamp = new Date().getTime().toString();
    const apiKey = process.env.BYBIT_API_KEY;
    const recvWindow = '20000';
    const param = '';
    const secret = process.env.BYBIT_API_SECRET
    const sign = getSignature(param, secret, timestamp, apiKey, recvWindow)
    const data = await axios.get(ConstantURL.bybit.url_networks, {
      headers: {
        'X-BAPI-API-KEY': process.env.BYBIT_API_KEY,
        'X-BAPI-TIMESTAMP': timestamp,
        'X-BAPI-RECV-WINDOW': recvWindow,
        'X-BAPI-SIGN': sign
      }
    })
    bybitDataArr = (data.data.result.rows);
    bybitDataArr.forEach(e => {
      e.symbol = e.coin
      e.networks = e.chains.map((c) => {
        networkName = c.chainType
        depositEnable = c.chainDeposit == '1' ? true : false
        withdrawEnable = c.chainWithdraw == '1' ? true : false
        return { networkName, depositEnable, withdrawEnable }
      })

    })

    return bybitDataArr;
  } catch (error) {
    console.error('Error de APINetwork de Bybit', error);
    return bybitDataArr = [];
  }
}

// ok
const getNetworkHuobi = async (req, res, next) => {
  try {
    const dataHuobi = await axios.get(ConstantURL.houbi.url_networks);
    const huobiDataArr = dataHuobi.data.data;
    const status = dataHuobi.data.status;
    huobiDataArr.forEach(e => {
      e.symbol = e.currency.toUpperCase();
      e.networkName = e.dn
      e.depositEnable = e.de
      e.withdrawable = e.we
    })

    return huobiDataArr;
  } catch (error) {
    console.error('Error de APINetwork de Huobi', error);
    return huobiDataArr = [];
  }
}
//!No se como acceder a la url de network pero lo encontre
const getNetworkCryptoDotCom = async (req, res, next) => {
  try {
    const timestamp = new Date().getTime();
    const apiKey = process.env.CRYPTODOT_API_KEY;
    const secret = process.env.CRYPTODOT_API_SECRET
    const param = {};

    const sign = getSignature(param, secret, timestamp, apiKey)
    const dataCryptoDotCom = await axios.get(ConstantURL.cryptoDotCom.url_networks, {
      headers: {
        "id": 12,
        "method": "private/get-currency-networks",
        "params": param,
        "api_key": apiKey,
        "sig": sign,
        "nonce": timestamp
      }
    })
    const cryptoDotComDataArr = dataCryptoDotCom.data.result.data;
    const status = parseInt(dataCryptoDotCom.data.code);
    /* cryptoDotComDataArr.forEach(e => {
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
      }*/
  } catch (error) {
    console.error('Error de APINetwork de Crypto.com', error);
    return cryptoDotComDataArr = [];
  }
}

//OK
const getNetworkGateIo = async (req, res, next) => {
  try {

    const { data } = await axios.get(ConstantURL.gate_io.url_networks)
    const gateIoDataArr = data
    gateIoDataArr.forEach(e => {
      e.symbol = e.currency.split('_')[0];
      e.depositEnable = !e.deposit_disabled
      e.withdrawEnable = !e.withdraw_disabled
      e.networkName = e.chain
    })
    return gateIoDataArr;
  } catch (error) {
    console.error('Error de APINetwork de GateIo', error);
    return gateIoDataArr = [];
  }
}
//ok
const getNetworkMexc = async (req, res, next) => {
  try {
    const dataMexc = await axios.get(ConstantURL.mexc.url_networks);
    const mexcDataArr = dataMexc.data.data;
    const regex = /\(([^)]+)\)/;
    mexcDataArr.forEach(e => {
      e.symbol = e.currency;
      e.networkName = e.coins.map((c => {
        chain = c.chain
        const startIndex = chain.indexOf('(') + 1;
        const endIndex = chain.indexOf(')');
        networkName = startIndex > 0 && endIndex > 0 ? chain.slice(startIndex, endIndex) : chain;
        depositEnable = c.is_deposit_enabled
        withdrawEnable = c.is_withdraw_enabled
        return { networkName, depositEnable, withdrawEnable }
      }))

    })
    return mexcDataArr;
  } catch (error) {
    console.error('Error de APINetwork de Mexc', error);
    return mexcDataArr = [];
  }
}
//!AYUDA https://www.lbank.com/en-US/docs/index.html#trade-record
const getNetworkLbank = async (req, res, next) => {
  try {
    const dataLbank = await axios.get(ConstantURL.lbank.url);
    const lbankDataArr = dataLbank.data;
    lbankDataArr.forEach(e => {

    })
    return lbankDataArr
  } catch (error) {
    console.error('Error de APINetwork de LBank', error);
    return lbankDataArr = [];
  }
}
//ok
const getNetworkBitget = async (req, res, next) => {
  try {
    const dataBitget = await axios.get(ConstantURL.bitget.url_networks);
    const bitgetDataArr = dataBitget.data.data;
    bitgetDataArr.forEach(e => {
      e.symbol = e.coin
      e.networks = e.chains.map((c) => {
        networkName = c.chain
        depositEnable = c.rechargeable
        withdrawEnable = c.withdrawable
        return { networkName, depositEnable, withdrawEnable }
      })
      console.log('Datos', bitgetDataArr[1].networks);
    })
    return bitgetDataArr;

  } catch (error) {
    console.error('Error de APINetwork de Bitget', error);
    return lbankDataArr = [];
  }
}
//?Armar funcion
const getNetworkKraken = async (req, res, next) => {
  try {
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
    return krakenDataArr;
  } catch (error) {
    console.error('Error de APINetwork de Bitget', error);
    return lbankDataArr = [];
  }


}
//
const getNetworkOkx = async (req, res, next) => {
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

const getNetworkBingx = async (req, res, next) => {
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

const getNetworkBitstamp = async (req, res, next) => {
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

const getNetworkBitmart = async (req, res, next) => {
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
//depositEnable and whithdrawEnable: The chain status of deposit. 0: off suspend. 1: on //?OK
const getNetworkDigifinex = async (req, res, next) => {
  try {
    const dataDigifinex = await axios.get(ConstantURL.digifinex.url_networks);
    const digifinexDataArr = dataDigifinex.data.data;
    digifinexDataArr.forEach(e => {
      e.symbol = e.currency
      e.networkName = e.chain
      e.depositEnable = e.deposit_status == '1' ? true : false
      e.withdrawEnable = e.withdraw_status == '1' ? true : false
    })
    return digifinexDataArr;
  } catch (error) {
    console.error('Error de APINetwork de Digifinex', error);
    return digifinexDataArr = [];
  }
}

const getNetworkTidex = async (req, res, next) => {
  try {
    const dataTidex = await axios.get(ConstantURL.tidex.url);
    const tidexDataArr = Object.entries(dataTidex.data.result);
    tidexDataArr.forEach(e => {
      const split = e[0].split('_');
      e.symbol = e[0].replace(/_/, '');
    })
    return tidexDataArr;

  } catch (error) {
    console.error('Error de APINetwork de Tidex', error);
    return tidexDataArr = [];
  }

}
//No trae info de redes
const getNetworkBigone = async (req, res, next) => {
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


module.exports = { getNetworkBinance, getNetworkBigone, getNetworkBingx, getNetworkBitget, getNetworkBitmart, getNetworkBitstamp, getNetworkBybit, getNetworkCryptoDotCom, getNetworkDigifinex, getNetworkGateIo, getNetworkHuobi, getNetworkKraken, getNetworkKucoin, getNetworkLbank, getNetworkMexc, getNetworkOkx, getNetworkTidex }