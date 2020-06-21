/* eslint-disable no-restricted-syntax */
import * as sagaEffects from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import { PutEffect, TakeEffect } from 'redux-saga/effects';
import {
  ModelEffects, ModelAction, ModelReducer, ModelReducers, Model, EffectsCallback,
} from './typings';

/**
 * @description 给reducer添加命名空间
 * @param {string} namespace ruducer命名空间
 * @param {ModelReducers<State, Payload>} obj 原reducer对象
 * @returns {ModelReducers<State, Payload>} 返回新的 reducer 对象
 */
const prefixReducer = function <State, Payload> (
  namespace: string,
  obj: ModelReducers<State, Payload>,
): ModelReducers<State, Payload> {
  return Object.keys(obj).reduce((memo: ModelReducers<State, Payload>, key: string) => {
    const res = { ...memo };
    const newKey = `${namespace}/${key}`;

    res[newKey] = obj[key];
    return res;
  }, {} as ModelReducers<State, Payload>);
};

const prefixType = (type: string, model: Model<any, any, {
  [key: string]: ModelEffects<any>;
}>): string => {
  const prefixedType = `${model.namespace}/${type}`;
  const typeWithoutAffix = `${type}`.replace(/\/@@[^/]+?$/, '');

  const reducer = Array.isArray(model.reducers)
    ? model.reducers[0][typeWithoutAffix]
    : model.reducers && model.reducers[typeWithoutAffix];

  if (reducer || (model.effects && model.effects[typeWithoutAffix])) {
    return prefixedType;
  }
  return type;
};

const createEffects = function (model: Model<any, any, {
  [key: string]: ModelEffects<any>;
}>): EffectsCallback {
  const put = (action: ModelAction<any>): PutEffect => {
    const { type } = action;

    console.log(prefixType(type, model), '---');
    return sagaEffects.put({ ...action, type: prefixType(type, model) });
  };
  const putResolve = (action: ModelAction<any>): PutEffect => {
    const { type } = action;

    return sagaEffects.putResolve({
      ...action,
      type: prefixType(type, model),
    });
  };

  put.resolve = putResolve;

  const take = (type: string | string[]): TakeEffect => {
    if (typeof type === 'string') {
      return sagaEffects.take(prefixType(type, model));
    }
    if (type instanceof Array) {
      return sagaEffects.take(
        type.map((t: string): string => {
          if (typeof t === 'string') {
            return prefixType(t, model);
          }
          return t;
        }),
      );
    }
    return sagaEffects.take(type);
  };

  return { ...sagaEffects, put, take };
};

/**
 * @description Reducers 生成器
 * @param {string} namespace 方法集合
 * @param {State} initialState 初始化 state
 * @param {object} handlers 方法集合
 * @returns {ModelReducer<State, Payload>} Reducers
 */
export const createReducer = function <State, Payload> (
  namespace: string,
  initialState: State,
  handlers?: ModelReducers<State, Payload>,
): ModelReducer<State, Payload> {
  if (!handlers) {
    return function (state: State = initialState) {
      return state;
    };
  }
  const reducers = prefixReducer(namespace, handlers);

  return function (state: State = initialState, action: ModelAction<Payload>) {
    const { type } = action;

    if (type in reducers) {
      return reducers[type](state, action);
    }
    return state;
  };
};

/**
 * @description 处理saga方法
 * @param {string} key saga key值
 * @param {ModelEffects<T>} effects saga集合方法
 * @param {Model} model model
 * @returns {Function} saga
 */
const getWatcher = function <T> (key: string, effects: ModelEffects<T>, model: Model<any, any, {
  [key: string]: ModelEffects<T>;
}>): Saga {
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
    action: ModelAction<T>,
  ): Generator {
    yield sagaEffects.put({ type: `${key}/@@start` });
    try {
      yield effect(action, createEffects(model));
    } catch (error) {
      console.log(error);
    }
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
 * @param {string} namespace 命名空间
 * @param {Model} model model
 * @param {object} effects saga列表
 * @returns {Function} 返回saga集合
 */
export const makeSagaCreator = function <T> (
  namespace: string,
  model: Model<any, any, {
    [key: string]: ModelEffects<T>;
  }>,
  effects?: {
    [key: string]: ModelEffects<T>;
  },
): Saga {
  return function * () {
    if (!effects) {
      return;
    }
    for (const key in effects) {
      if (Object.prototype.hasOwnProperty.call(effects, key)) {
        const watcher = getWatcher(`${namespace}/${key}`, effects[key], model);
        const task: any = yield sagaEffects.fork(watcher);

        // ${namespace}/@@CANCEL_EFFECTS 取消该命名空间内的所有saga
        yield sagaEffects.fork(function * () {
          yield sagaEffects.take(`${namespace}/@@CANCEL_EFFECTS`);
          yield sagaEffects.cancel(task);
        });
      }
    }
  };
};
