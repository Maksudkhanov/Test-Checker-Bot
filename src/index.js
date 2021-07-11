const { Telegraf } = require("telegraf");
const token = require('./token')
const detectRole = require("./detectRole/detectRole");

const bot = new Telegraf(token);

try {
  bot.start((ctx) => {
    return detectRole(bot, ctx);
  });
} catch (error) {
  console.log(error.message);
  return detectRole(bot, ctx);
}


bot.launch();
