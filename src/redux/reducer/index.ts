import { combineReducers } from 'redux';

import { importDynamicReducers } from './dynamic-loader';

export { default as createReducer } from './creator';

const reducers = importDynamicReducers();

export default combineReducers(reducers);
