import { Dispatch, Action } from 'redux';

export interface ReduxComponentTStateProps {
  spinLoading?: boolean;
}

export interface ReduxComponentTDispatchProps {
  dispatch: Dispatch<Action<any>>;
  emit: <T>(actionType: string, payload?: T) => void;
  spinWrapper: <T>(actionType: string, payload?: T) => void;
  promiseDispatch: <T>(actionType: string, payload?: T) => Promise<any>;
}

export type ReduxComponentPageType = ReduxComponentTStateProps & ReduxComponentTDispatchProps;

export interface UseSpinWrapperOptions {
  // 默认 false。 即在初始化时自动执行 service。如果设置为 true，则需要手动调用 run 触发执行。
  manual?: boolean;
}

export interface UseSpinWrapperResult<T> {
  loading: boolean;
  run: (param?: T) => any;
}

export interface UsePromiseOptions {
  // 默认 false。 即在初始化时自动执行 service。如果设置为 true，则需要手动调用 run 触发执行。
  manual?: boolean;
}

export interface UsePromiseResult<T> {
  loading: boolean;
  run: (param?: T) => Promise<void>;
  promiseDispatch: (param?: T) => Promise<any>;
}
