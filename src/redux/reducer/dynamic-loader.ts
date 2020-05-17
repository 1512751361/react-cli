import { createReducer } from './creator';
import { ImportDynamicReducersResult } from './typings';

/**
 * @description 动态导入 reducers
 * @param {string} root 动态加载根路径
 * @param {RegExp} match 动态匹配规则
 * @returns {ImportDynamicReducersResult<State, Payload>} reducers集合
 */
export const importDynamicReducers = function<
State,
Payload,
> (): ImportDynamicReducersResult<State, Payload> {
  const modules: ImportDynamicReducersResult<State, Payload> = {};
  // context 方法参数 不可使用变量和模版字符控制
  const resolve = require.context('../../../src', true, /(reducers\/.+|\/reducer)\.[jt]s$/);

  resolve.keys().forEach((key: string) => {
    const basename = key.substring(2, key.lastIndexOf('/'));

    const namespace: string = resolve(key).namespace || basename;
    const initialState = resolve(key).initialState || {};

    modules[namespace] = createReducer(namespace, initialState, resolve(key).default);
  });
  return modules;
};

export default importDynamicReducers;
