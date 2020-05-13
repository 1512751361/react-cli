# Redux

### 前言

在没有使用 ```Redux``` 的 ```React``` 项目中的组件通信和状态管理是特别繁琐的，比如子组件和父组件通信改变值，要通过父组件的方法。使用 ```Redux``` 可以解决组件之间的通信问题，因为 ```React``` 提出将展示组件与容器组件分离的思想，所以降低了 ```React``` 与 ```Redux```之间的耦合度。很多人都说，简单的应用可以不用此工具。但是我个人认为，中小型应用使用的话，可以使文件结构更加规范，代码可读性更强。

### 作用

  1. 分离UI与逻辑
  2. 跨组件通信

### 安装

  ```npm i redux -S```

  ```npm i react-redux -S```

### 核心概念

1. ```state```

    单一数据源原则：整个应用的 ```state``` 数据都被储存在一棵 ```object tree``` 中，并且这个 ```object tree``` 只存在于唯一一个 ```store``` 中。

    ```state``` 其实就是一个普通的 ```JSON``` 对象。该对象包含 ```redux``` 的所有数据。
    
    当前的 ```state```，可以通过 ```store.getState()``` 获取。

    ```Redux``` 规定， 一个 ```State``` 对应一个 ```View```。只要 ```State``` 相同，```View``` 就相同。你知道 ```State```，就知道 ```View``` 是什么样，反之亦然。

    建议定义 ```state tree``` 层级结构不要太深。

    ```
    {
      text: 'text 文本',
      todos: [1,2,3,4]
    }
    ```

2. ```action```

    ```State``` 只读原则：唯一改变 ```state``` 的方法就是触发 ```action```，```action``` 是一个用于描述已发生事件的普通对象。

    我们约定：```action``` 内必须使用一个字符串类型的 ```type``` 字段来表示将要执行的动作。通常其他参数用 ```payload``` 字段来存储以便管理方便，结构清晰。

    ```
    const ADD_TODO = 'ADD_TODO'

    // action
    {
      type: ADD_TODO,
      payload: {
        text: 'Build my first action'
      }
    }
    ```

3. ```Action``` 创建函数

    ```Action``` 创建函数其实就是生成 ```action``` 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

    有时候改变多少消息是，就会有多少个 ```action```。如果每次都写一遍类似的操作，就会显得繁琐、麻烦。我们可以通过定义一个函数来生成一个 ```Action```，这个函数就叫 ```Action``` 创建函数。

    ```
    const updateText = 'updateText'

    // action 创建函数
    function addTodo(text) {
      return {
        type: updateText,
        payload: {
          text,
        }
      }
    }

    const action = addTodo('Action Creator');
    ```

4. ```Reducer```

  使用纯函数修改```state```原则：为了描述 ```action``` 如何改变 ```state tree``` ，你需要编写 ```reducers```。

  ```Reducer``` 是一个纯函数，只能通过使用```Reducer``` 用来修改 ```state tree``` 的数据。

  ```Reducer``` 是接收 ```state``` 和 ```action``` 参数，返回新的 ```state``` 的一个函数。

  ```Reducer``` 必须遵守的约束条件：
  
  1. 修改传入参数
  2. 执行有副作用的操作，如 API 请求和路由跳转
  3. 调用非纯函数，如 ```Date.now()``` 或 ```Math.random()```，因为每次会得到不一样的结果，无法预测 ```Reducer``` 执行后的结果。

  ```
  (previousState, action) => newState
  ```

  ```
  const initialState = {
    text: 'text 文本',
    todos: [1,2,3,4]
  };
  function updateText(state = initialState, action) {
    switch (action.type) {
      case 'updateText':
        return Object.assign({}, state, {
          text: action.payload.text
        })
      default:
        return state
    }
  }
  ```

5. ```Store```

  使用 ```action``` 来描述“发生了什么”，和使用 ```reducers``` 来根据 ```action``` 更新 ```state``` 的用法。```Store``` 就是把它们联系到一起的对象。```Store``` 有以下职责：

  1. 维持应用的 ```state```
  2. 提供 ```getState()``` 方法获取 ```state```
  3. 提供 ```dispatch(action)``` 方法更新 ```state```
  4. 通过 ```subscribe(listener)``` 注册监听器
  5. 通过 ```subscribe(listener)``` 返回的函数注销监听器


### 工作流程

  <img src="./redux-process.png" />

  1. 用户调用 ```store.dispatch(action)``` 触发 ```Action```
  2. 接着 ```Store``` 调用传入的 ```reducer``` 函数（此过程传入当前的 ```state tress``` 和 ```action```）
  3. 然后 ```reducer``` 计算下一个 ```state``` 返回给 ```Store``` 并更新 ```state tree```
  4. 最后 ```Store``` 根据新的 ```state tree``` 重新渲染 ```View```。


### 