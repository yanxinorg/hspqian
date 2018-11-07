const { mysql } = require('../qcloud')
const uuid = require('uuid')
async function getAnswers(ctx, next) {
  var u_answers = await mysql("u_answers").select("u_answers.*","users.u_name","users.u_picUrl").join("users",function(){
    this.on('u_answers.u_id','=','users.u_id')
  }).where(ctx.request.body).orderBy("a_time", "desc")
  var d_answers = await mysql("d_answers").select("d_answers.*", "doctors.d_name", "doctors.d_picUrl").join("doctors", function () {
    this.on('d_answers.d_id', '=', 'doctors.d_id')
  }).where(ctx.request.body).orderBy("a_time", "desc")
  ctx.state.data ={
    u_answers:u_answers,
    d_answers:d_answers
  }
}
async function sendAnswer(ctx,next){
 
  if(ctx.request.body['u_id']){
    var u_answer_body={
      a_id: uuid.v1(),
      u_id: ctx.request.body['u_id'],
      q_id: ctx.request.body['q_id'],
      answer: ctx.request.body['answer'],
    }
    await mysql("u_answers").insert(u_answer_body)
  }else if(ctx.request.body['d_id']){
    var d_answer_body = {
      a_id: uuid.v1(),
      d_id: ctx.request.body['d_id'],
      q_id: ctx.request.body['q_id'],
      answer: ctx.request.body['answer'],
    }
    await mysql("d_answers").insert(d_answer_body)
  }
  
}
module.exports = {
  getAnswers: getAnswers,
  sendAnswer: sendAnswer
}