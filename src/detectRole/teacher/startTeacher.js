import createTest from './actions/createTest';

function startTeacher(bot, ctx, testAnswers) {
    const userId = ctx.message.chat.id;
    const userFirstName = ctx.message.chat.first_name;

    greetTeacher(ctx, userId, userFirstName);
    sendStartOptions(bot, ctx, userId, testAnswers);
}


function greetTeacher(ctx, userId, userFirstName) {
    return ctx.telegram.sendMessage(userId, 'Здравствуйте, ' + userFirstName);
}


function sendStartOptions(bot, ctx, userId, testAnswers) {
    chooseStartOptions(ctx, userId);
    processStartOptions(bot, userId, testAnswers);
}


function chooseStartOptions(ctx, userId) {
    const message = 'Выберите команду';
    ctx.telegram.sendMessage(userId, message, startOptions);
}


function processStartOptions(bot, userId, testAnswers) {
    bot.action('createTest', async(ctx) => {
        createTest(bot, ctx, userId, sendStartOptions, startOptions, testAnswers);
    });
}


const startOptions = {
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
};


export default startTeacher;
