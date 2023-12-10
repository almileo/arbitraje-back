
const normalicedNetworkData = (data ) => {
    let normalicedNetwork ={}

    for(const key of data){
        let symbol = key.symbol

        normalicedNetwork[symbol] = {
            networks: networks ? networks : {
            networkName: key.networkName,
            depositEnable: key.depositEnable,
            whithdrawEnable: key.whithdrawEnable
            } }

    }
    return normalicedNetwork

}

module.exports = {normalicedNetworkData}