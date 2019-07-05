import { createReducer } from '@util/reduxUtil';
import {
	ADD_TODO,
	TOGGLE_TODO,
	SET_VISIBILITY_FILTER,
	VisibilityFilters,
	SUM_COUNT,
} from './actions/types';

const { SHOW_ALL } = VisibilityFilters;

const reducer = createReducer(
	{
		todos: [],
		visibilityFilter: SHOW_ALL,
		count: 0,
	},
	{
		[SET_VISIBILITY_FILTER]: (state, action) => ({ ...state, ...action.payload }),
		[ADD_TODO]: (state, action) => ({
			...state,
			todos: [...state.todos, {
				text: action.text,
				completed: false,
				id: parseInt(Math.random() * 1000, 10),
			}],
		}),
		[TOGGLE_TODO]: (state = [], action) => ({
			...state,
			todos: state.todos.map((todo, index) => {
				if (index === action.index) {
					return Object.assign({}, todo, {
						completed: !todo.completed,
					});
				}
				return todo;
			}),
		}),
		[SUM_COUNT]: (state, action) => ({
			...state,
			count: (state.count ? state.count : 0) + action.payload.count,
		}),
	},
);

export default reducer;
