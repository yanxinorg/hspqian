// var url = require('url')
// var http = require("http")
// var util = require("util")
const { mysql } = require('../qcloud')
const uuid = require('uuid')
async function getQuestion(ctx, next) {
  var d_id = ctx.request.body['d_id']
  ctx.state.data = await mysql('questions').select('questions.*', "users.u_name", "users.u_picUrl").join('users',function(){
    this.on('questions.u_id', '=', 'users.u_id')
  }).where({d_id:d_id}).orderBy("q_time","desc")
}
async function getMyQuestion(ctx, next) {
  ctx.state.data = await mysql('questions').select('questions.*', 'doctors.*').leftJoin('doctors',function(){
    this.on('questions.d_id','=','doctors.d_id')
  }).where(ctx.request.body)
}
async function postQuestion(ctx, next) {
  var questionInfo={
      q_id: uuid.v1(),
      u_id: ctx.request.body['u_id'],
      d_id: ctx.request.body['d_id'],
      question: ctx.request.body['question']
  }
  await mysql("questions").insert(questionInfo)
}
async function delQuestion(ctx,next){
  ctx.state.data=await mysql('questions').update({alive:false}).where(ctx.request.body)
  
}


module.exports = {
  delQuestion: delQuestion,
  getQuestion: getQuestion,
  postQuestion: postQuestion,
  getMyQuestion: getMyQuestion
}



