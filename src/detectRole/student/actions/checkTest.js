function checkTest(answers, testAnswers) {
    let correct = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === testAnswers[i]) {
            correct++;
        }
    }
    return correct;
}

export default checkTest;
