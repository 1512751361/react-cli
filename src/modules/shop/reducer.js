import { createReducer } from '@util/reduxUtil';

import {
	SAVE_SHOPLIST,
} from './actions';

export default createReducer(
	{},
	{
		[SAVE_SHOPLIST]: (state, action) => ({ ...state, ...action.payload }),
	},
);
