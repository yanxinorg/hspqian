const { mysql } = require('../qcloud')

async function postUser(ctx, next) {
  var u_id = ctx.request.body['u_id']
  var user = await mysql("users").select("*").where({u_id})
  if (user.length>0){
    return ;
  }else{
    await mysql("users").insert(ctx.request.body)
    await mysql("user_article").insert({u_id})
  }
}
async function UserOffArticle(ctx, next) {
  var Data_Headline = ctx.request.body['Data_Headline']
  var u_id = ctx.request.body['u_id']
  ctx.state.data = ctx.request.body
  await mysql("user_article").update({Data_Headline}).where({u_id})
}
async function getRecommend(ctx, next) {
  // var recommends = await mysql('recommend').select('*').where(ctx.request.body)
  // ctx.state.data = recommends.data
  var u_id = ctx.request.body['u_id']
  ctx.state.data = await mysql('data').select('Data_Id', "Data_URL", "Data_Headline", "Data_Time", "Data_Style", "Data_Author").join('recommend',function(){
    this.on('data.Data_Id', '=', 'recommend.data_id1').orOn('Data_Id', '=', 'recommend.data_id2').orOn('Data_Id','=', 'recommend.data_id3')
  }).where('recommend.u_id', u_id)
  // if (recommends.length==1){
  //   var data_id1 = recommends.data
    // var data_id2 = recommends.data.data_id2
    // var data_id3 = recommends.data.data_id3
    // ctx.state.data = data_id1
    // var List = await mysql('data').select('Data_Id', "Data_URL", "Data_Headline", "Data_Time", "Data_Style", "Data_Author").where('Data_Id', data_id1).orWhere('Data_Id', data_id2).orWhere('Data_Id', data_id3)
    // ctx.state.data ={
    //   code: 200, recommendList: List
    // }
  // } else{
  //   ctx.state.data = {
  //     code:404,msg:"null"
  //   }
  // }
}
module.exports = {
  getRecommend: getRecommend,
  UserOffArticle: UserOffArticle,
  postUser: postUser
}