/* eslint-disable no-process-env */
import {
  Store, combineReducers, Reducer,
} from 'redux';
import { Saga } from 'redux-saga';
import importDynamicRedux from './dynamic-loader';
import createStore from './store/createStore';
import { ModelReducer } from './typings';

const reduxs = importDynamicRedux();
const getReducers = (): Reducer => {
  const reducerMap = importDynamicRedux().reduce<{[key: string]: ModelReducer<any, any>}>((r, item) => {
    if (!item.reducers) {
      return r;
    }
    const res: {[key: string]: ModelReducer<any, any>} = {
      ...r,
      [item.namespace]: item.reducers as ModelReducer<any, any>,
    };

    return res;
  }, {} as {[key: string]: ModelReducer<any, any>});

  return combineReducers(reducerMap);
};
const rootSaga = reduxs.map((item) => item.effects).filter((o) => o);

export default (preloadedState?: object): Store => {
  const store = createStore({
    reducers: getReducers(),
    sagas: rootSaga as Saga[],
    initialState: preloadedState,
  });

  // 开发环境-热加载
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./dynamic-loader', () => store.replaceReducer(getReducers()));
  }
  return store;
};
