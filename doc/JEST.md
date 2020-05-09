# ```Jest```

## 1. 安装和配置

1. 安装

    在开发 React 应用的基础上（默认你用的是 Webpack + Babel 来打包构建应用），你需要安装 ```Jest Enzyme```，以及对应的 ```babel-jest```

    ```npm i jest enzyme babel-jest -D```

    添加您所使用的react（或其他UI组件库）版本相对应的适配器

    ```npm i enzyme-adapter-react-16```

    ```typescript``` 项目还需安装 ```ts-jest``` 编译解析

    ```npm i ts-jest -D```

2. 配置

    通过 ```jest init``` 创建 ```jest``` 默认 ```jest.config.js``` 配置。

    用作 Jest 配置基础的预置，修改如下配置：

    ```
    {
      preset: 'ts-jest',
    }
    ```

    指出是否收集测试时的覆盖率信息，修改如下配置：

    ```
    {
      collectCoverage: true,
      collectCoverageFrom: [
        '**/src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**',
      ],
    }
    ```

    从正则表达式到变压器路径的映射，修改如下配置：

    ```
    {
      transform: {
        // 将.js后缀的文件使用 babel-jest 处理
        '^.+\\.js$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
    }
    ```

    如果 ```webpack``` 配置了别名，要使测试文件别名生效可如下配置：

    ```
    {
      moduleNameMapper: {
        '^@src(.*)$': '<rootDir>/src$1',
        '^@page(.*)$': '<rootDir>/src/page$1',
        '^@util(.*)$': '<rootDir>/src/util$1',
        '^@common(.*)$': '<rootDir>/src/common$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
      },
    }
    ```

## ```Jest``` 匹配器

### 1. 普通匹配器

#### 1. 相等断言

1. ```toBeNull()``` 只匹配 null

2. ```toBeUndefined()``` 只匹配 undefined

3. ```toBe(value)``` 比较数字、字符串，不能比较浮点数

4. ```toBeCloseTo(value)``` 比较浮点数相等

5. ```toEqual(value)``` 比较对象、数组

#### 2. 包含断言

1. ```toHaveProperty(keyPath, value)``` 是否有对应的属性

2. ```toContain(item)``` 是否包含对应的值，括号里写上数组、字符串。可以通过 toContain来检查一个数组或可迭代对象是否包含某个特定项

3. ```toMatch(regexpOrString)``` 括号里写上正则。以检查对具有 toMatch 正则表达式的字符串

#### 3. 逻辑断言

1. ```toBeTruthy()``` 匹配任何 if 语句为真

2. ```toBeFalsy()``` 匹配任何 if 语句为假

3. ```toBeGreaterThan(number)``` 大于 number 值

4. ```toBeGreaterThanOrEqual(number)``` 大于等于 number 值

5. ```toBeLessThan(number)``` 小于 number 值

6. ```toBeLessThanOrEqual(number)``` 小于等于 number 值

7. ```toBeDefined``` 与 ```toBeUndefined``` 相反


#### 4. 取反

1. ```not``` 取反
 
#### 5. 抛出错断言

1. ```toThrow``` 测试的特定函数抛出一个错误


### 2. 异步代码测试 

#### 1. 回调

    使用单个参数调用 done，而不是将测试放在一个空参数的函数。 Jest会等done回调函数执行结束后，结束测试。

    若 done() 函数从未被调用，测试用例会正如你预期的那样执行失败（显示超时错误）。

#### 2. Promises

    一定不要忘记把 promise 作为返回值⸺如果你忘了 return 语句的话，在 fetchData 返回的这个 promise 被 resolve、then() 有机会执行之前，测试就已经被视为已经完成了。

#### 3. ```.resolves / .rejects```

    在 expect 语句中使用 .resolves 匹配器，Jest 将等待此 Promise 解决。 如果承诺被拒绝，则测试将自动失败。

    一定不要忘记把整个断言作为返回值返回⸺如果你忘了return语句的话，在 fetchData 返回的这个 promise 变更为 resolved 状态、then() 有机会执行之前，测试就已经被视为已经完成了。

#### 4. ```Async/Await```

    在测试中使用 async 和 await


### 3. 测试前后准备工作

#### 1. 为多次测试重复设置

    如果你有一些要为多次测试重复设置的工作，你可以使用 beforeEach 和 afterEach。

#### 2. 一次性设置

    在某些情况下，你只需要在文件的开头做一次设置。Jest 提供 beforeAll 和 afterAll 处理这种情况。

#### 3. 作用域

    默认情况下，before 和 after 的块可以应用到文件中的每个测试。 此外可以通过 describe 块来将测试分组。 当 before 和 after 的块在 describe 块内部时，则其只适用于该 describe 块内的测试。

    注意，顶级的 beforeEach 在 describe 块级的 beforeEach 之前被执行。 这可能有助于说明所有钩子的执行顺序。

#### 4. desribe和test块的执行顺序

    Jest 会在所有真正的测试开始之前执行测试文件里所有的 describe 处理程序（handlers）。 这是在 before* 和 after* 处理程序里面 （而不是在 describe 块中）进行准备工作和整理工作的另一个原因。 当 describe 块运行完后,，默认情况下，Jest 会按照 test 出现的顺序依次运行所有测试，等待每一个测试完成并整理好，然后才继续往下走。

#### 5. 通用建议

    如果测试失败，第一件要检查的事就是，当仅运行这条测试时，它是否仍然失败。

    如果你有一个测试，当它作为一个更大的用例中的一部分时，经常运行失败，但是当你单独运行它时，并不会失败，所以最好考虑其他测试对这个测试的影响。 通常可以通过修改 beforeEach 来清除一些共享的状态来修复这种问题。

### 4. Mock Functions

    https://jestjs.io/docs/zh-Hans/mock-functions


## 3. DOM 渲染

    Enzyme是用于React的JavaScript测试实用程序，可以更轻松地测试React组件的输出。您还可以根据给定的输出进行操作，遍历并以某种方式模拟运行时。

    通过模仿用于DOM操作和遍历的jQuery API，Enzyme的API旨在变得直观且灵活。

    Enzyme官网：https://enzymejs.github.io/enzyme/



