const {
  comprobatedSymbols,
  failsSymbolsBinance,
  failKucoin,
  failBitget,
  failHuobi,
  failMexc,
  failGateio,
  failDigifinex,
  failByBit,
  failCryptoDotCom,
  failOkx,
  failBingx,
  failBitstamp,
  failBitmart,
  failTidex,
  failBigone,
  failLbank,
  failKraken,
} = require("../utils/constants/failsSymbols");
const { hasFailedSymbols } = require("../helpers/hasFailedSymbols");
const { getNetworkBinance, getNetworkHuobi, getNetworkKucoin, getNetworkBybit, getNetworkGateIo, getNetworkMexc, getNetworkBitget, getNetworkDigifinex } = require("./network.controller");
const { normalicedNetworkData } = require("../helpers/normalicedNetworkData");

const getAllNetworks = async (req, res, next) => {
  let data = [];
  const networkData = await Promise.all([
    getNetworkBinance(),
    getNetworkKucoin(),
    getNetworkHuobi(),
    getNetworkGateIo(),
    getNetworkMexc(),
    getNetworkBitget(),
    getNetworkDigifinex(),
    //getNetworkBybit(),
  ]).catch((error) => console.log("Error", error));
  const binanceNetArr = networkData[0];
  const binanceNetObj = normalicedNetworkData(failsSymbolsBinance, networkData[0]);
  const kucoinNetObj = normalicedNetworkData(failKucoin, networkData[1]);
  const huobiNetObj = normalicedNetworkData(failHuobi, networkData[2]) ;
  const gateIoNetObj = normalicedNetworkData (failGateio, networkData[3]);
  const mexcNetObj = normalicedNetworkData (failMexc, networkData[4]);
  const bitGetNetObj= normalicedNetworkData (failBitget, networkData[5]);
  const digifinexNetObj = normalicedNetworkData(failDigifinex, networkData[6]);
  //const bybitNetObj = normalicedNetworkData(failByBit, networkData[7] );


  binanceNetArr.forEach((elem) => {
    const s = elem.symbol;
    const n = {
      binance: binanceNetObj[s]?.networks,
      kucoin: kucoinNetObj[s]?.networks ? kucoinNetObj[s]?.networks : null,
      huobi: huobiNetObj[s]?.networks ? huobiNetObj[s]?.networks : null,
      gateIo: gateIoNetObj[s]?.networks ? gateIoNetObj[s]?.networks : null,
      mexc: mexcNetObj[s]?.networks ? mexcNetObj[s]?.networks : null,
      bitget: bitGetNetObj[s]?.networks ? bitGetNetObj[s]?.networks : null,
      digifinex : digifinexNetObj[s]?.networks ? bitGetNetObj[s]?.networks : null,
      //bybit: bybitNetObj[s]?.networks ? bybitNetObj[s]?.networks: null,
      
    };
    data.push({
      symbol: s,
      networks: n,
    });
  })
  return res.json(data);

}

module.exports = {getAllNetworks}