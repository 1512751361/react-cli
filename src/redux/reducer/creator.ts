import { ActionBuildOptions, ReducerBuildOptions } from './typings';

/**
 * @description Reducers 生成器
 * @param {State} initialState 初始化 state
 * @param {object} handlers 方法集合
 * @returns {ReducerBuildOptions<State, Payload>} Reducers
 */
export const createReducer = function <State, Payload> (
  initialState: State,
  handlers: {
    [key: string]: ReducerBuildOptions<State, Payload>;
  },
): ReducerBuildOptions<State, Payload> {
  return function (state: State = initialState, action: ActionBuildOptions<Payload>) {
    const { type } = action;

    if (type in handlers) {
      return handlers[type](state, action);
    }
    return state;
  };
};

export default createReducer;