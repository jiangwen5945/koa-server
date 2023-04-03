// 业务逻辑中间件
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
  const url = ctx.request.url
  let filePath = url.replace('/api', '')
  filePath = '../data/' + filePath + '.json'
  filePath = path.join(__dirname, filePath)

  console.log('filePath', filePath)
  try {
    const res = await fileUtils.getFileJsonData(filePath)
    ctx.response.body = {
      code: 200,
      message: 'success',
      result: JSON.parse(res)
    }
  } catch (error) {
    const errorMsg = {
      message: "读取文件内容失败，文件资源不存在",
      status: 404
    }
    ctx.response.body = JSON.stringify(errorMsg)
  }
  await next()
}