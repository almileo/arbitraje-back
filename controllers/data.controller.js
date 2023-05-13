const axios = require('axios');
const { ConstantURL } = require('../utils/constants/url')

const getDataBinance = async (req, res, next) => {
  const response = await axios.get(ConstantURL.binance.price_change);

  if (response.status === 200) {
    return res.json(response.data).status(200); 
  }

  return res.json(response.statusText).status(response.status);
}

const getDataKucoin = async (req, res, next) => {
  const response = await axios.get(ConstantURL.kucoin.url);

  if (response.status === 200) {
    return res.json(response.data).status(200); 
  }

  return res.json(response.statusText).status(response.status);
}

const getDataBybit= async (req, res, next) => {
  const response = await axios.get(ConstantURL.bybit.url);

  if (response.status === 200) {
    return res.json(response.data).status(200); 
  }

  return res.json(response.statusText).status(response.status);
}

module.exports = { getDataBinance, getDataKucoin, getDataBybit }
