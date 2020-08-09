# `React` 项目文档

### 1. 项目结构

#### 1. Webpack 打包配置

css 采用 less 不用 sass

#### 2. 路由

##### 1. 配置式路由

1. path

2. component

3. exact

4. childRoutes

5. redirect

6. wrappers

7. title

##### 2. 约定式路由

1. 需要注意的是，满足以下任意规则的文件不会被注册为路由，

   以 . 或 \_ 开头的文件或目录

   以 d.ts 结尾的类型定义文件

   以 test.ts、spec.ts、e2e.ts 结尾的测试文件（适用于 .js、.jsx 和 .tsx 文件）

   components 和 component 目录

   utils 和 util 目录

   不是 .js、.jsx、.ts 或 .tsx 文件

   文件内容不包含 JSX 元素

2. 动态路由

   约定 [] 包裹的文件或文件夹为动态路由。

3. 嵌套路由

   Umi 里约定目录下有 \_layout.tsx 时会生成嵌套路由，以 \_layout.tsx 为该目录的 layout。layout 文件需要返回一个 React 组件，并通过 props.children 渲染子组件。

4. 全局 layout

   约定 src/layouts/index.tsx 为全局路由。返回一个 React 组件，并通过 props.children 渲染子组件。

5. 404 路由

   约定 src/pages/404.tsx 为 404 页面，需返回 React 组件。

6. 扩展路由属性

   支持在代码层通过导出静态属性的方式扩展路由。

#### 3. 权限处理

#### 4. 公共配置

#### 5. 请求方式

#### 6. Loading

#### 7. Mock 数据

#### 8. Jest 测试

#### 9. 服务端渲染
