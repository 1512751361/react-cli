/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  // 测试中导入的所有模块都应自动模拟
  // automock: false,

  // “n”失败后停止运行测试
  // bail: 0,

  // 当解析模块时，是否遵循在 package.json 中的 Browserify 的 "browser" 字段
  // browser: false,

  // Jest用来储存依赖信息缓存的目录
  // cacheDirectory: "/private/var/folders/jh/ccyhjgq52_b2p0trd4rbk8dw0000gn/T/jest_dx",

  // 自动清除每个测试之间的模拟调用和实例
  clearMocks: true,

  // 指出是否收集测试时的覆盖率信息
  collectCoverage: true,

  // 一组glob模式，指示应为其收集覆盖率信息的一组文件
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**',
  ],

  // Jest输出覆盖信息文件的目录
  coverageDirectory: 'coverage',

  // 用于跳过覆盖率集合的regexp模式字符串数组
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Jest在编写覆盖率报告时使用的报告者名称列表
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // 为覆盖率结果配置最小阈值强制的对象
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },

  // 自定义依赖项提取程序的路径
  // dependencyExtractor: undefined,

  // 使调用不推荐的api抛出有用的错误消息
  errorOnDeprecated: true,

  // 使用glob模式数组强制从忽略的文件收集覆盖率
  // forceCoverageMatch: [],

  // 一个模块的路径，该模块导出在所有测试套件之前触发一次的异步函数
  // globalSetup: undefined,

  // 模块的路径，该模块导出在所有测试套件之后触发一次的异步函数
  // globalTeardown: undefined,

  // 需要在所有测试环境中可用的一组全局变量
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // 从所需模块的位置递归搜索的目录名数组
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // 模块使用的文件扩展名数组
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node"
  // ],

  // 从正则表达式到模块名或模块名数组的映射，允许使用单个模块来存根资源
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '^@page(.*)$': '<rootDir>/src/page$1',
    '^@util(.*)$': '<rootDir>/src/util$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
  },

  // 一个regexp模式字符串数组，与模块加载程序认为“可见”之前的所有模块路径匹配
  // modulePathIgnorePatterns: [],

  // 激活测试结果通知
  notify: true,

  // 指定通知模式的枚举。需要 { notify: true }
  // notifyMode: "failure-change",

  // 用作 Jest 配置基础的预置
  preset: 'ts-jest',

  // 从一个或多个项目运行测试
  // projects: undefined,

  // 使用此配置选项将自定义报告器添加到Jest
  // reporters: ['<rootDir>/my-custom-reporter.js'],

  // 在每次测试之间自动重置模拟状态
  resetMocks: true,

  // 在运行每个单独的测试之前重置模块注册表
  resetModules: true,

  // 自定义解析器的路径
  // resolver: undefined,

  // 在每次测试之间自动恢复模拟状态
  restoreMocks: true,

  // Jest应该扫描的根目录中的测试和模块
  // rootDir: undefined,

  // Jest应用于在中搜索文件的目录的路径列表
  // roots: [
  //   "<rootDir>"
  // ],

  // 允许您使用自定义运行程序而不是Jest的默认测试运行程序
  // runner: "jest-runner",

  // 在每次测试之前运行一些代码以配置或设置测试环境的模块的路径
  // setupFiles: [],

  // 指向在每次测试之前运行一些代码以配置或设置测试框架的模块的路径列表
  // setupFilesAfterEnv: [],

  // Jest应用于快照测试的快照序列化程序模块的路径列表
  // snapshotSerializers: [],

  // 将用于测试的测试环境
  // testEnvironment: "jest-environment-jsdom",

  // 将传递给测试环境的选项
  // testEnvironmentOptions: {},

  // 将位置字段添加到测试结果
  testLocationInResults: true,

  // Jest用来检测测试文件的glob模式
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  // 与所有测试路径匹配的regexp模式字符串数组，将跳过匹配的测试
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Jest用来检测测试文件的regexp模式或模式数组
  // testRegex: [],

  // 此选项允许使用自定义结果处理器
  // testResultsProcessor: undefined,

  // 此选项允许使用自定义测试运行程序
  // testRunner: "jasmine2",

  // 此选项设置jsdom环境的URL。它反映在属性中，如location.ref
  // testURL: "http://localhost",

  // 将此值设置为“fake”允许对“setTimeout”等函数使用假计时器
  // timers: "real",

  // 从正则表达式到变压器路径的映射
  transform: {
    // 将.js后缀的文件使用babel-jest处理
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // 与所有源文件路径匹配的regexp模式字符串数组，匹配的文件将跳过转换
  // 下面非要从重要, 将不忽略 lodash-es, other-es-lib 这些es库, 从而使babel-jest去处理它们
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lodash-es|other-es-lib))'],

  // 一个regexp模式字符串数组，在模块加载器自动返回它们的mock之前匹配所有模块
  // unmockedModulePathPatterns: undefined,

  // 指示是否应在运行期间报告每个单独的测试
  verbose: true,

  // 在监视模式下重新运行测试之前，与所有源文件路径匹配的regexp模式数组
  // watchPathIgnorePatterns: [],

  // 是否使用watchman进行文件爬网
  // watchman: true,
};
