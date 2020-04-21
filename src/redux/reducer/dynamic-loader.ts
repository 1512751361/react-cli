import camelCase from 'lodash/camelCase';
import { createReducer } from './creator';
import { ImportDynamicReducersResult } from '../typings';

window.require = require;

/**
 * @description 动态导入 reducers
 * @param {string} root 动态加载根路径
 * @param {RegExp} match 动态匹配规则
 * @returns {ImportDynamicReducersResult<T>} reducers集合
 */
export const importDynamicReducers = function<T> (
  root = '../../page',
  match = /\/reducer.(js|ts)$/,
): ImportDynamicReducersResult<T> {
  const modules: ImportDynamicReducersResult<T> = {};

  console.log(root);
  const resolve = require.context('../../page', true, match);

  resolve.keys().forEach((key: string) => {
    const basename = key.substring(
      key.lastIndexOf('/', key.lastIndexOf('/') - 1),
      key.lastIndexOf('/'),
    );
    const reducerName = camelCase(basename);
    const namespace = resolve(key).namespace || reducerName;
    const initialState = resolve(key).initialState || {};

    modules[namespace] = createReducer(initialState, resolve(key).default);
  });
  return modules;
};

export default importDynamicReducers;
