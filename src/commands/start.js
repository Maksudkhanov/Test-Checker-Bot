function start(bot, ctx) {
    const message = 'Здравствуйте, ' + ctx.message.chat.first_name + '\nВыберите команду'
    bot.telegram.sendMessage(ctx.message.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Проверка тестов', callback_data: 'checkTest'}, 
                {text: 'Получение тестов', callback_data: 'getTest'}]
            ]
        }
    })
}

module.exports = start