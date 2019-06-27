# react-cli

## 目录

### 1. webpack配置

	1. 安装webpack
		
		npm i webpack webpack-cli -D

	2. 配置webpack文件
		
		1. 创建webpack文件
			// 公共webpack文件
			build/webpack.base.js
			// 开发环境webpack文件
			build/webpack.dev.js
			// 生产环境webpack文件
			build/webpack.prod.js
			// 测试环境webpack文件
			build/webpack.stag.js
		2. 创建环境变量文件
			config/process.env.js
 		
	3. 执行webpack命令
		
		// 在package.json中scripts添加执行命令
		`"scripts": {
			"dev": "webpack-dev-server --config build/webpack.dev.js --progress --colors",
    		"build:prod": "webpack --config build/webpack.prod.js --progress --colors",
    		"build:stage": "webpack --config build/webpack.prod.js --progress --colors",
		}`	
		
		// 运行
		npm run dev

		// 打包生产环境
		npm run build:prod

		// 打包测试环境
		npm run build:stage


### 2. 配置Loader

	1. 处理css loader

		1. 加载资源

			npm i style-loader css-loader sass-loader node-sass -D

		2. 添加webpack加载器配置
		
		3. 添加css打包分离压缩去重

			// 添加提取css插件
			npm i mini-css-extract-plugin -D
			// 添加css压缩、去重插件
			npm i optimize-css-assets-webpack -D
			// 添加用于Webpack处理带有Postss的CSS的加载程序
			npm i postcss-loader -D
			// 添加css前缀，兼容不同浏览器 插件
			npm i autoprefixer -D
			// 添加处理css的@import 只支持本地的 import 处理,不支持http 等远程的URL链接的处理插件
			npm i postcss-import -D
			// 添加css优化处理器
			npm i cssnano -D


	2. 处理图片、字体、文件 loader
		
		1. 加载资源

			npm i file-loader -D		

		2. 添加webpack加载器配置

### 3. 引入babel

	1. 说明作用
	
		babel是用来解析es6语法或者es7语法分解析器，让开发者能够使用新的es语法，同时支持jsx,vue等多种框架。	

	2. 安装babel
		
		npm i @babel/core babel-loader -D

	2. 配置babel文件: .babelrc

		`{
		    "presets": [
		        "@babel/preset-env",
				"@babel/preset-react",
				"state-0"
		    ],
		    "plugins": []
		}`

		babel支持自定义的预设(presets)或插件(plugins),只有配置了这两个才能让babel生效，单独的安装babel是无意义的。

		presets：代表babel支持那种语法(就是你用那种语法写)，优先级是从下往上,state-0|1|2|..代表有很多没有列入标准的语法

		plugins: 代表babel解析的时候使用哪些插件，作用和presets类似，优先级是从上往下。

	3. @babel/preset-env

		表示将JavaScript es6语法代码编译为 es5语法		

	4. @babel/preset-react

		表示将JSX和其他东西编译到JavaScript中

	6. @babel/plugin-transform-runtime @babel/runtim

		Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中
		
		你可以引入 Babel runtime 作为一个独立模块，来避免重复引入。

		下面的配置禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。

		npm i @babel/runtim @babel/plugin-transform-runtime -D

	7. babel-polyfill

		我们之前使用的babel，babel-loader 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。	


### 4. 管理输出

	1. 添加 HtmlWebpackPlugin 插件

		npm i html-webpack-plugin -D	

	2. 添加 清理 /dist 文件夹插件 CleanWebpackPlugin

		npm i clean-webpack-plugin -D


### 5. 使用webpack-dev-server

	1. 安装

		npm i webpack-dev-server -D

	2. 配置webpack配置文件

	3. 添加模块热更新插件

		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),


### 6. 添加离线服务器

	npm i http-server -D


### 7. 安装React

	1. 安装

		npm i react react-dom -S

	2. 
