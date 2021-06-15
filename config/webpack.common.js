const webpack = require('webpack');
const { resolve, join } = require('path');
// plugins的插件，作用是打包文件自动生成 html文件，并且自动引入打包好的js文件。
const htmlWebpackPlugin = require('html-webpack-plugin');
// 处理css的loader。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 打包进度条
const WebpackBar = require('webpackbar');


module.exports = {
  // 入口文件
  entry: [
      // 生产环境的入口建议把这个去掉, 因为会造成css文件不能解析。
      ...(process.env.TYPE === 'development' ? ['webpack-hot-middleware/client?noInfo=true&reload=true'] : []), 
      join(process.cwd(), 'src', 'index.js'),
  ],
  // 打包出口文件
  output: {
    // 输出文件名
    filename: 'js/[name]_[hash:6].js',
    // 输出路径
    // _打包资源到build文件目录下。
    path: resolve(__dirname, '../build')
  },
  // loader的配置
  module: {
    rules: [
      {
        // oneOf会提升打包构建速度，原理是loader处理文件时只会执行一次。
        // 注意：不能有两个配置同时处理一个文件。
        // 如果有的话就单独提出来。
        oneOf: [
          {
            test: /\.css$/,
            use: [
              'css-hot-loader',
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                }
              },
              'css-loader',
              // css兼容，自动添加前缀。
              'postcss-loader'
            ],
          },
          {
            test: /\.less$/,
            use: [
              'css-hot-loader',
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                }
              },
              'css-loader',
              'less-loader',
            ],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name]_[contenthash:4].[ext]',
              outputPath: 'img',
              esModule: false,
            },
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:4].[ext]',
              outputPath: 'icon',
              esModule: false,
            },
          },
          {
            test: /\.(js|jsx)$/,
            // 只检查自己写的源代码，第三方的库是不用检查的
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  presets: [
                    '@babel/preset-react',
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        "corejs": {
                          "version": 3
                        },
                        "targets": {
                          "chrome": "60",
                          "firefox": "60",
                          "ie": "9",
                          "safari": "10",
                          "edge": "17"
                        }
                      },
                    ],
                  ],
                  plugins: [
                    "react-hot-loader/babel",
                    "@babel/plugin-transform-runtime",
                    "transform-react-jsx",
                    // 配置antd按需引入css。
                    [
                      "import",
                      {
                        "libraryName": "antd",
                        "libraryDirectory": "es",
                        "style": "css"
                      }
                    ],
                    // 编译es7语法。
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    ["@babel/plugin-proposal-class-properties", { "loose": false }]
                  ],
                  // 第二次构建时，会读取之前的缓存
                  cacheDirectory: true,
                },
              },
              // 多进程打包
              {
                loader: 'thread-loader',
                options: {
                  workers: 2, // 开启进程数。
                }
              },
            ],
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ]
  },
  // 代码分割
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化，也是缓存失效。
    // runtimeChunk: {
    //   name: entrypoint => `runtime-${entrypoint.name}`
    // }
  },
  //解析路径
  resolve: {
    //别名
    alias: {
      //resolve 获取绝对路径的API，join也可以获取; @ 也可以用 $,就是个 别名
      'assets': resolve(__dirname, '../src/assets'), // 设置 src的绝对路径 
      'client': resolve(__dirname, '../src/client'),
      'routes': resolve(__dirname, '../src/routes'),
      'utils': resolve(__dirname, '../src/utils'),
      'models': resolve(__dirname, '../src/models'),
    }
  },
  // 各种插件配置
  plugins: [
    new WebpackBar(),
    // 功能: 默认会创建一个空的HTML,自动引入打包输出的所有资源(JS/CSS)
    new htmlWebpackPlugin({
      // 这里的index.html文件会作为打包build下index.html文件的模板。
      template: join(process.cwd(), 'src', 'index.html'),
      // 打包html文件名称。
      filename: "index.html",
      // 压缩html文件。
      minify: {
        // 移除空格
        collapseWhitespace: false,
        // 移除注释
        removeComments: false,
      }
    }),
    // 热更新配置
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].[contenthash:5].css',
    }),
    // 压缩css。
    new optimizeCssAssetsWebpackPlugin(),

    // 页面可用的变量, package.json文件传过来的。
    new webpack.DefinePlugin({
      STATUS: true,
      TYPE: JSON.stringify(process.env.TYPE),
      HTTP: JSON.stringify(process.env.HTTP),
    }),
  ],
  mode: 'development', // 开发环境
}