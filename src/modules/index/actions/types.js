/*
 * action 前缀
 */
const PREFIX = 'INDEX';
/*
 * action 类型
 */

export const ADD_TODO = `${PREFIX}_ADD_TODO`;
export const TOGGLE_TODO = `${PREFIX}_TOGGLE_TODO`;
export const SET_VISIBILITY_FILTER = `${PREFIX}_SET_VISIBILITY_FILTER`;
export const SUM_COUNT = `${PREFIX}_SUM_COUNT`;

/*
 * 其它的常量
 */

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE',
};
