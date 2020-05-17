/* eslint-disable no-process-env */
import { Store } from 'redux';
import getReducers from './reducer';
import rootSaga from './saga';
import createStore from './store/createStore';

export default (preloadedState?: object): Store => {
  const store = createStore({
    reducers: getReducers(),
    sagas: rootSaga,
    initialState: preloadedState,
  });

  // 开发环境-热加载
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(getReducers()));
  }
  return store;
};
