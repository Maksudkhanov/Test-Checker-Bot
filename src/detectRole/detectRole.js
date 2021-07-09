const teacherId = require('./teacher/teacherId');
const greetTeacher = require('./teacher/greetTeacher');
const greetStudent = require ('./student/greetStudent');

function detectRole(bot, ctx) {
  if (isTeacher(ctx)) {
    
    return greetTeacher(bot, ctx);
  }

  return greetStudent(bot, ctx);
}

function isTeacher(ctx) {
  const givenId = ctx.message.chat.id;
  return givenId === teacherId;
}

module.exports = detectRole;
