import { Action, AnyAction } from 'redux';
import { PutEffect, CallEffect } from 'redux-saga/effects';

type Reducer<S, A extends Action = AnyAction> = (state: S, action: A) => S;

export interface ModelAction<Payload = object> extends Action {
  payload?: Payload;
}

export type ModelReducer<State, Payload> = Reducer<State, ModelAction<Payload>>;

export type CreateReducer<State, Payload> = (
  state: State,
  handlers: {
    [key: string]: ModelReducer<State, Payload>;
  }
) => ModelReducer<State, Payload>;

export type ModelReducers<State, T> = {
  [P in keyof T]: ModelReducer<State, T[P]>;
};

export interface EffectsCallback {
  takeEvery: Function;
  takeLatest: Function;
  takeLeading: Function;
  throttle: Function;

  take: Function;
  put: <A extends AnyAction>(action: A) => PutEffect;
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
  delay: <T = true>(ms: number, val?: T) => CallEffect<T>;
}

export interface ModelEffectsOptions {
  type: 'takeEvery' | 'takeLatest' | 'watcher';
}

export type ModelEffectsFunction<Payload> = (
  action: ModelAction<Payload>,
  effects: EffectsCallback
) => void;

export type ModelEffects<Payload> =
  | ModelEffectsFunction<Payload>
  | [ModelEffectsFunction<Payload>, ModelEffectsOptions];

export type ModelSagas<T> = {
  [P in keyof T]: ModelEffects<T[P]>;
};

export interface Model<State, RP, EP> {
  namespace: string;
  state: State;
  reducers?: ModelReducers<State, RP>;
  effects?: ModelSagas<EP>;
}
