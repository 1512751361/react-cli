# `React-Router` 使用

## 前言

想必做过单页面应用的人，我有接触过路由；像 `vue` 的 `vue-router`，`react` 的 `react-router`。不同的框架有不同路由的处理方式，本文主要介绍 react-router 实现配置式路由和约定式路由。

## 1. 配置式路由

配置式路由实现方式比较简单，定义一个配置文件通过读取配置文件动态创建路由。下面我们定义配置路由支持的配置属性，为了更加切合需求我们参考 `react-router` 中 `Route` 组件的属性来定义配置属性，详细请参考 [`react-router`官网](https://reactrouter.com/web/api/Route)。

1. path

   Type: `string | string[]`

   约定路由路径

2. component

   Type: `string | React.ComponentType<any>`

   指定路由绑定的组件。

3. render

4. exact

   Type: `boolean`

   Default: `false`

   表示严格匹配，不带 `/` 的严格匹配。

5. strict

   Type: `boolean`

   Default: `false`

   表示严格匹配，带 `/` 的严格匹配。

6. location

   Type: `Location`

   路由路径高级配置，具体配置内容参考 `react-router Route` 的 `location` 参数。

7) sensitive

   Type: `boolean`

   Default: `false`

   表示路由区分大小写匹配。

8) childRoutes

   Type: `Array`

   当前路由的自路由

9) redirect

   Type: `string`

   路由重定向跳转

10) wrappers

    Type: `string`

    配置路由的高阶组件封装

11) title

    Type: `string`

    路由标题

## 2. 约定式路由

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
