const validateAnswer = require('./actions/validateAnswer')
const checkTest = require('./actions/checkTest')

  function startForStudents(bot, ctx) {
  const userId = ctx.message.chat.id
  const message = 'Здравствуйте, ' + ctx.message.chat.first_name + '\nВыберите команду';
  ctx.telegram.sendMessage(userId, message, studentOptions);

  bot.action('checkTest', async(ctx) => {
     ctx.deleteMessage();
     await ctx.telegram.sendMessage(userId, 'Отправьте мне ответы');
  
    bot.on('text', (ctx) => {
        const answers = ctx.message.text;

        const resultOfValidating = validateAnswer(ctx, answers);

        if(resultOfValidating === 'isValid') {
          const numberOfCorrectAnswers =  checkTest(answers);
          return ctx.telegram.sendMessage(userId, 'Количество правильных ответов: ' + numberOfCorrectAnswers);
        }
  
              
      });
  });
  
  bot.action('getTest', (ctx) => {
     ctx.deleteMessage();
     ctx.telegram.sendMessage(userId, 'You got tests!');
  });

  return

 
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
