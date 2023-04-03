// 引入并创建WebSocket服务端的对象
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 9998
})
const path = require('path')
const fileUtils = require('../utils/file_utils')

// 服务端开启了监听
module.exports.listen = () => {
  // 对客户端连接事件监听
  wss.on('connection', client => {
    console.log('客户端连接成功')
    // 对客户端发送的消息监听
    client.on('message', async msg => {
      // 解析客户端发送到服务端的信息
      console.log('接收客户端发来的消息：', JSON.parse(msg))
      let payload = JSON.parse(msg)
      const { action, chartName } = payload
      // 判断需要执行的操作（获取数据/其他）
      if (action === 'getData') {
        let filePath = path.join(__dirname, '../data/' + chartName + '.json')
        payload.data = await fileUtils.getFileJsonData(filePath)
        client.send(JSON.stringify(payload))
      } else {
        // 转发该消息到连接中的每一个客户端
        wss.clients.forEach(client => {
          client.send(JSON.stringify(payload))
        })
      }
    })
  })
}