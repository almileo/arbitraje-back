const ConstantURL = {
  binance: {
    url: 'https://api.binance.com/api/v3/ticker/price',
    url_networks: '',
    price_change: 'https://api.binance.com/api/v3/ticker/24hr',
    kline: 'https://api.binance.com/api/v3/klines',
  },
  kucoin: {
    url: 'https://api.kucoin.com/api/v1/market/allTickers',
    url_networks: 'https://api.kucoin.com/api/v1/currencies',
    stats: 'https://api.kucoin.com/api/v1/market/stats',
  },
  bybit: {
    url: 'https://api.bybit.com/v2/public/tickers',
    url_networks: 'https://api.bybit.com/asset/v1/public/deposit/allowed-deposit-list'
  },
  cex: {
    url: 'https://cex.io/api/currency_profile',
    url_networks: ''
  },
  gate_io: {
    url: 'https://api.gateio.ws/api/v4/spot/tickers',
    url_networks: 'https://api.gateio.ws/api/v4/spot/currencies'
  },
  coinbase: {
    url: 'https://api.exchange.coinbase.com/products',
    url_networks: ''
  },
  poloniex: {
    url: 'https://api.poloniex.com/markets/price',
    url_networks: 'https://api.poloniex.com/currencies?includeMultiChainCurrencies=true'
  },
  houbi: {
    url: 'https://api.huobi.pro/market/tickers',
    url_networks: 'https://api.huobi.pro/v1/settings/common/currencys'
  },
  hitbtc: {
    url: 'https://api.hitbtc.com/api/2/public/ticker',
    url_networks: 'https://api.hitbtc.com/api/3/public/currency'
  },
  ftx: {
    url: 'https://ftx.com/api/markets',
    url_networks: 'https://ftx.com/api/wallet/coins'
  },
  bitfinex: {
    url: 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL',
    url_networks: ''
  },
  bittrex: {
    url: 'https://api.bittrex.com/v3/markets/tickers',
    url_networks: ''
  },
  coinex: {
    url: 'https://api.coinex.com/v1/market/ticker/all',
    url_networks: ''
  },
  upbit: {
    url: 'https://api.upbit.com/v1/market/all',
    url_networks: ''
  },
  mexc: {
    url: 'https://www.mexc.com/open/api/v2/market/ticker',
    url_networks: 'https://www.mexc.com/open/api/v2/market/coin/list'
  },
  kraken: {
    url: "https://api.kraken.com/0/public/Ticker",
    url_networks: ''
  },
  cryptoDotCom: {
    url: 'https://api.crypto.com/v2/public/get-ticker',
    url_networks: ''
  },
  gemini: {
    url: 'https://api.gemini.com/v1/pricefeed',
    url_networks: ''
  },
  lbank: {
    url: 'https://api.lbkex.com/v1/ticker.do?symbol=all',
    url_networks: ''
  },
  bitget: {
    url: 'https://api.bitget.com/api/spot/v1/market/tickers',
    url_networks: 'https://api.bitget.com/api/spot/v1/public/currencies'
  },
  bkex: {
    url: 'https://api.bkex.com/v2/q/ticker/price',
    url_networks: ''
  },
  okx: {
    url: 'https://www.okx.com/api/v5/market/tickers?instType=SPOT',
    url_networks: ''
  },
  bingx: {
    url: 'https://api-swap-rest.bingx.com/api/v1/market/getTicker',
    url_networks: ''
  },
  bitstamp: {
    url: 'https://www.bitstamp.net/api/v2/ticker/',
    url_networks: ''
  },
  bitmart: {
    url: 'https://api-cloud.bitmart.com/spot/v1/ticker',
    url_networks: 'https://api-cloud.bitmart.com/spot/v1/currencies'
  },
  digifinex: {
    url: 'https://openapi.digifinex.com/v3/ticker',
    url_networks: ''
  },
  bigone: {
    url: 'https://big.one/api/v3/asset_pairs/tickers'
  },
  tidex: {
    url: 'https://api.tidex.com/api/v1/public/tickers'
  }
};

module.exports = { ConstantURL }
  