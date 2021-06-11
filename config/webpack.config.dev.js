const {resolve} = require('path');
const webpackCommon = require('./webpack.common');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// webpack打包前删除之前的打包文件
webpackCommon.plugins.push(new CleanWebpackPlugin());

module.exports = {
  ...webpackCommon,
  mode: 'development',
}