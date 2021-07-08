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

function checkTest(answers) {
    let correct = 0
    for (let i = 0; i < answers.length; i++) {
       if(answers[i] === 'a') {
           correct++
       }
    }
    return correct
}

module.exports = {checkTest, incorrectLength, isLengthCorrect}