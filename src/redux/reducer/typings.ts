import { Action, AnyAction } from 'redux';

type Reducer<S, A extends Action = AnyAction> = (state: S, action: A) => S;

export interface ActionBuildOptions<Payload = object> extends Action {
  payload?: Payload;
}

export type ReducerBuildOptions<State, Payload = object> = Reducer<
  State,
  ActionBuildOptions<Payload>
>;

export type CreateReducer<State, Payload = object> = (
  state: State,
  handlers: {
    [key: string]: ReducerBuildOptions<State, Payload>;
  }
) => ReducerBuildOptions<State, Payload>;

export interface ImportDynamicReducersResult<State, Payload = object> {
  [namespace: string]: ReducerBuildOptions<State, Payload>;
}
