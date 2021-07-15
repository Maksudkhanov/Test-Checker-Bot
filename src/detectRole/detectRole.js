import teacherId from './teacher/teacherId';
import testAnswers from './testAnswers/testAnswers';
import startTeacher from './teacher/startTeacher';
import greetStudent from './student/greetStudent';

function detectRole(bot, ctx) {
    if (isTeacher(ctx)) {
        return startTeacher(bot, ctx, testAnswers);
    } else {
        return greetStudent(bot, ctx, testAnswers);
    }
}

function isTeacher(ctx) {
    const givenId = ctx.message.chat.id;
    return givenId === teacherId;
}

export default detectRole;
