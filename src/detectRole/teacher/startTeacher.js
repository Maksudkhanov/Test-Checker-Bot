const createTest = require('./actions/createTest')

function startTeacher(bot, ctx) {
  const userId = ctx.message.chat.id;
  const userFirstName = ctx.message.chat.first_name;

  greetTeacher(ctx, userId, userFirstName)

  sendCommandForTest(bot, ctx, userId, teacherOptions)
}

function greetTeacher(ctx, userId, userFirstName) {
  return ctx.telegram.sendMessage(userId, 'Здравствуйте, ' + userFirstName)
}

function sendCommandForTest(bot, ctx, userId, teacherOptions) {
  const message = 'Выберите команду';
  ctx.telegram.sendMessage(userId, message, teacherOptions);

  bot.action('createTest', (ctx) => {
    createTest(bot, ctx, userId);
  })

  bot.action('greetTeacher', (ctx) => {
    ctx.deleteMessage();
    sendCommandForTest(bot, ctx, userId, teacherOptions)
  })
}

const teacherOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Cоздать тест', callback_data: 'createTest' },
        { text: 'Удалить тест', callback_data: '6' },
      ],
      [{ text: 'Редактировать тест', callback_data: '7' }],
    ],
    one_time_keyboard: true
  }
}


module.exports = startTeacher
