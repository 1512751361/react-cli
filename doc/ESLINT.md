# ESLint 代码检测

### 前言

说起前端代码规范，首先我们想到的是 `eslint`, `tslint`。同一个项目，或者同一个小组，保持代码风格一致很必要。就拿 `react` 项目来说，之前做的几个项目，由于代码格风格和规范都不一致，导致团队成员难以阅读他人代码，增加交流成本，开发效率低。为了方便团队其他人员的阅读本人代码，减少团队交流成本，提高工作效率。因此，好的格式化工具和团队代码风格一致，显得格外重要。在这里我对 `eslint` 的配置进行了梳理。

### 作用

`ESlint` 作为代码检查工具，其作用主要有以下几点

1. 统一代码风格规则，如：缩进用几个空格；是否用驼峰命名法来命名变量和函数名等。
2. 减少错误， 如：相等比较必须用 ===，变量在使用前必须被声明，在条件语句中不能使用赋值语句等。
3. 提高代码质量，如：函数最多有多少条件分支；最多有几个参数，代码块最多能嵌套多少层等。
4. 检测代码合法性
5. 配合流行的前端构建工具
6. 代码格式化(按照 eslint 配置文件的规范设置)
7. 结合编辑实现 代码时实检验、自动格式化
8. 生成代码规范检测报告
9. 结合 Git Hook 来实现代码检测不通过则不允许提交
10. 其他。如： 禁用 alert。这可以提高用户体验，因为 alert 框的外观不是那么好看，而且往往与网站的风格不搭，一般都会自定义 alert 框。

### 安装&配置

    ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。

1.  安装 `eslint`

    `npm i eslint -D`

2.  创建基础 `.eslintrc.js`

    `./node_modules/.bin/eslint -–init` 或 `eslint -–init`

3.  安装 `babel-eslint`

    添加 `ES2015` 的语言规范的支持

    `npm i babel-eslint -D`

    在 `.eslintrc.js` 配置中添加

    `"parser":"babel-eslint"`

4.  安装依赖包

    ```
      npm i eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint-import-resolver-webpack eslint-import-resolver-alias -D
    ```

    `eslint-config-airbnb`: 配置一些 `eslint rules` 的规范

    `eslint-plugin-import`: 在使用 `import` 的时候，一些 rules 规范

    `eslint-plugin-react`: 一些 `react` 的 `eslint` 的 rules 规范

    `eslint-plugin-jsx-a11y`: 一些 `jsx` 的 `rules` 规范

    `eslint-import-resolver-webpack`: 兼容 `webpack` 配置，并在 `.eslintrc.js` 配置中添加

    ```
    settings: {
      'import/resolver': {
        webpack: {
          config: './build/webpack.dev.js'
        }
      },
    },
    ```

    `eslint-import-resolver-alias`: 解决 `webpack` 配置别名报错处理，并在 `.eslintrc.js` 配置中添加

    ```
    alias: {
      map: [['@components', path.resolve(paths.appSrc, 'components')]]
    }
    ```

    接着 `.eslintrc.js` 添加使用的扩展库

    `"extends": "airbnb",`

5.  配置

    ```
    {
      "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
      },
      "parserOptions": {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
      },
      plugins: ['react'],
      "rules": {
        ...
      }
    }
    ```

    `env`: 指定代码的运行环境

    `globals`: 额外的全局变量

    `parserOptions`: 解析器配置，指定 `JavaScript` 相关的选项。

    `ecmaFeatures`: 使用的额外的语言特性:

    `ecmaVersion`: 指定用哪个 `ECMAScript` 的版本，默认是 3 和 5。

    `rules`: 具体检查的规则，不设置则不会检查

    `plugins`: 第三方插件

### `eslint rules` 匹配规则

    off 或 0: 表示不验证规则。
    warn 或 1: 表示验证规则，当不满足时，给警告
    error 或 2: 表示验证规则，不满足时报错

1. 代码风格及规范限制相关

   ```
   {
      quotes: [2, 'single'], // 单引号
      'no-console': 0, // 不禁用console
      'no-debugger': 2, // 禁用debugger
      semi: [2, 'always'], // 强制使用分号
      'comma-dangle': ['error', 'always-multiline'],
      'no-control-regex': 2, // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
      'linebreak-style': ['error', 'unix'], // 此规则强制执行统一的行结尾，而不受操作系统，VCS 或整个代码库中使用的编辑器的影响
      indent: [2, 2], // 空格4个
      'array-bracket-spacing': 2, // 指定数组的元素之间要以空格隔开(,后面)
      'brace-style': [2, '1tbs', { allowSingleLine: true }], // if while function 后面的{必须与if在同一行，java风格。
      'no-irregular-whitespace': 2, // 不规则的空白不允许
      'no-trailing-spaces': 2, // 一行结束后面有空格就发出警告
      'eol-last': 2, // 文件以单一的换行符结束
      'no-unused-vars': [
        2,
        {
          vars: 'all',
          args: 'none'
        }
      ], // 不能有声明后未被使用的变量或参数
      'no-underscore-dangle': 2, // 标识符不能以_开头或结尾
      'no-alert': 2, // 禁止使用alert confirm prompt
      'no-lone-blocks': 2, // 禁止不必要的嵌套块
      'no-class-assign': 2, // 禁止给类赋值
      'no-floating-decimal': 2, // 禁止数字字面量中使用前导和末尾小数点
      'no-loop-func': 2, // 禁止在循环中出现 function 声明和表达式
      'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
      'no-delete-var': 2, // 不能对var声明的变量使用delete操作符
      'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复
      'no-duplicate-case': 2, // switch中的case标签不能重复
      'no-dupe-args': 2, // 函数参数不能重复
      'no-empty': 2, // 块语句中的内容不能为空
      'no-func-assign': 2, // 禁止重复的函数声明
      'no-invalid-this': 2, // 禁止无效的this，只能用在构造器，类，对象字面量
      'no-redeclare': 2, // 禁止重复声明变量
      'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
      'no-undef': 2, // 不能有未定义的变量
      'no-use-before-define': 2, // 未定义前不能使用
      camelcase: 2, // 强制驼峰法命名
      // 定义对象的set存取器属性时，强制定义get
      'accessor-pairs': 'error',
      // 要求每对括号一致使用换行符。如果其中一个支架在其内部有换行符，而另一个支架没有，则报告错误。
      'array-bracket-newline': ['error', 'consistent'],
      // return规则强制在数组方法的回调中使用语句
      'array-callback-return': 'error',
      // 该规则强制数组元素之间的换行符。使用多行强制换行，单行不换行
      'array-element-newline': ['error', { "multiline": true }],
      // 变量在定义块的外部使用时，规则会生成警告。这模拟了C风格的块范围。
      'block-scoped-var': 'error',
      // 规则在打开的块令牌内和同一行上的下一个令牌内强制执行一致的间距。此规则还会在同一行中的关闭块标记和以前的标记内强制实施一致的间距。
      'block-spacing': 'error',
      // 规则旨在确保在主功能块外部使用的回调始终是在return语句之前的部分或之前
      'callback-return': 'error',
      // 此规则在注释开始时将需要非小写字母
      'capitalized-comments': ['error'],
      // always-multiline：多行模式必须带逗号，单行模式不能带逗号
      'comma-dangle': ['error', 'never'],
      // 控制逗号前后的空格
      'comma-spacing': [
        2,
        {
          before: false,
          after: true
        }
      ],
      // 控制逗号在行尾出现还是在行首出现
      'comma-style': [2, 'last'],
      // 圈复杂度
      complexity: [2, 9],
      // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
      'computed-property-spacing': [2, 'never'],
      // 强制方法必须返回值，TypeScript强类型，不配置
      'consistent-return': 0,
      'consistent-this': 2,
      // if else while for do后面的代码块是否需要{ }包围
      curly: [2, 'all'],
      // switch语句强制default分支，也可添加 // no default 注释取消此次警告
      'default-case': 2,
      // 强制object.key 中 . 的位置，
      'dot-location': [2, 'property'],
      // 强制使用.号取属性
      'dot-notation': [
        2,
        {
          allowKeywords: true
        }
      ],
      // 使用 === 替代 ==
      eqeqeq: [2, 'allow-null'],
      // 方法表达式是否需要命名
      'func-names': 0,
      // 方法定义风格
      'func-style': 0,
      // 该规则旨在强化*发生器功能的间距。
      'generator-star-spacing': [
        2,
        {
          before: true,
          after: true
        }
      ],
      // 此规则旨在防止使用for in循环而不过滤循环中的结果时可能出现的意外行为
      'guard-for-in': 2,
      'global-require': 2,
      // 这个规则期望当你在 Node.js 中使用回调模式时，你会处理这个错误
      'handle-callback-err': [2, '^(err|error)$'],
      // 此规则强制在对象字面量属性中的键和值之间保持一致的间距
      'key-spacing': [
        2,
        {
          beforeColon: false,
          afterColon: true
        }
      ],
      // 此规则在评论之前和/或之后需要空行
      'lines-around-comment': 2,
      // 此规则强制执行最大深度，可以嵌套回调以提高代码清晰度
      'max-nested-callbacks': ['error', 3],
      // 此规则要求构造函数名以大写字母开头。某些内置标识符可免除此规则.
      'new-cap': [
        2,
        {
          newIsCap: true,
          capIsNew: false
        }
      ],
      'no-catch-shadow': 2,
      'no-constant-condition': 2,
      'no-continue': 2,
      'no-div-regex': 2,
      'no-else-return': 2,
      'no-empty-character-class': 2,
      'no-eq-null': 2,
      'no-eval': 2,
      'no-ex-assign': 2,
      'no-extend-native': 2,
      'no-extra-bind': 2,
      'no-extra-parens': 2,
      'no-extra-semi': 2,
      'no-fallthrough': 2,
      'no-implied-eval': 2,
      'no-inline-comments': 2,
      'no-inner-declarations': [2, 'functions'],
      'no-invalid-regexp': 2,
      'no-iterator': 2,
      'no-label-var': 2,
      'no-labels': 2,
      'no-lonely-if': 2,
      'no-mixed-requires': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-multiple-empty-lines': [
        2,
        {
          max: 1
        }
      ],
      'no-native-reassign': 2,
      'no-negated-in-lhs': 2,
      'no-nested-ternary': 2, // 规则不允许嵌套的三元表达式。
      'no-new': 2,
      'no-new-func': 2,
      'no-new-object': 2,
      'no-new-require': 2,
      'no-new-symbol': 2,
      'no-new-wrappers': 2,
      'no-obj-calls': 2, // 这个规则不允许调用Math，JSON和Reflect对象作为功能
      'no-octal': 2, // 不允许使用八进制文字
      'no-octal-escape': 2, // 不允许字符串文字中的八进制转义序列
      'no-param-reassign': 2, // 防止由功能参数的修改或重新分配引起的意外行为
      'no-path-concat': 2, // 防止 Node.js 中的目录路径字符串连接
      'no-process-env': 2, // 阻止使用process.env以避免全局依赖
      'no-process-exit': 0, // 防止process.exit()在 Node.js JavaScript 中使用
      'no-proto': 2,
      'no-regex-spaces': 2, // 规则在正则表达式文字中不允许有多个空格
      'no-restricted-modules': 0, // 允许你指定你不想在你的应用程序中使用的模块
      'no-return-assign': 2, // 消除return陈述中的任务
      'no-script-url': 2,
      'no-self-compare': 2, // 引发这个错误是为了强调一个潜在的混淆和可能没有意义的代码片断
      'no-sequences': 2, // 禁止使用逗号运算符
      'no-shadow': 2, // 该规则旨在消除阴影变量声明
      'no-shadow-restricted-names': 2,
      'no-sparse-arrays': 2, // 不允许稀疏数组文字
      'no-sync': 2, // 防止在 Node.js 中调用同步方法
      'no-ternary': 0, // 不允许三元运算符
      'no-throw-literal': 2, // 不允许抛出不可能是Error对象的文字和其他表达式来抛出异常时保持一致性
      'no-undef-init': 2, // 消除初始化为的变量声明undefined
      'no-undefined': 2, // 消除使用undefined，并因此在使用时发出警告
      'no-unexpected-multiline': 2, // 不允许混淆多行表达式，换行符看起来像是结束语句，但不是
      'no-unneeded-ternary': 2, // 当存在更简单的选择时，此规则不允许三元运算符
      'no-unused-expressions': 2,
      'no-void': 2, // 消除无效操作符的使用
      'no-warning-comments': 2, // 报告包含其配置中指定的任何预定义术语的注释
      'no-with': 2, // 不允许with声明
      'no-tabs': 2, // 禁止缩进错误
      'no-restricted-syntax': 2, // 允许使用 for in
      // 此规则在对象文字的大括号内执行一致的间距，解构赋值和导入/导出说明符。
      'object-curly-spacing': ['error', 'always'],
      //
      'one-var': [
        2,
        {
          initialized: 'never'
        }
      ],
      // 此规则要求或不允许赋值运算符速记
      'operator-assignment': ['error', 'always'],
      // 此规则为运营商实施一致的换行样式。
      'operator-linebreak': [
        2,
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before'
          }
        }
      ],

      //
      'padded-blocks': 2,
      // 此规则旨在标记使用let关键字声明的变量，但在初始分配后从未重新分配变量
      'prefer-const': 2,

      // 此规则需要引用对象字面值属性名称。
      'quote-props': ['error', 'as-needed'],
      // 此规则旨在防止意外地将字符串转换为与预期不同的基数，或者如果仅锁定现代环境，则会阻止冗余10基数。
      radix: 2,
      // 此规则旨在强制分号间隔。
      'semi-spacing': 2,
      // 该规则检查所有变量声明块并验证所有变量是按字母顺序排序的。
      'sort-vars': 0,
      // 此规则将强化块之前的间距一致性
      'space-before-blocks': [2, 'always'],
      // 此规则将强制直接在括号内进行间隔的一致性，即禁止或要求右侧(和左侧有一个或多个空格)。无论如何，()仍然会被允许。
      'space-in-parens': [2, 'never'],
      // 这条规则旨在确保中缀操作员周围有空间。
      'space-infix-ops': 2,
      // 该规则强化了words一元运算符之后和一元运算符之后的空间的一致性nonwords。
      'space-unary-ops': [
        2,
        {
          words: true,
          nonwords: false
        }
      ],
      // 注释开始后，此规则将强制间距的一致性//或/*。它还为各种文档样式提供了一些例外。
      'spaced-comment': [
        2,
        'always',
        {
          markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!']
        }
      ],
      // 严格模式
      strict: ['error', 'never'],

      // 这条规则不允许比较'NaN'。
      'use-isnan': 2,

      // 此规则强制执行有效且一致的JSDoc注释。
      'valid-jsdoc': 2,
      // 此规则强制将typeof表达式与有效的字符串文字进行比较。
      'valid-typeof': 2,
      // 该规则旨在将所有变量声明保留在前面的一系列声明中。允许多个声明有助于提高可维护性，因此被允许。
      'vars-on-top': 2,

      // 该规则要求所有立即调用的函数表达式都包含在圆括号中。
      'wrap-iife': [2, 'inside', { functionPrototypeMethods: true }],
      // 这用于消除斜杠运算符的歧义，并有助于使代码更具可读性。
      'wrap-regex': 0,

      // 这条规则旨在强制执行一种将变量与文字值进行比较的一致条件样式。
      yoda: [2, 'never'],
   }
   ```

2. `React` 相关

   ```
   {
      'jsx-quotes': [2, 'prefer-double'], //强制在JSX属性（jsx-quotes）中一致使用双引号
      'react/display-name': 2, // 防止在React组件定义中丢失displayName
      'react/forbid-prop-types': [2, { forbid: ['any'] }], // 禁止某些propTypes
      'react/jsx-boolean-value': 2, // 在JSX中强制布尔属性符号
      'react/jsx-closing-bracket-location': 1, // 在JSX中验证右括号位置
      'react/jsx-curly-spacing': [2, { when: 'never', children: true }], // 在JSX属性和表达式中加强或禁止大括号内的空格
      'react/jsx-indent': [2, 2],
      'react/jsx-indent-props': [2, 2], //验证JSX中的props缩进
      'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
      'react/jsx-no-bind': 0, // JSX中不允许使用箭头函数和bind
      'react/jsx-no-duplicate-props': 2, // 防止在JSX中重复的props
      'react/jsx-no-literals': 2, // 防止使用未包装的JSX字符串
      'react/jsx-no-undef': 2, // 在JSX中禁止未声明的变量
      'react/jsx-pascal-case': 2, // 为用户定义的JSX组件强制使用PascalCase
      'react/jsx-uses-react': 2, // 防止反应被错误地标记为未使用
      'react/jsx-uses-vars': 2, // 防止在JSX中使用的变量被错误地标记为未使用
      'react/no-danger': 2, // 防止使用危险的JSX属性
      'react/no-did-mount-set-state': 2, // 防止在componentDidMount中使用setState
      'react/no-did-update-set-state': 1, // 防止在componentDidUpdate中使用setState
      'react/no-direct-mutation-state': 2, // 防止this.state的直接变异
      'react/no-multi-comp': 2, // 防止每个文件有多个组件定义
      'react/no-set-state': 0, // 防止使用setState
      'react/no-unknown-property': 2, // 防止使用未知的DOM属性
      'react/prefer-es6-class': 2, // 为React组件强制执行ES5或ES6类
      'react/prop-types': 2, // 防止在React组件定义中丢失props验证
      'react/react-in-jsx-scope': 2, // 使用JSX时防止丢失React
      'react/self-closing-comp': 0, // 防止没有children的组件的额外结束标签
      'react/sort-comp': 2, // 强制组件方法顺序
      'no-extra-boolean-cast': 2, // 禁止不必要的bool转换
      'react/no-array-index-key': 2, // 防止在数组中遍历中使用数组key做索引
      'react/no-deprecated': 2, // 不使用弃用的方法
      'react/jsx-equals-spacing': 2, // 在JSX属性中强制或禁止等号周围的空格
      'no-unreachable': 2, // 不能有无法执行的代码
      'comma-dangle': 2, // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
      'comma-spacing': [2, { before: false, after: true }], // 控制逗号前后的空格
      'no-mixed-spaces-and-tabs': 2, // 禁止混用tab和空格
      'prefer-arrow-callback': 0, // 比较喜欢箭头回调
      // 允许在 .js 和 .jsx 文件中使用 jsx
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
      // 不区分是否是 无状态组件
      'react/prefer-stateless-function': 2,
      'jsx-a11y/click-events-have-key-events': 2,
      'jsx-a11y/no-noninteractive-element-interactions': 2,
      'import/no-unresolved': 2,
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never'
        }
      ],
      "import/newline-after-import": 2,
   }
   ```

3. `ES6` 相关

   ```
   {
      'arrow-body-style': 2, // 要求箭头函数体使用大括号
      'arrow-parens': 2, // 要求箭头函数的参数使用圆括号
      'arrow-spacing': [2, { before: true, after: true }], // 规则在箭头函数的箭头（=>）之前/之后标准化间距样式
      'constructor-super': 2, // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
      'no-const-assign': 2, // 禁止修改 const 声明的变量
      'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
      'no-this-before-super': 2, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
      'no-var': 2, // 要求使用 let 或 const 而不是 var
      'object-shorthand': 2, // 要求或禁止对象字面量中方法和属性使用简写语法
      'prefer-template': 2, // 要求使用模板字面量而非字符串连接
      // 此规则在使用new关键字调用不带参数的构造函数时需要括号，以便提高代码清晰度
      'new-parens': 2,
      // 此规则强制执行，其中空线都需要或禁止后一种编码风格var，let或const语句来实现整个项目一致的编码风格。
      'newline-after-var': 2,
   }
   ```

### `vscode` 中添加 `eslint` 插件

    安装好了之后，会自动根据你上面配置的规则进行代码检查，不合格的会高亮显示。配置 vscode settings 后，就可以保存自动按照配置格式化代码了。

1. window 电脑：

   文件 > 首选项 > 设置 打开 VSCode 配置文件

2. mac 电脑

   code>首选项 >设置

3. 配置内容

   ```
   {
     "editor.tabSize": 2,
     "files.associations": {
         "*.vue": "vue"
     },
     "eslint.autoFixOnSave": true,
     "eslint.options": {
         "extensions": [
             ".js",
             ".vue"
         ]
     },
   "eslint.validate": [
       "javascript",{
           "language": "vue",
           "autoFix": true
       },"html",
       "vue"
   ],
     "search.exclude": {
         "**/node_modules": true,
         "**/bower_components": true,
         "**/dist": true
     },
     "emmet.syntaxProfiles": {
         "javascript": "jsx",
         "vue": "html",
         "vue-html": "html"
     },
     "git.confirmSync": false,
     "window.zoomLevel": 0,
     "editor.renderWhitespace": "boundary",
     "editor.cursorBlinking": "smooth",
     "editor.minimap.enabled": true,
     "editor.minimap.renderCharacters": false,
     "editor.fontFamily": "'Droid Sans Mono', 'Courier New', monospace, 'Droid Sans Fallback'",
     "window.title": "${dirty}${activeEditorMedium}${separator}${rootName}",
     "editor.codeLens": true,
     "editor.snippetSuggestions": "top",
   }
   ```
