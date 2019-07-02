import { combineReducers } from 'redux';

import { importDynamicReducers } from './method/dynamic-loader';

const reducers = importDynamicReducers();

export default combineReducers({
  module: combineReducers(reducers)
})