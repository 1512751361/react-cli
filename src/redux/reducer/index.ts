import { combineReducers, Reducer } from 'redux';

import { importDynamicReducers } from './dynamic-loader';

export { default as createReducer } from './creator';

export default (): Reducer => {
  const reducers = importDynamicReducers();

  return combineReducers(reducers);
};
