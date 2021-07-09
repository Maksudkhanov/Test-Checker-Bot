function checkTest(answers) {
    let correct = 0
    for (let i = 0; i < answers.length; i++) {
       if(answers[i] === 'a') {
           correct++
       }
    }
    return correct
}

module.exports = checkTest