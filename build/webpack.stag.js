/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
// 主要用于提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.base');
const { stage } = require('../config/process.env');

const config = {
  /**
   * 告知 webpack 使用相应模式的内置优化
   * [ 会将 process.env.NODE_ENV 的值设置为 production。 启用
   *  FlagDependencyUsagePlugin,
   *  FlagIncludedChunksPlugin,
   *  ModuleConcatenationPlugin,
   *  NoEmitOnErrorsPlugin,
   *  OccurrenceOrderPlugin,
   *  SideEffectsFlagPlugin,
   *  UglifyJsPlugin
   * ]
   *  */
  mode: 'production',
  // 配置如何展示性能提示
  performance: {
    // 定一个创建超过 250kb 的资源，将展示一条错误
    hints: 'error'
  },
  // 加载资源
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')(),
                require('autoprefixer')({
                  overrideBrowserslist: ['last 30 versions', '> 2%', 'Firefox >= 10', 'ie 6-11']
                })
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BASE_API': JSON.stringify(stage.BASE_API)
    })
  ]
};

module.exports = merge(baseConfig, config);
