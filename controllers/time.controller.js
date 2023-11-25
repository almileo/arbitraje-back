const { sendRandomExchange } = require("./telegram.controller");
const cron = require('node-cron');
const moment = require('moment-timezone');


const timerRandomMessage = () => {
  moment.tz.setDefault('America/Argentina/Buenos_Aires');

  const startTime = moment('11:00', 'HH:mm');
  const endTime = moment('23:00', 'HH:mm');


  cron.schedule('*/10 * * * *', () => {
    const currentTime = moment();
    if (currentTime.isBetween(startTime, endTime)) {
      sendRandomExchange();
    }
  });
}

module.exports = { timerRandomMessage }



