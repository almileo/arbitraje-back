const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const { getAllData } = require('./getArbitrage.controller');


dotenv.config();
const TELEGRAM_API = process.env.TELEGRAM_API;
const telegramBot = new TelegramBot(TELEGRAM_API, { polling: true });

const initializeTelegramBot = () => {
  try{

  telegramBot.on("polling_error", (msg) => console.log('Error Telegram: ', msg));

  telegramBot.addListener("message", (msg) => {
    if(msg.text === 'help'){
      telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO,'Utilice la pagina ');
    }
    if (msg.text === 'bot') {
      telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, `aca se retransmitiria el msg anterior`);
    }
    if(msg.text === 'trading'){
      telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO,'Las mejores trading del dia son: ');
    }
  });
  console.log('Bot de Telegram inicializado correctamente.');
}catch(error){
  console.log('Error al inicializa el bot de telegram', error.message);
}
}
const sendMessageAlert= (req, res)=>{
  try {
    telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, req.body.msg);
    res.status(200).send('Ya mande el mensaje').end();
  } catch (error) {
    console.log('Error al enviar el mensaje', error.message);
    res.status(400).send('Error al enviar el mensaje', error.message).end();
  }
}

function randomnExchange (obj, num) {
  const keys = Object.keys(obj);
  const shuffledKeys = keys.slice().sort(() => 0.5 - Math.random());

  const result = {};
  shuffledKeys.slice(0, num).forEach(key => {
    result[key] = obj[key];
  });
  console.log('Result', keys);
  return result;
}

async function  sendRandomExchange (){
  let msgTest=[];
  const minProfit = process.env.MIN_PROFIT
  const maxProfit = process.env.MAX_PROFIT
  const bodyFree = {msg:''};
  const response = await axios.get('http://localhost:3000/data');
  const data = response.data;
  console.log('data', data);


}



module.exports = { initializeTelegramBot, sendMessageAlert, randomnExchange, sendRandomExchange };