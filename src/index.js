const { Telegraf } = require("telegraf");
const token = require('./token')
const detectRole = require("./detectRole/detectRole");

const bot = new Telegraf(token);

bot.start(async (ctx) => {
  return await detectRole(bot, ctx);
});

bot.launch();
