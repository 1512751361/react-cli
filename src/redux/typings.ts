import {
  CallEffect,
} from 'redux-saga/effects';
import { Reducer } from 'redux';

interface EffectsCallback {
  takeEvery: Function;
  takeLatest: Function;
  takeLeading: Function;
  throttle: Function;

  take: Function;
  put: Function;
  call: Function;
  apply: Function;
  cps: Function;
  fork: Function;
  spawn: Function;
  join: Function;
  cancel: Function;
  select: Function;
  actionChannel: Function;
  flush: Function;
  cancelled: Function;

  race: Function;
  all: Function;
}

export interface ActionBuildOptions<T = object> {
  type: string;
  payload?: T;
}

export type EffectsBuildOptions<T> = (
  action: ActionBuildOptions<T>,
  effects: EffectsCallback
) => Generator;

export interface ImportDynamicReducersResult<T> {
  [namespace: string]: Reducer<T, ActionBuildOptions>;
}

export interface SagasBuildOptions<T> {
  [key: string]: EffectsBuildOptions<T>;
}
