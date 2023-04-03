// 计算耗时中间件
module.exports = async(ctx, next) => {
  // 记录开始时间
  const start = Date.now()
  // 让内层中间件得到执行
  await next()
  // 记录结束时间
  const end = Date.now()
  const duration = end - start
  console.log('duration', duration);
  // 设置响应头
  ctx.set("X-Response-Time", duration + 'ms')
}