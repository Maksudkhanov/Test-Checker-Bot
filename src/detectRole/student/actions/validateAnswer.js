function validateAnswer(ctx, answers, testAnswers) {
 
    if (!isLengthCorrect(answers, testAnswers)) {
      return invalidLength(ctx);
    }
    if (!isLetter(answers)) {
      return invalidLetters(ctx);
    }

    return 'isValid';
}

function isLetter(answers) {
  return /[A-Za-z]/.test(answers);
}

function isLengthCorrect(answers, testAnswers) {
  return answers.length === testAnswers.length;
}

function invalidLength(ctx) {
  ctx.reply("Неправильное количество ответов", {
    reply_markup: {
      inline_keyboard: [[{ text: "Отправить заново", callback_data: "checkTest" }]],
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