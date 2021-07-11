function createTest(bot, ctx, userId) {
    chooseNumberOfQuestions(bot, ctx, userId)
}

function chooseNumberOfQuestions(bot, ctx, userId) {
    ctx.deleteMessage();

    const message = 'Выберите количество вопросов';
    ctx.telegram.sendMessage(userId, message, testLengthOptions);

    bot.action('generateTest', (ctx) => {
        generateTest(bot, ctx, userId, numberOfQuestions)
    })

    bot.on('callback_query', async(ctx) => {
       
        numberOfQuestions = ctx.update.callback_query.data;

        await sendConfirmation(ctx, userId, numberOfQuestions);  
    })
}

function sendConfirmation(ctx, userId, numberOfQuestions) {
    ctx.deleteMessage()
    return ctx.telegram.sendMessage(userId, 'Количество вопросов: ' + numberOfQuestions, confirmationOptions)
}

function generateTest(bot, ctx, userId, numberOfQuestions) {
    ctx.telegram.sendMessage(userId, 'Отправьте мне ответы');

    bot.on('text', (ctx) => {
        compareWithOfChoosenLength(bot, ctx, userId, numberOfQuestions)


    })

}

function compareWithOfChoosenLength(bot, ctx, userId, numberOfQuestions) {
    let answersLength = ctx.message.text.length;

    if(answersLength !== numberOfQuestions) {
        ctx.telegram.sendMessage(userId, 'Неправильное количество ответов')
        return generateTest(bot, ctx, userId, numberOfQuestions)
    }
}

const testLengthOptions = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: '5', callback_data: '5' },
                { text: '10', callback_data: '10' },
                { text: '15', callback_data: '15' }
            ],
            [
                { text: '20', callback_data: '20' },
                { text: '25', callback_data: '25' },
                { text: '30', callback_data: '30' }
            ],
            [
                { text: 'Другое количество вопросов', callback_data: 'asd' }
            ],
            [
                { text: '⬅️ Назад', callback_data: 'greetTeacher' }
            ]
        ],
        one_time_keyboard: true
    }
}

const confirmationOptions = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'Подтверждаю ✅', callback_data: 'generateTest' },
                { text: '⬅️ Назад', callback_data: 'createTest' },
            ],

        ],
        one_time_keyboard: true
    }
}

module.exports = createTest;
