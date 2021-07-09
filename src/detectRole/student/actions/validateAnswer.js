function validateAnswer(answers) {
 
    if (!isLengthCorrect(answers)) {
      return invalidLength(ctx);
    }
    if (!isLetter(answers)) {
      return invalidLetters(ctx);
    }
}

function isLetter(answers) {
  return /[A-Za-z]/.test(answers);
}

function isLengthCorrect(answers) {
  return answers.length === 3;
}

function invalidLength(ctx) {
  ctx.reply("Неправильное количество ответов", {
    reply_markup: {
      inline_keyboard: [[{ text: "Send again", callback_data: "checkTest" }]],
    },
  });
}

function invalidLetters(ctx) {
  ctx.reply("Недоступимые символы", {
    reply_markup: {
      inline_keyboard: [[{ text: "Send again", callback_data: "checkTest" }]],
    },
  });
}

module.exports = validateAnswer