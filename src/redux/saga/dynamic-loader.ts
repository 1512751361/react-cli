import { Saga } from 'redux-saga';
import { makeSagaCreator } from './creator';

/**
 * @description 动态导入saga
 * @param {string} root 动态加载根路径
 * @param {RegExp} match 动态匹配规则
 * @returns {Array<Saga>} saga集合
 */
export const importDynamicSagas = function (): Array<Saga> {
  const modules: Array<Saga> = [];
  // context 方法参数 不可使用变量和模版字符控制
  const resolve = require.context('../../../src', true, /(sagas\/.+|\/saga)\.[jt]s$/);

  resolve.keys().forEach((key: string) => {
    const basename = key.substring(2, key.lastIndexOf('/'));
    const namespace = resolve(key).namespace || basename;

    modules.push(makeSagaCreator(resolve(key).default, namespace));
  });
  return modules;
};

export default importDynamicSagas;
