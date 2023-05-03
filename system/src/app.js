const path = require('path')
const jsonServer = require('json-server')

const router = require('./router')
const db = require('./db')()

const server = jsonServer.create()

// 配置静态资源目录
const middleware = jsonServer.defaults({
  static: path.join(__dirname, './public')
})
server.use(middleware)

// 配置请求体解析
server.use(jsonServer.bodyParser)

// 返回体数据自定义格式
server.use((req, res, next) => {
  const json = res.json.bind(res)
  res.success = data => {
    return json({
      code: 0,
      msg: 'success',
      data
    })
  }
  res.fail = (msg, code = -1, data) => {
    return json({
      code,
      msg,
      data
    })
  }
  next()
})

// 路由实现
router(server)

// 路由路径配置
const jsonRouter = jsonServer.router(db)

// 设置延时返回
server.use((req, res, next) => {
  setTimeout(next, 1000)
})

// api 配置
server.use('/api', jsonRouter)

server.listen(8080, () => {
  console.log('server listening on port...8080');
})
