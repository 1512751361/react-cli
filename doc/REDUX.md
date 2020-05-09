# Redux

### 前言

```Redux``` 是 ```React``` 生态中重要的组成部分。很多人都说，简单的应用可以不用此工具。但是我个人认为，中小型应用使用的话，可以使文件结构更加规范，代码可读性更强。因为React提出将展示组件与容器组件分离的思想，所以降低了 ```React``` 与 ```Redux```之间的耦合度。

### 作用

  1. 分离UI与逻辑

### 安装

  ```npm i redux -S```

  ```npm i react-redux -S```

### 核心概念


1. ```state```

    单一数据源原则：整个应用的 ```state``` 数据都被储存在一棵 ```object tree``` 中，并且这个 ```object tree``` 只存在于唯一一个 ```store``` 中。

2. ```action```

    ```State``` 只读原则：唯一改变 ```state``` 的方法就是触发 ```action```，```action``` 是一个用于描述已发生事件的普通对象。
  
3. ```reducer```

    使用纯函数修改```state```原则：为了描述 ```action``` 如何改变 ```state tree``` ，你需要编写 ```reducers```。
    

### 基本概念和API

1. ```state```

    ```state``` 其实就是一个普通的 ```JSON``` 对象。该对象包含 ```redux``` 的所有数据。
    
    当前的 ```state```，可以通过 ```store.getState()``` 获取。

    ```Redux``` 规定， 一个 ```State``` 对应一个 ```View```。只要 ```State``` 相同，```View``` 就相同。你知道 ```State```，就知道 ```View``` 是什么样，反之亦然。

    建议定义 ```state tree``` 层级结构不要太深。

2. ```action```

    ```action``` 是一个用于描述当前发生事件的普通对象。改变 ```State``` 的唯一办法，就是使用 ```Action```。它会运送数据到 ```Store```。

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
    const ADD_TODO = 'ADD_TODO'

    // action 创建函数
    function addTodo(text) {
      return {
        type: ADD_TODO,
        payload: {
          text,
        }
      }
    }

    const action = addTodo('Action Creator');
    ```

4. 