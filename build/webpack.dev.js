const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const { devProcessEnv } = require('../config/process.env');

const config = {
  // 告知 webpack 使用相应模式的内置优化 [会将 process.env.NODE_ENV 的值设置为 development. 启用 NamedChunksPlugin 和 NamedModulesPlugin]
  mode: 'development',
  // 输出文件
  output: {
    pathinfo: true,
  },
  // 配置如何展示性能提示
  performance: {
    // 定一个创建后超过 250kb 的资源，将展示一条警告
    hints: 'warning',
  },
  devtool: 'eval-source-map',
  // 配置本地服务
  devServer: {
    // 本地服务器所加载的页面所载的目录
    contentBase: './dist',
    // 域名
    host: '127.0.0.1',
    // 端口号
    port: 3000,
    // 不跳转
    historyApiFallback: true,
    // 实时刷新
    inline: true,
    // 热更新
    hot: true,
    // 自动打开浏览器
    // open: true,
    // 服务器压缩
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              // 指定启用css modules
              modules: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
			'process.env': {
        ...devProcessEnv
			}
		})
  ]
}

module.exports = merge(baseConfig,config);
