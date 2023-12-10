const hasFailedSymbols = (failsSymbols, data) => {
  let filteredObject = {}

  for (const key of data) {
    let isFail = failsSymbols.includes(key.symbol)
    filteredObject[key.symbol] = { 
      price: (isFail ? null : parseFloat(key.price)), 
      url: (isFail ? null : key.url), 
      isComprobated: key.isComprobated, 
      volume: (isFail ? null : key.volume), 
      bid: isFail || key.bid === 0 ? null : key.bid,
      ask: isFail || key.ask === 0 ? null : key.ask }
  }

  return filteredObject
};

module.exports = { hasFailedSymbols }
