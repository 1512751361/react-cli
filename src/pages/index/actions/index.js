/*
 * action 创建函数
 */
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './types'

import { makeActionCreator } from '@util/reduxUtil'

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export const setVisibilityFilter = makeActionCreator(SET_VISIBILITY_FILTER,'visibilityFilter');
