import validateAnswer from './actions/validateAnswer';
import checkTest from './actions/checkTest';
import testAnswers from '../testAnswers/testAnswers';

function startForStudents(bot, ctx) {
    const userId = ctx.message.chat.id;
    const message = 'Здравствуйте, ' + ctx.message.chat.first_name + '\nВыберите команду';
    ctx.telegram.sendMessage(userId, message, studentOptions);

    bot.action('checkTest', async(ctx) => {
        ctx.deleteMessage();
        await ctx.telegram.sendMessage(userId, 'Отправьте мне ответы');
  
        bot.on('text', async(ctx) => {
            const answers = ctx.message.text;

            const resultOfValidating = validateAnswer(ctx, answers, testAnswers);

            if(resultOfValidating === 'isValid') {
                const numberOfCorrectAnswers =  checkTest(answers, testAnswers);
                return ctx.telegram.sendMessage(userId, 'Количество правильных ответов: ' + numberOfCorrectAnswers);
            }
  
              
        });
    });
  
    bot.action('getTest', async(ctx) => {
        ctx.deleteMessage();
        ctx.telegram.sendMessage(userId, 'You got tests!');
    });

    return;

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
};

export default startForStudents;
