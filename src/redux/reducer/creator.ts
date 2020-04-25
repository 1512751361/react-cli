// import { createSelector, Selector } from 'reselect';
// import sagaEffects from 'redux-saga/effects';
import { ActionBuildOptions } from '../typings';

/**
 * @description Reducers 生成器
 * @param {T} initialState 初始化 state
 * @param {object} handlers 方法集合
 * @returns {Function} Reducers
 */
export const createReducer = function <T, U> (
  initialState: T,
  handlers: {
    [key: string]: (state: T, payload?: U | object) => T;
  },
) {
  return function (state: T = initialState, action: ActionBuildOptions<U>) {
    const { type, payload } = action;

    if (type in handlers) {
      return handlers[type](state, payload || {});
    }
    return state;
  };
};

export default createReducer;
