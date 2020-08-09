// 配置.eslintrc.js

// 需要手动修改规则的话这样合并进去
const rules = {
  /**
   * off 或 0：表示不验证规则。
   * warn 或 1：表示验证规则，当不满足时，给警告
   * error 或 2 ：表示验证规则，不满足时报错
   */
  /// ///////////
  // 代码风格及规范限制.相关 start //
  /// ///////////

  // 方法表达式是否需要命名
  'func-names': 0,
  // 不禁用console
  'no-console': 1,

  /// ///////////
  // 代码风格及规范限制.相关 end //
  /// ///////////

  /// ///////////
  // TS.相关 start //
  /// ///////////

  // any类型时的警告报错
  '@typescript-eslint/no-explicit-any': 1,
  // 只要求自定义的方法设置返回类型
  '@typescript-eslint/explicit-function-return-type': [
    2,
    {
      allowExpressions: true
    }
  ],
  // 关闭接口不能以 I 为前缀
  '@typescript-eslint/interface-name-prefix': 0

  /// ///////////
  // TS.相关 end //
  /// ///////////
};

module.exports = {
  // 使用的扩展库
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  // 解析器用于解析代码
  parser: '@typescript-eslint/parser',
  rules,
  // 全局变量
  globals: {
    // Atomics: 'readonly',
    // SharedArrayBuffer: 'readonly',
    // require: 'readonly',
    // process: 'readonly',
  },
  // 解析器配置
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      modules: true,
      jsx: true
    },
    ecmaVersion: 2019,
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  // 第三方插件
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      webpack: {
        config:
          process.env.NODE_ENV === 'production'
            ? './build/webpack.prod.js'
            : './build/webpack.dev.js'
      }
    },
    'import/ignore': ['node_modules', './doc']
  }
};
