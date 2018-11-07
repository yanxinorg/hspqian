const { mysql } = require('../qcloud')
const uuid = require('uuid')

async function test(ctx,next){
  await mysql('user').del().where({b_id:2})
  await mysql('book').del().where({id:2} ) 
}

module.exports = {
  test: test
}