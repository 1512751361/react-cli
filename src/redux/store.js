// import { createStore,applyMiddleware,compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension'
// import todoApp from './reducers';

// import {  
//   VisibilityFilters
// } from './actions/todo/ActionTypes';
// import {
//   addTodo,
//   toggleTodo,
//   setVisibilityFilter,
// } from './actions/todo'

// 打印日志
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}
// 捕获异常
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

const round = number => Math.round(number * 100) / 100

const monitorReducerEnhancer = createStore => (
  reducer,
  initialState,
  enhancer
) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now()
    const newState = reducer(state, action)
    const end = performance.now()
    const diff = round(end - start)

    console.log('reducer process time:', diff)

    return newState
  }

  return createStore(monitoredReducer, initialState, enhancer)
}

// const middlewareEnhancer = applyMiddleware(logger, crashReporter)
// const composedEnhancers = composeWithDevTools(
//   middlewareEnhancer,
//   monitorReducerEnhancer
// )

// let store = createStore(todoApp,undefined,composedEnhancers);

// // 打印初始化状态
// console.log(store.getState())
// // 每次 state 更新时，打印日志
// // 注意 subscribe() 返回一个函数用来注销监听器
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

// // 发起一系列 action
// store.dispatch(addTodo('Learn about actions'))
// store.dispatch(addTodo('Learn about reducers'))
// store.dispatch(addTodo('Learn about store'))
// store.dispatch(toggleTodo(0))
// store.dispatch(toggleTodo(1))
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// // 停止监听 state 更新
// unsubscribe()

// export default store


// function configureStore(preloadedState) {
//   const middlewares = [logger, crashReporter]
//   const middlewareEnhancer = applyMiddleware(...middlewares)

//   const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
//   const composedEnhancers = composeWithDevTools(...enhancers)

//   const store = createStore(rootReducer, preloadedState, composedEnhancers)

//   return store
// }

import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

import rootReducer from './reducers'

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [logger, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducerEnhancer]
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}