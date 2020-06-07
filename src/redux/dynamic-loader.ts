import { createReducer, makeSagaCreator } from './creator';
import { Model } from './typings';

/**
 * @description 动态导入 reducers/sagas
 * @param {string} root 动态加载根路径
 * @param {RegExp} match 动态匹配规则
 * @returns {Array<Model<object, object, object>>} redux 集合
 */
export const importDynamicRedux = function (): Array<Model<object, object, object>> {
  const models: object = {};
  // context 方法参数 不可使用变量和模版字符控制
  const resolve = require.context(
    '../../src',
    true,
    /((reducers|sagas)\/.+|\/(reducer|saga))\.[jt]s$/,
  );

  resolve.keys().forEach((key: string) => {
    let basename = key.substring(2, key.lastIndexOf('/'));

    if (key.startsWith('./reducers') || key.startsWith('./sagas')) {
      basename = key.replace(/^.\/(reducers|sagas)/, 'common').replace(/\.[jt]s$/, '');
    }
    if (!models[basename]) {
      models[basename] = {
        namespace: basename,
        state: {},
      };
    }

    if (key.startsWith('./reducers') || key.endsWith('/reducer.ts') || key.endsWith('/reducer.js')) {
      const namespace: string = resolve(key).namespace || basename;
      const initialState = resolve(key).initialState || {};

      models[basename].namespace = namespace;
      models[basename].state = initialState;
      models[basename].reducers = resolve(key).default;
    } else if (key.startsWith('./sagas') || key.endsWith('/saga.ts') || key.endsWith('/saga.js')) {
      models[basename].effects = resolve(key).default;
    }
  });
  return Object.keys(models).reduce<Model<object, object, object>[]>((res, key) => res.concat({
    ...models[key],
    reducers: createReducer(models[key].namespace, models[key].state, models[key].reducers),
    effects: makeSagaCreator(models[key].namespace, models[key], models[key].effects),
  }), []);
};

export default importDynamicRedux;
