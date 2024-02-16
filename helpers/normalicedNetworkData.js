
const normalicedNetworkData = (failsSymbols,data) => {
  let normalicedNetwork = {}
  
  for (const key of data) {
    let symbol = key.symbol
    let isFail = failsSymbols.includes(key.symbol)
    normalicedNetwork[symbol] = {
      ...key,
        networks: key.networks ? key.networks : {
        networkName: isFail ? null : key.networkName,
        depositEnable: isFail? null : key.depositEnable,
        whithdrawEnable: isFail? null :key.whithdrawEnable
      }
    }
  }
  return normalicedNetwork

}

module.exports = { normalicedNetworkData }