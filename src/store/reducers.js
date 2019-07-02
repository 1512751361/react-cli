import { combineReducers } from 'redux';

import commonReducer from '@common/reducer';
import { importDynamicReducers } from './method/dynamic-loader';

const reducers = importDynamicReducers();

export default combineReducers({
	pages: combineReducers(reducers),
	common: commonReducer,
});
