const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const colors = require('colors');


dotenv.config();
const TELEGRAM_API = process.env.TELEGRAM_API;
const telegramBot = new TelegramBot(TELEGRAM_API);

const initializeTelegramBot = () => {
  try {
    telegramBot.on("polling_error", (msg) => console.log('Error Telegram: ', msg));
    telegramBot.onText(/^\/setcommand/, (msg) => {
      
      const opts = [
        { command: 'help', description: 'See all the commands we have for you' },
        { command: 'trading', description: 'See 5 random option for exchange' },
        { command: 'bot', description: 'See bot' },
        { command: 'notes', description: 'Take notes' },
        { command: 'day', description: 'See bot' },
        { command: 'hour', description: 'See bot' },
        { command: 'minutes', description: 'See bot' }
      ];
      
      telegramBot.setMyCommands(opts).then(function (info) {
        console.log(info)
      });;
    });
    telegramBot.onText(/^\/commands/, (msg) => {
      bot.getMyCommands().then(function (info) {
        console.log(info)
      });
    });
    
    telegramBot.addListener("message", (msg) => {
      if (msg.text === '/help') {
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, 'Utilice la pagina 22')
        console.log('msg', `El usuario ${msg.from.first_name} uso el comando ${msg.text}`);
      }
      if (msg.text === '/bot') {
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, `aca se retransmitiria el msg anterior`);
        console.log('msg', `El usuario ${msg.from.first_name} uso el comando ${msg.text}`);
      }
      if (msg.text === '/trading') {
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, 'The random exchanges are :');
        console.log('msg', `El usuario ${msg.from.first_name} uso el comando ${msg.text}`);
        
      }
      if (msg.text === '/hour') {
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, 'The random exchanges are :');
        console.log('msg', `El usuario ${msg.from.first_name} uso el comando ${msg.text}`);
        
      }
      if (msg.text === '/notes') {
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, 'The random exchanges are :');
        console.log('msg', `El usuario ${msg.from.first_name} uso el comando ${msg.text}`);
        
      }
      if (msg.text === '/days') {
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, 'The random exchanges are :');
        console.log('msg', `El usuario ${msg.from.first_name} uso el comando ${msg.text}`);
        
      }
      if (msg.text === '/minutes') {
        telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, 'The random exchanges are :');
        console.log('msg', `El usuario ${msg.from.first_name} uso el comando ${msg.text}`);
        
      }




    });
    console.log('Bot de Telegram inicializado correctamente.');
  } catch (error) {
    console.log('Error al inicializa el bot de telegram', error.message);
  }
}
const sendMessageAlert = (req, res) => {
  try {
    telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, req.body.msg);
    res.status(200).send('Ya mande el mensaje').end();
    console.log('Envie un mensaje pedido desde algun front');
  } catch (error) {
    console.log('Error al enviar el mensaje', error.message);
    res.status(400).send('Error al enviar el mensaje', error.message).end();
  }
}

function randomnExchange(obj, num) {
  const keys = Object.keys(obj);
  const shuffledKeys = keys.slice().sort(() => 0.5 - Math.random());
  const result = [];
  shuffledKeys.slice(0, num).forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

async function sendRandomExchange() {
  let bodyFree = "";
  try {
    const response = await axios.get('https://back-coinstartbot.onrender.com/data');
    const data = response.data;
    const randomData = randomnExchange(data, 5)
    randomData.forEach(e => {
    let bid = Object.values(e.bid);
    let ask = Object.values(e.ask);
    let maxBid = Math.max(...bid);
    let minAsk = Math.min.apply(null, ask.filter(e => e != null));
    let maxBidExchange = Object.keys(e.bid).filter(key => e.bid[key] == maxBid)[0].toUpperCase();
    let minAskExchange = Object.keys(e.ask).filter(key => e.ask[key] == minAsk)[0].toUpperCase();
    let strMinAsk = minAskExchange.includes('DOT') ? minAskExchange.replace('DOT', '.') : minAskExchange;
    let strMaxBid = maxBidExchange.includes('DOT') ? maxBidExchange.replace('DOT', '.') : maxBidExchange;
    e.maxExchange = strMaxBid;
    e.minExchange = strMinAsk;
    e.minAsk = parseFloat(minAsk).toFixed(10);
    e.maxBid = parseFloat(maxBid).toFixed(10);
    bodyFree = `\n*----------------------*\n*${e.symbol}* \nCompra en ${e.minExchange} a ${e.minAsk} \nVende en ${e.maxExchange} a ${e.maxBid} \nProfit ${e.profit}%\n*----------------------*\n\n`
    telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID_GRUPO, bodyFree, { parse_mode: "Markdown" });
    return e;
  });
  console.log(`Envie los mensajes al grupo ${process.env.TELEGRAM_CHAT_ID_GRUPO}`);
    
  } catch (error) {
    console.error('Error senRandomExchange: ', error)
  }
}



module.exports = { initializeTelegramBot, sendMessageAlert, randomnExchange, sendRandomExchange };