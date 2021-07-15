import { Telegraf } from 'telegraf';
import token from './token';
import detectRole from './detectRole/detectRole';

const bot = new Telegraf(token);

try {
    bot.start((ctx) => {
        return detectRole(bot, ctx);
    });
} catch (error) {
    console.log(error.message);
}


bot.launch();
