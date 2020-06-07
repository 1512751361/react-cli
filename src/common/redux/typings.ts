import { Dispatch, Action } from 'redux';

export interface PageType {
  dispatch: Dispatch<Action<any>>;
  spinLoading?: boolean;
  emit: <T>(actionType: string, payload?: T) => void;
  spinWrapper: <T>(actionType: string, payload?: T) => void;
  promiseDispatch: <T>(actionType: string, payload?: T) => Promise<any>;
}
