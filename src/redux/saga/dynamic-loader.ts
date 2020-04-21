import { makeSagaCreator } from './creator';

/**
 * @description 动态导入saga
 * @param {string} root 动态加载根路径
 * @param {RegExp} match 动态匹配规则
 * @returns {Array<Function>} saga集合
 */
export const importDynamicSagas = (
  root = '../../page',
  match = /\/saga\.(js|ts)$/,
): Array<Function> => {
  const modules: Function[] = [];
  const resolve = require.context(root, true, match);

  resolve.keys().forEach((key: string) => {
    const { namespace } = resolve(key);

    modules.push(makeSagaCreator(resolve(key).default, namespace));
  });
  return modules;
};

export default importDynamicSagas;
