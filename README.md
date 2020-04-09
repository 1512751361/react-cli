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
		----modules/			--页面模块
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


## webpack 配置

### 1. webpack配置

  1. 安装webpack
		
		npm i webpack webpack-cli -D
    npm i webpack-merge -D

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
    ```
      "scripts": {
        "dev": "webpack-dev-server --config build/webpack.dev.js --progress --colors",
        "build:prod": "webpack --config build/webpack.prod.js --progress --colors",
        "build:stage": "webpack --config build/webpack.prod.js --progress --colors",
      }
    ```	
		
		// 运行
		npm run dev

		// 打包生产环境
		npm run build:prod

		// 打包测试环境
		npm run build:stage

### 2. 模块(module)

  在 ```module``` 选项主要就是设置 ```webpack``` 中常用的 ```loaders```。通过 ```rules``` 规则来匹配具体应用的文件和loaders或者修改解析器（parser）。

  1. module.noParse 防止预编译匹配规则

    ``` noParse: RegExp | [RegExp] | function ```
	
	2. ```module.rules``` 设置匹配规则

		```module.rules``` 的选项具体是用来设置 ```loaders``` 匹配文件的规则。

		```module.rules: [{...}]```

		```rules```里面的每个对象决定了 ```loaders``` 的具体类型以及 ```loders``` 作用的具体文件。

	3. 文件匹配

		```rule.test, rule.exclude, rule.include, rule.and, rule.or, rule.not ```

		上面三个对象其实挂载到的是 ```rule.resource``` 对象上的，你可以直接写到 ```rule``` 上，也可以写到 ```rule.resource``` 上。他们的值同一位 ```condition```。

		```rule.resourceQuery```

	4. condition 条件

		主要用来设置匹配文件的条件规则。可以接受的值有：

		```condition: string | RegExp | function | array | object```

		***string***: 匹配文件的绝对路径
		***RegExp***: 匹配文件的正则
		***function***: 参数为 ```input``` 的路径，根据返回的 ```boolean``` 来决定是否匹配
		***array***: 里面可以传多个 ```condition``` 匹配规则
		***object***: 不常用，用来匹配 ```key```

	4. rule.oneOf

		接收一个数组，文件资源会默认找到 ```oneOf``` 中的第一个匹配规则，来调用对应的loader处理。

	5. rule.parser

		解析选项对象。所有应用的解析选项都将合并。

	6. rule.use

		应用于模块的 ```UseEntries``` 列表。每个入口指定一个 ```loader```。

	7. UseEntries

		必须有一个 ```loader``` 属性是字符串。它使用 ```loader``` 解析选项（```resolveLoader```）,相对于配置中的 ```context``` 来解析。

		可以有一个 ```options``` 属性为字符串或对象。值可以传递到 ```loader``` 中，将其理解 ```options``` 选项。


### 3. loader 编译设置

  在 ```webpack2``` 的时候，主要写法是根据 ```loaders``` 和 ```loader``` 来进行设定的。不过，在 ```webpack 3``` 改为根据文件来决定 ```loader``` 的加载。这其中，最大的特点就是，将 ```loaders``` 替换为了 ```rules```。

  按照规范，```use``` 是用来时间引入 ```loader``` 的标签。在 ```webpack 3 ``` 时代，还保留了 ```loader``` 字段，废除了 ```query``` 字段，其实可以在 ```use``` 中找到替代。

  1. loader
	
		用来定义具体使用的 ```loader```，这里等同于：```use:[loader]```。

	2. query

		用来限定具体的 ```loader``` 使用的配置参数，例如
		
		```
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		```

		不过，在 ```webpack 3``` 中已经废弃了 ```query```，使用 ```use``` 中 ```options``` 选项：

		```
			test: /\.js$/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			]
		```

### 4. babel 配置

  ```babel``` 是一个 ```JavaScript```` 编译器，用来解析 ```es6``` 语法或者 ```es7``` 语法分解析器，让开发者能够使用新的 ```es``` 语法，同时支持 ```jsx, tsx, vue``` 等多种框架。

  1. 安装babel
		
    // 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
    ```npm i @babel/core babel-loader -D```

    // 像 JavaScript 一样加载 TypeScript 2.0+
    ``` npm i ts-loader -D ``` 或者 ``` npm i awesome-typescript-loader -D```

	2. 配置babel文件: .babelrc 或者 配置到 babel-loader options 中

    ```
    {
        "presets": [
          "@babel/preset-env",
          "@babel/preset-react",
          "state-0"
        ],
        "plugins": []
    }
    ```

    ```babel``` 支持自定义的预设(presets)或插件(plugins),只有配置了这两个才能让babel生效，单独的安装babel是无意义的。

    ```presets```：代表 ```babel``` 支持那种语法(就是你用那种语法写)，优先级是从下往上,state-0|1|2|..代表有很多没有列入标准的语法

    ```plugins```: 代表 ```babel``` 解析的时候使用哪些插件，作用和 ```presets```` 类似，优先级是从上往下。
	

  3. @babel/preset-env

    表示将 ```JavaScript es6``` 语法代码编译为 ```es5``` 语法		

  4. @babel/preset-react

    表示将 ```JSX``` 和其他东西编译到 ```JavaScript``` 中

  6. @babel/plugin-transform-runtime @babel/runtime

    Babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。默认情况下会被添加到每一个需要它的文件中
    
    你可以引入 Babel runtime 作为一个独立模块，来避免重复引入。

    下面的配置禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。

    ```npm i @babel/runtime @babel/plugin-transform-runtime -D``

  7. babel-polyfill

    我们之前使用的 ```babel，babel-loader``` 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。

    ```npm i babel-polyfill -D```
    
  8. @babel/plugin-proposal-object-rest-spread
  
    编译解析 ... 对象语法
    ```
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    console.log(x); // 1
    console.log(y); // 2
    console.log(z); // { a: 3, b: 4 }
    ```

  9. @babel/plugin-proposal-class-properties

    // 编译解析 class 类中的箭头函数
    ```npm i @babel/plugin-proposal-class-properties -D```

  10. @babel/plugin-syntax-dynamic-import

    // 编译解析 动态导入资源

### 5. loader 加载资源

  1. 处理css loader

	  1. 加载资源

      ```npm i style-loader css-loader sass-loader node-sass -D```
    
    2. 添加css打包分离压缩去重

      ```
      npm i mini-css-extract-plugin optimize-css-assets-webpack-plugin postcss-loader autoprefixer postcss-import cssnano -D
      
      // 添加提取css插件
      // 配置 css loader ，配置 plugins 打包文件名和出口路径
			npm i mini-css-extract-plugin -D

			// 添加css压缩、去重插件
      // optimization.minimizer 添加插件
			npm i optimize-css-assets-webpack-plugin -D

			// 添加用于Webpack处理带有Postss的CSS的加载程序
			npm i postcss-loader -D

			// 添加css前缀，兼容不同浏览器 插件
			npm i autoprefixer -D

			// 添加处理css的@import 只支持本地的 import 处理,不支持http 等远程的URL链接的处理插件
			npm i postcss-import -D

			// 添加css优化处理器
      // 用于添加 optimize-css-assets-webpack-plugin 插件添加 optimization.minimizer 配置
			npm i cssnano -D
      ```

		2. 添加webpack加载器配置

      配置 ```webpack module.rules```


  2. 处理图片、字体、文件 loader
		
		1. 加载资源

			```npm i file-loader -D	```	

		2. 添加webpack加载器配置

      配置 ```webpack module.rules```
  
  3. 加载资源数据（可选）

    可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，可以直接使用。
    导入 CSV、TSV 和 XML需加载
    ```npm install --save-dev csv-loader xml-loader```

### 6. 管理输出

  1. 添加 HtmlWebpackPlugin 插件,

    // 添加到 ```webpack plugins``` ，动态打包输出 html 文件
    ```npm i html-webpack-plugin -D	```

	2. 添加 清理 /dist 文件夹插件 CleanWebpackPlugin

    // 添加到 ```webpack plugins``` ，动态清理打包文件内容
    ```npm i clean-webpack-plugin -D```


### 7. 使用 webpack-dev-server 配置开发环境

  1. 安装

    ```npm i webpack-dev-server -D```

	2. 配置webpack配置文件 ```devServer```

	3. 添加模块热更新插件 ```plugins```

		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),

### 8. 配置 webpack resolve 解析

  1. resolve.modules

    告诉 webpack 解析模块时应该搜索的目录.
    绝对路径和相对路径都能使用，但是要知道它们之间有一点差异。

  2. resolve.alias

    设置引用文件路径的别名

  3. resolve.extensions

    自动解析确定的扩展。

### 9. 其他 webpack 配置

  1. 告知 webpack 为目标(target)指定一个环境

    ```target: 'web',```
  
  2. 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)

    ```
    externals: {
      jquery: 'jQuery',
    },
    ```
  
  3. 配置如何展示性能提示

    ```
    performance: {
      // 定一个创建后超过 500kb 的资源，将展示一条警告
      maxAssetSize: 1024 * 500,
    },
    ```

### 10. 打包分离压缩

  1. 压缩

    ```npm i terser-webpack-plugin -D```
    ```
    new TerserPlugin({
      terserOptions: {
        compress: {
          warnings: false,
          drop_console: true, // console
          drop_debugger: false,
          pure_funcs: ['console.log'], // 移除console
        },
      },
      sourceMap: false,
      parallel: true,
    }),
    ```

  2. 防止重复

    ```
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。
    })
    ```
  
  3. 代码分离

    配置 ```webpack optimization.splitChunks``


### 11. 添加离线服务器

	npm i http-server -D



## React 配置

### 1. 安装 React

		npm i react react-dom -S

### 2. 安装react路由

	1. 安装

		npm i react-router react-router-dom -S

	2. 创建路由配置文件 routes
	
	3. 添加路由配置方法 routes/index.js
	
	4. 创建动态引入创建路由对象 routes/method/dynamic-loader.js
	
	5. 使用说明

		1. 页面路由必须写在 modules/ 模块下
		2. 如果改页面要成为主路由，需要添加 route.js 创建子模块路由对象
	

### 3. 安装react-redux

	1. 安装

		npm i redux redux-logger redux-saga reselect -S

	2. 中间件 redux-logger 打印redux跟新日志
	
	3. 中间件 redux-saga 处理副作用操作
	
	4. reselect 计算衍生数据

	5. 使用说明

		1. reducer文件必须使用在 modules/ 模块下，且文件名为 reducer
		2. saga文件必须使用在 modules/ 模块下，且文件名为 saga	
	
### 4. 安装axios api请求

	1. 配置request.js 请求模块


## eslint 配置

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



