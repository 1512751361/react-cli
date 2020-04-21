/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallEffect } from 'redux-saga/effects';
import { Reducer } from 'redux';

export interface ActionBuildOptions<T = object> {
  type: string;
  payload?: T;
}

export type EffectsBuildOptions<T> = (
  action: ActionBuildOptions<T>,
  effects: any
) => CallEffect | [(action: ActionBuildOptions<T>, effects: any) => CallEffect, { type: string }];

export interface ImportDynamicReducersResult<T> {
  [key: string]: Reducer<T, ActionBuildOptions>;
}
