import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import commonReducer from '@common/reducer';
import { importDynamicReducers } from './method/dynamic-loader';

const reducers = importDynamicReducers();

export default combineReducers({
	modules: combineReducers(reducers),
	common: commonReducer,
	form: formReducer,
});
