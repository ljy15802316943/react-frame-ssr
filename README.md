# react-frame-ssr

#### 介绍

为了工作方便，使用react和node搭的一个架子。
由于koa-webpack不支持 webpack5 所用此项目采用 webpack4搭建了。
技术栈采用: webpack4、koa、react、dva。

目前支持服务端渲染，热更新，和请求转发。后续会继续扩展。
如果要使用请求转发请再起一个服务器测试，并在本项目文件 server/app.js 修改代理。


#### 使用说明

1.  npm i || cnpm i  安装依赖
2.  npm run build:dev 构建开发环境包
3.  npm run dev      启用本地服务
4.  npm run build:prod 构建生产环境包
