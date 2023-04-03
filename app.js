// 1. 创建koa对象
const Koa = require('koa')
const app = new Koa()
// 2. 绑定中间件
// 第一层中间件
const durationMiddleware = require('./middleware/koa_response_duration')
app.use(durationMiddleware)
// 第二层中间件
const headerMiddleware = require('./middleware/koa_response_header')
app.use(headerMiddleware)
// 第三层中间件
const dataMiddleware = require('./middleware/koa_response_data')
app.use(dataMiddleware)
// 3. 绑定端口号
app.listen(3000)

// const webSocketService = require('./service/web_socket_service')
// 执行服务端监听
// webSocketService.listen()