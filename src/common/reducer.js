import { createReducer } from '@util/reduxUtil';
import {
	SAVE_COMMON,
} from './actions';

const commonReducer = createReducer(
	{
	},
	{
		[SAVE_COMMON]: (state, action) => ({ ...state, ...action.payload }),
	},
);

export default commonReducer;
