const { mysql } = require('../qcloud')
async function getArticles(ctx,next){
  ctx.state.data = await mysql('data').select('Data_Id', "Data_URL", "Data_Headline", "Data_Time", "Data_Style", "Data_Author").where(ctx.request.body)
}
async function getArticleInfo(ctx, next) {
  ctx.state.data = await mysql('data').select("Data_Txt").where(ctx.request.body)
}
async function getArticleStyle(ctx, next) {
  ctx.state.data = await mysql('data').select('Data_Style').distinct()
}

module.exports = {
  getArticleInfo:getArticleInfo,
  getArticles: getArticles,
  getArticleStyle: getArticleStyle
}