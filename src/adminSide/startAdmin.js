function startAdmin(bot, ctx) {
    const message = 'Здравствуйте, ' + ctx.message.chat.first_name + '\nВыберите команду'
    bot.telegram.sendMessage(ctx.message.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Создать тест', callback_data: 'checkTest'}, 
                {text: 'Удалить тест', callback_data: 'getTest'}], 
                [{text: 'Посмотреть результаты', callback_data: 'showResults'}]
            ]
        }
    })
}

module.exports = startAdmin