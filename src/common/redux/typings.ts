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
