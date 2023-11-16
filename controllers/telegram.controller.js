const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv')

dotenv.config();
const TELEGRAM_API = process.env.TELEGRAM_API;
const telegramBot = new TelegramBot(TELEGRAM_API, { polling: true });

const initializeTelegramBot = () => {
  try{

  telegramBot.on("polling_error", (msg) => console.log('Error Telegram: ', msg));

  telegramBot.addListener("message", (msg) => {
    if(msg.text === 'help'){
      telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO,'Las mejores trading del dia son: ');
    }
    if (msg.text === 'bot') {
      console.log(`Este es comando ${msg.text}`);
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



module.exports = { initializeTelegramBot, sendMessageAlert };