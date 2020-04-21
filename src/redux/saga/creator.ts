/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import sagaEffects from 'redux-saga/effects';
import { ActionBuildOptions, EffectsBuildOptions } from '../typings';

/**
 * @description 处理saga方法
 * @param {string} key saga key值
 * @param {EffectsBuildOptions<T>} effects saga集合方法
 * @returns {Function} saga
 */
const getWatcher = function <T> (key: string, effects: EffectsBuildOptions<T>): Function {
  let effect = effects;
  let type = 'takeEvery';
  let opts;

  if (Array.isArray(effects)) {
    [effect, opts] = effects;
    if (opts && opts.type) {
      type = opts.type;
    }
  }
  function * sagaWithCatch(
    action: ActionBuildOptions<T>,
  ): Iterator<any> {
    yield sagaEffects.put({ type: `${key}/@@start` });
    yield effect(action, sagaEffects);
    yield sagaEffects.put({ type: `${key}/@@end` });
  }
  switch (type) {
    case 'takeLatest':
      return function * () {
        yield sagaEffects.takeLatest(key, sagaWithCatch);
      };
    default:
      return function * () {
        yield sagaEffects.takeEvery(key, sagaWithCatch);
      };
  }
};

/**
 * @description saga Creators 生成器
 * @param {object} effects saga列表
 * @param {string} namespace 命名空间
 * @returns {Function} 返回saga集合
 */
export const makeSagaCreator = function <T> (
  effects: {
    [key: string]: EffectsBuildOptions<T>;
  },
  namespace: string,
): Function {
  return function * () {
    for (const key in effects) {
      if (Object.prototype.hasOwnProperty.call(effects, key)) {
        const watcher = getWatcher(`${namespace}/${key}`, effects[key]);
        const task = yield sagaEffects.fork(watcher as any);

        // ${namespace}/@@CANCEL_EFFECTS 取消该命名空间内的所有saga
        yield sagaEffects.fork(function * () {
          yield sagaEffects.take(`${namespace}/@@CANCEL_EFFECTS`);
          yield sagaEffects.cancel(task);
        });
      }
    }
  };
};

export default makeSagaCreator;
