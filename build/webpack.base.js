/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 主要用于提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 主要用于css压缩、去重
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');
// 分析模块大小
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  // 入口文件
  entry: './src/index',
  // 输出配置
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/'
  },
  // 加载资源
  module: {
    // 忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制
    noParse(content) {
      return content.includes('jquery');
    },

    /**
     * @description 创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块（module）应用loader，或者修改解析器（parser）。
     * @description rule 每个规则可以分为三部分：condition，result，nested rule
     * @description condition：1、resource 请求文件的绝对路径。
     *              2、issuer 被请求资源的模块文件的绝对路径。test,include,exclude,resource.
     * @description result: 1. 应用的loader--loader,options,use,query,loaders,enforce。
     *              2. Parser选项--parser。
     * @description nested rule：rules/oneOf
     */
    rules: [
      // 加载babel
      {
        // 用来匹配符合条件的文件（匹配特定条件）
        test: /\.(js|jsx)$/,
        // 设置依赖文件不会存在的目录（排除特定条件）
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      // 加载图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)/,
        // 匹配数组中任何一个符合条件。not 必须排除数组中的所有条件。and 必须匹配数组中的所有条件。
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/img/'
            }
          }
        ]
      },
      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // 设置依赖文件索引目录（匹配特定条件）
        include: [path.resolve(__dirname, '..', 'src')],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/fonts/'
            }
          }
        ]
      }
    ]
  },
  // 解析模块请求的选项
  // （不适用于对 loader 解析）
  resolve: {
    // 用于查找模块目录
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
    // 自动解析确定的扩展
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    // 模块别名列表
    alias: {
      '@config': path.resolve(__dirname, '..', 'config'),
      '@util': path.resolve(__dirname, '..', 'src/util'),
      '@common': path.resolve(__dirname, '..', 'src/common'),
      '@components': path.resolve(__dirname, '..', 'src/components'),
      '@pages': path.resolve(__dirname, '..', 'src/pages'),
      '@src': path.resolve(__dirname, '..', 'src')
    }
  },
  // 告知 webpack 为目标(target)指定一个环境
  target: 'web',
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
  externals: {
    jquery: 'jQuery,'
  },
  // 配置如何展示性能提示
  performance: {
    // 定一个创建后超过 500kb 的资源，将展示一条警告
    maxAssetSize: 1024 * 500,
    maxEntrypointSize: 1024 * 500
  },
  // 添加插件
  optimization: {
    // minimize: [],
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
                removeAll: true
              },
              normalizeUnicode: false
            }
          ]
        },
        canPrint: true
      }),
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            // console
            drop_console: true,
            drop_debugger: false,
            // 移除console
            pure_funcs: ['console.log']
          }
        },
        sourceMap: false,
        parallel: true
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
          name: 'static/css/chunk-styles',
          test: /\.(css|scss|sass|less)$/,
          chunks: 'all',
          enforce: true
        },
        commons: {
          name: 'static/js/chunk-commons',
          test: path.join(__dirname, '..', 'src/components'),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true
        },
        react: {
          test: /[\\/]node_modules[\\/](react)[\\/]/,
          name: 'static/js/chunk-react',
          priority: 20
        },
        reactDom: {
          test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
          name: 'static/js/chunk-react-dom',
          priority: 20
        },
        vendors: {
          name: 'static/js/chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  // 添加插件
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Html webpack Plugin',
      filename: 'index.html',
      template: './public/index.html',
      // 压缩html文件
      hash: true,
      // 压缩 => production 模式使用
      minify: {
        // 删除双引号
        removeAttributeQuotes: true,
        // 折叠 html 为一行
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
      chunkFilename: 'static/css/[id].[hash:8].css'
    })
    // new BundleAnalyzerPlugin(),
  ]
};
