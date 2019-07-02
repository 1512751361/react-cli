# react-cli

## 目录结构

	----build/ 				--webpack配置文件
	----config/				--配置文件
	----dist/				--项目打包文件
	----node_modules/			--第三方模块	
	----public/				--HTML模板
	----src/				--项目目录
		----common/			--公共模块
		----components/			--公共组件模块
		----pages/			--页面模块
		----routes/			--路由配置模块
		----store/			--redux配置模块
		----styles/			--全局样式表模块
		----util/			--全局方法模块
		----index.js			--入口页面
	----test/				--测试代码模块
	.babelrc				--webpack babel配置文件
	.gitignore				--git代码管理配置模块
	.eslintrc.js				--eslint配置文件
	package.json				--包管理
	README.md				--说明文件


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


### 8. 安装react路由

	1. 安装

		npm i react-router react-router-dom -S

	2. 创建路由配置文件 routes
	
	3. 添加路由配置方法 routes/index.js
	
	4. 创建动态创建路由对象 routes/method/dynamic-loader.js
	
	5. 使用说明

		页面路由必须是在文件夹pages下的文件或者文件夹（如果是文件夹那么这个文件夹必须含有index文件作为页面路由界面）
	

### 9. 安装react-redux

	1. 安装

		npm i redux redux-logger redux-saga reselect -S

	2. 中间件 redux-logger 打印redux跟新日志
	
	3. 中间件 redux-saga 处理副作用操作
	
	4. reselect 计算衍生数据

	5. 使用说明

		1. reducer文件必须使用在 pages 文件夹下，且文件名为reducer
		2. saga文件必须使用在 pages 文件夹下，且文件名为 saga	
	
### 10. 安装axios api请求

	1. 配置request.js 请求模块


### 11. 安装eslint

	1. 安装
		
		npm i eslint -D

	2. 创建基础 .eslintrc.js

		./node_modules/.bin/eslint -–init

	3. 安装 babel-eslint

		添加 ES2015 的语言规范的支持
		npm i babel-eslint -D
		在 .eslintrc.js 配置中添加
			"parser":"babel-eslint"

	4. 安装依赖包

		npm i eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y -D

		eslint-config-airbnb : 配置一些 eslint rules 的规范
		eslint-plugin-import ：在使用 import 的时候，一些 rules 规范
		eslint-plugin-react ： 一些 react 的 eslint 的 rules 规范
		eslint-plugin-jsx-a11y： 一些 jsx 的 rules 规范

	5. 修改 .eslintrc.js 配置

		"extends":"airbnb",

	6. 添加一下规则
