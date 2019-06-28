const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // 入口文件
  entry: './src/index.js',
  // 输出配置
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname,'..','dist'),
    publicPath: '/'
  },
  // 加载资源
  module: {
    // 忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制
		noParse: function(content) {
			return /jquery|lodash/.test(content);
		},
    rules: [  
      // 加载babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      // 加载图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'static/img/'
          }
        }]
      },
      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'static/fonts/'
          }
        }]
      },      
    ]
  },
  // 解析模块请求的选项
	// （不适用于对 loader 解析）
	resolve: {
		// 用于查找模块目录
		modules: [
			"node_modules",
			path.resolve(__dirname,'..','src')
		],
		// 自动解析确定的扩展
		extensions: [".js",".json",".jsx"],
		// 模块别名列表
		alias: {
			"module": path.resolve(__dirname,'..','node_modules'),
			"@": path.resolve(__dirname,'..',"src"),
		}
  },
  // 告知 webpack 为目标(target)指定一个环境
  target: 'web',
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
	externals: {
		jquery: 'jQuery'
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
        collapseWhitespace: true,
      }
    })
  ],  
}