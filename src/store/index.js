import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './saga';

// 处理 compose 容器
let composeEnhancers = compose;
// 中间件容器
const middlewares = [];

/** 开发环境 */
if (process.env.NODE_ENV === 'development') {
	// 设置 redux-devtool
	composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
	// 添加 logger 中间件
	const { logger } = require('redux-logger');
	middlewares.push(logger);
}
/** 创建saga中间件 */
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

export default (preloadedState) => {
	// 添加中间件
	const middlewareEnhancer = applyMiddleware(...middlewares);
	// 给 store 添加功能
	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeEnhancers(...enhancers);
	// 创建 store
	const store = createStore(rootReducer, preloadedState, composedEnhancers);
	// 开发环境-热加载
	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
	}
	// 运行saga
	store.asyncTask = sagaMiddleware.run(rootSaga).done;
	return store;
};
