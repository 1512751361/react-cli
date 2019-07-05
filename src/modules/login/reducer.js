import { createReducer } from '@util/reduxUtil';
import {
	LOGIN_SAVE,
} from './actions';

const reducer = createReducer(
	{
	},
	{
		[LOGIN_SAVE]: (state, action) => ({ ...state, ...action.payload }),
	},
);

export default reducer;
