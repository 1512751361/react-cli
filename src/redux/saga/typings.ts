import { Action, AnyAction } from 'redux';

export interface ActionBuildOptions<Payload = object> extends Action {
  payload?: Payload;
}

export interface EffectsCallback {
  takeEvery: Function;
  takeLatest: Function;
  takeLeading: Function;
  throttle: Function;

  take: Function;
  put: <A extends AnyAction>(action: A) => any;
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

export type EffectsBuildOptions<Payload = object> = (
  action: ActionBuildOptions<Payload>,
  effects: EffectsCallback
) => void;

export interface SagasBuildOptions<Payload = object> {
  [key: string]: EffectsBuildOptions<Payload>;
}
