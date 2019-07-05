/*
 * action 创建函数
 */
import { makeActionCreator } from '@util/reduxUtil';
import {
	ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, SUM_COUNT,
} from './types';


export function addTodo(text) {
	return { type: ADD_TODO, text };
}

export function toggleTodo(index) {
	return { type: TOGGLE_TODO, index };
}

export const setVisibilityFilter = makeActionCreator(SET_VISIBILITY_FILTER, 'visibilityFilter');

export const sumCount = makeActionCreator(SUM_COUNT, 'count');
