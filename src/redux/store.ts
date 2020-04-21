/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-process-env */
import {
  applyMiddleware, createStore, compose, Middleware, StoreEnhancer, Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import rootSaga from './saga';

// 处理 compose 容器
let composeEnhancers = compose;
// 中间件容器
const middlewares: Middleware[] = [];

/** 开发环境 */
if (process.env.NODE_ENV === 'development') {
  // 设置 redux-devtool
  composeEnhancers = compose;
  if (typeof window === 'object' && Object.prototype.hasOwnProperty.call(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__')) {
    const win: any = window;

    if (win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }
  }
  // 添加 logger 中间件
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

/** 创建saga中间件 */
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

export default (preloadedState?: object): Store => {
  // 添加中间件
  const middlewareEnhancer = applyMiddleware(...middlewares);
  // 给 store 添加功能
  const enhancers = [middlewareEnhancer];
  const composedEnhancers: StoreEnhancer = composeEnhancers(...enhancers);
  // 创建 store
  const store: any = createStore(rootReducer, preloadedState, composedEnhancers);
  // 开发环境-热加载

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }
  // 运行saga
  store.asyncTask = sagaMiddleware.run(rootSaga);
  return store;
};
