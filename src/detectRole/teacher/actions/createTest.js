function createTest(bot, ctx, userId, sendStartOptions, startOptions, testAnswers) {
    chooseLengthOfTest(ctx, userId);
    processLengthOfTest(bot, userId, sendStartOptions, startOptions, testAnswers);  
}


function chooseLengthOfTest(ctx, userId) {
    ctx.deleteMessage();
    const message = 'Выберите количество вопросов';
    ctx.telegram.sendMessage(userId, message, testLengthOptions);  
}


function processLengthOfTest(bot, userId, sendStartOptions, startOptions, testAnswers ) {
    bot.action('backToStartOptions', async(ctx) => {
        ctx.deleteMessage();
        sendStartOptions(bot, ctx, userId, startOptions);
    });

    bot.on('callback_query', async(ctx) => {
        const numberOfQuestions = ctx.update.callback_query.data;
        sendConfirmation(ctx, userId, numberOfQuestions); 
    });

    bot.action('generateTest', async(ctx) => {
        // eslint-disable-next-line no-undef
        generateTest(bot, ctx, userId, numberOfQuestions, testAnswers);
    });
}


function sendConfirmation(ctx, userId, numberOfQuestions) {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(userId, 'Количество вопросов: ' + numberOfQuestions, confirmationOptions);
}


function generateTest(bot, ctx, userId, numberOfQuestions, testAnswers) {
    ctx.telegram.sendMessage(userId, 'Отправьте мне ответы');

    bot.on('text', async(ctx) => {
        
        const inputAnswers = ctx.update.message.text;
        const inputAnswersLength = inputAnswers.length;
       
        const status = validateInputAnswers(bot, ctx, userId, numberOfQuestions, inputAnswers, inputAnswersLength); 
        if(status === 'isValid') {
            createAnswers(ctx, userId, testAnswers, inputAnswers, inputAnswersLength);
        }   
    });
}


function validateInputAnswers(bot, ctx, userId, numberOfQuestions, inputAnswers, inputAnswersLength) {
    
    if(Number(numberOfQuestions) === inputAnswersLength) {
        ctx.telegram.sendMessage(userId, 'Неправильное количество ответов');
        return generateTest(bot, ctx, userId, numberOfQuestions);
    }

    if(!isLetter(inputAnswers)) {
        ctx.telegram.sendMessage(userId, 'Недопустимые символы');
        return generateTest(bot, ctx, userId, numberOfQuestions);
    }

    return 'isValid';
}

function isLetter(answers) {
    return /[A-Za-z]/.test(answers);
}


function createAnswers(ctx, userId, testAnswers, inputAnswers, inputAnswersLength) {

    for(let i=0; i<inputAnswersLength; i++) {
        testAnswers[i] = inputAnswers[i];
    }

    ctx.telegram.sendMessage(userId, 'Ответы сохранены: ' + testAnswers);
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
                { text: '⬅️ Назад', callback_data: 'backToStartOptions' }
            ]
        ],
        one_time_keyboard: true
    }
};


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
};


export default createTest;
