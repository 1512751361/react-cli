/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable no-process-env */
import {
  applyMiddleware,
  createStore,
  compose,
  Middleware,
  StoreEnhancer,
  Store,
  Reducer,
} from 'redux';
import createSagaMiddleware, { SagaMiddleware, Saga } from 'redux-saga';

interface CreateStoreBuildOptions {
  reducers: Reducer;
  sagas: Saga[];
  initialState?: object;
}

export default function ({ reducers, initialState, sagas }: CreateStoreBuildOptions): Store {
  let composeEnhancers = compose;

  /** 开发环境 */
  // 设置 redux-devtool
  if (
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    Object.prototype.hasOwnProperty.call(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__')
  ) {
    const win: any = window;

    if (win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, maxAge: 30 });
    }
  }

  /** ===  添加中间件 ====**/
  const middlewares: Middleware[] = [];

  if (process.env.NODE_ENV === 'development') {
    // 添加 logger 中间件
    const { logger } = require('redux-logger');

    middlewares.push(logger);
  }

  /** 创建saga中间件 */
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

  middlewares.push(sagaMiddleware);

  const enhancers = [applyMiddleware(...middlewares)];
  // 给 store 添加功能
  const composedEnhancers: StoreEnhancer = composeEnhancers(...enhancers);

  const store: any = createStore(reducers, initialState, composedEnhancers);

  store.runSaga = sagaMiddleware.run;

  sagas.forEach((saga: Saga) => sagaMiddleware.run(saga));

  const win: any = window;

  win.g_store = store;
  return store;
}
