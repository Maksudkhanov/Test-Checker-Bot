function validateAnswer(bot, ctx) {
  ctx.deleteMessage();
  ctx.reply("Send me answers");
  bot.on("text", (ctx) => {
    const answers = ctx.message.text
    if (!isLengthCorrect(answers)) {
      return incorrectLength(ctx);
    }
  });
  const answers
}

function isLengthCorrect(answers) {
    return answers.length === 3
}

function incorrectLength(ctx) {
        ctx.reply('Incorrect number of answers', {
        reply_markup: {
            inline_keyboard:[
                [{ text: 'Send again', callback_data: 'checkTest'}]
            ]
        }
    })    
}