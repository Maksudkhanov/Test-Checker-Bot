const validateAnswer = require('./actions/validateAnswer')
const checkTest = require('./actions/checkTest')

async function startForStudents(bot, ctx) {
  const message = 'Здравствуйте, ' + ctx.message.chat.first_name + '\nВыберите команду';
  ctx.reply(message, studentOptions);

  bot.action('checkTest', async(ctx) => {
    await ctx.deleteMessage();
    await ctx.reply('Отправьте мне ответы');
  
    bot.on('text', async(ctx) => {
        const answers = ctx.message.text;

        await validateAnswer(answers);
  
        const numberOfCorrectAnswers = await checkTest(answers);
        //saveAnswers()
        await ctx.reply('Количество правильных ответов: ' + numberOfCorrectAnswers);
      });
  });
  
  bot.action('getTest', async(ctx) => {
    await ctx.deleteMessage();
    await ctx.reply('You got tests!');
  });
}

const studentOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Проверка тестов', callback_data: 'checkTest' },
        { text: 'Получение тестов', callback_data: 'getTest' },
      ],
    ],
  }
}

module.exports = startForStudents;
