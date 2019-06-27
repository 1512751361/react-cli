const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
// 主要用于提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 主要用于css压缩、去重
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./webpack.base.js');
const { prdProcessEnv } = require('../config/process.env');

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
              modules: false,
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')(),
                require('autoprefixer')({
                  overrideBrowserslist: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },      
    ]
  },
  // 添加插件
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        // cssProcessorOptions: cssnanoOptions,
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
              normalizeUnicode: false
            }
          ]
        },
        canPrint: true
      })
    ],
    // 代码分离
    splitChunks: {
      // 这表示将选择哪些块进行优化。当提供一个字符串，有效值为 all, async 和 initial. 提供 all 可以特别强大，因为这意味着即使在异步和非异步块之间也可以共享块。
      chunks: 'all',
      // 要生产的块最小大小（以字节为单位）
      minSize: 30000,

      maxSize: 0,

      // 分割前必须共享模块的最小块数
      minChunks: 1,
      // 按需加载时的最大并行请求数
      maxAsyncRequests: 5,
      // 入口点处的最大并行请求数
      maxInitialRequests: 3,
      // 指定用于生成的名称的分割符 vendors~main.js
      automaticNameDelimiter: '~',
      // 拆分块的名称
      name: true,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        commons: {
          name: 'chunk-commons',
          test: path.join(__dirname,'..','src/components'),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  // 插件
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
      chunkFilename: 'static/css/[id].[hash:8].css'
    }),
    new webpack.DefinePlugin({
			'process.env': {
        ...prdProcessEnv
			}
		})
  ]
}

module.exports = merge(baseConfig,config);
