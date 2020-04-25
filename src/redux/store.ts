/* eslint-disable no-process-env */
import { Store } from 'redux';
import rootReducer from './reducer';
import rootSaga from './saga';
import createStore from './store/createStore';

export default (preloadedState?: object): Store => {
  const store = createStore({
    reducers: rootReducer,
    sagas: rootSaga,
    initialState: preloadedState,
  });

  // 开发环境-热加载
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }
  return store;
};
