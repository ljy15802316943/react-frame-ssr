const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const webpack = require('webpack');
const proxy = require('koa-server-http-proxy');

const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const config = require('../config/webpack.common');

const app = new Koa();
const router = new Router();

// webpack配置
const compiler = webpack(config);
const wdm = webpackDevMiddleware(compiler, {
  noInfo: true,
})
app.use(wdm)
app.use(webpackHotMiddleware(compiler))

// 配置静态服务。
app.use(koaStatic(path.join(__dirname, '../build')));

// 处理跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})

// 配置路由中间件。
app.use(router.routes())
app.use(router.allowedMethods())

// 请求代理
app.use(proxy('/api', { // 客户端发过来的请求只有前面有 api 才会进入这里，不加 api 则访问自己服务端的接口。
  target: 'http://172.16.30.233:3000', // 客户端发送的请求会被替换成这个服务端。
  pathRewrite: { '/api': '' }, // api替换为空。
  changeOrigin: true,
}))

// 同步客户端路由。
router.get('/(.*)', async (ctx, next) => {
  let html = fs.readFileSync('./build/index.html');
  ctx.body = html.toString();
  await next();
})

// 启动服务
app.listen(8080, () => {
  console.log('请访问：http://localhost:8080/');
});