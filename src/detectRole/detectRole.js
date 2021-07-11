const teacherId = require('./teacher/teacherId');
const startTeacher = require('./teacher/startTeacher');
const greetStudent = require ('./student/greetStudent');

function detectRole(bot, ctx) {
  if (isTeacher(ctx)) {
    return startTeacher(bot, ctx);

  } else {
    return greetStudent(bot, ctx);
  }

  
}

function isTeacher(ctx) {
  const givenId = ctx.message.chat.id;
  return givenId === teacherId;
}

module.exports = detectRole;
