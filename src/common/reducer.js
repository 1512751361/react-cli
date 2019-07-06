import { createReducer } from '@util/reduxUtil';
import {
	SAVE_PERMISSIONLIST,
} from './actions';

const commonReducer = createReducer(
	{
		permissions: [],
	},
	{
		[SAVE_PERMISSIONLIST]: (state, action) => ({ ...state, ...action.payload }),
	},
);

export default commonReducer;
