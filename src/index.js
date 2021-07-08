const {Telegraf} = require('telegraf')
const {checkTest, incorrectLength, isLengthCorrect} = require('./commands/checkTest')
const start = require('./commands/start')

const bot = new Telegraf('1880282912:AAG4CmayJKCFWbgB7DYYT6DZvnG8AEK-kio');

bot.start((ctx) => {
    start(bot, ctx)  
})

bot.action('checkTest', (ctx) => {
    ctx.deleteMessage()
    ctx.reply('Send me answers')
    bot.on('text', (ctx) => {
        let answers = ctx.message.text

        if(!isLengthCorrect(answers)) {
            return incorrectLength(ctx)
        }
        const numberOfCorrectAnswers = checkTest(answers)
        ctx.reply('Number of correct answers: ' + numberOfCorrectAnswers)
       
    })
}) 

bot.action('getTest', (ctx) => {
    ctx.deleteMessage()
    ctx.reply('You got tests!')
})

bot.launch()
