const {Telegraf} = require('telegraf')
const {checkTest} = require('./commands/checkTest/checkTest')
const start = require('./commands/start/start')

const bot = new Telegraf('1880282912:AAG4CmayJKCFWbgB7DYYT6DZvnG8AEK-kio');

bot.start(async(ctx) => {
    await start(bot, ctx)  
    
})

bot.action('checkTest', async(ctx) => {
   
    await validateAnswer(bot, ctx)

     
    const numberOfCorrectAnswers = checkTest(answers)
    ctx.reply('Number of correct answers: ' + numberOfCorrectAnswers)
       
   
}) 

bot.action('getTest', (ctx) => {
    ctx.deleteMessage()
    ctx.reply('You got tests!')
})

bot.launch()