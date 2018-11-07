const { mysql } = require('../qcloud')
async function getSubject(ctx, next) {
  ctx.state.data = await mysql("subjects").select('*')
}
async function update_pic(ctx, next) {
  var d_picUrl = ctx.request.body['d_picUrl']
  var d_id = ctx.request.body['d_id']
  ctx.state.data = await mysql("doctors").update({ d_picUrl: d_picUrl }).where({d_id})
}

async function getdoctor(ctx, next) {
  ctx.state.data = await mysql("doctors").select("*");
}

async function Logindoctor(ctx,next){
  var doctor = await mysql("doctors").select("*").where(ctx.request.body)
  if(doctor.length>0){
    ctx.state.data = { code: 0, msg:doctor}
  }else{
    ctx.state.data ={code:-1,msg:"你不是医生呢"}
  }
}
async function registdoctor(ctx, next) {
    await mysql("doctors").insert(ctx.request.body)
}
module.exports = {
  registdoctor: registdoctor,
  getdoctor: getdoctor,
  Logindoctor: Logindoctor,
  update_pic: update_pic,
  getSubject: getSubject
}