function greetTeacher(bot, ctx) {
  const userId = ctx.message.chat.id
  
  const message =
    "Здравствуйте, " + ctx.message.chat.first_name + "\nВыберите команду";

    ctx.telegram.sendMessage(userId,message, teacherOptions)

 

  bot.action('createTest', async(ctx) => {

    await chooseNumberOfQuestions(ctx, userId)
  })

  bot.action('greetTeacher', (ctx) => {
      ctx.deleteMessage();

    ctx.reply('Выберите команду', teacherOptions)
  })
}

const teacherOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Cоздать тест", callback_data: "createTest" },
        { text: "Удалить тест", callback_data: "6" },
      ],
      [{ text: "Редактировать тест", callback_data: "7" }],
    ],
    one_time_keyboard:true
  }
}

function chooseNumberOfQuestions(ctx, userId) {
  ctx.deleteMessage();

  const message = 'Выберите количество вопросов';
  
    ctx.telegram.sendMessage(userId, message, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '5', callback_data: '5' },
          { text: '10', callback_data: 'getTest' },
          { text: '15', callback_data: 'getTest' }
        ],
        [
          { text: '20', callback_data: '5' },
          { text: '25', callback_data: 'getTest' },
          { text: '30', callback_data: 'getTest' }
        ],
        [
          { text: 'Задать самому', callback_data: 'asd'}
        ],
        [
          { text: 'Назад', callback_data: 'greetTeacher'}
        ]
      ],
     one_time_keyboard: true
    }
  });
}

module.exports = greetTeacher
