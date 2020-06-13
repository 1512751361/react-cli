import { ModelReducers } from '@src/redux/typings';
import {
  UPDATE_STATE,
  CLEAR_STATE,
} from '@src/actions/app';

export interface ModelState {
  spinLoading: boolean;
}

export const initialState: ModelState = {
  spinLoading: false,
};

interface ReducerPayload {
  [UPDATE_STATE]: ModelState;
  [CLEAR_STATE]: ModelState;
}

const reducers: ModelReducers<ModelState, ReducerPayload> = {
  [UPDATE_STATE]: (state, { payload }) => ({ ...state, ...payload }),
  [CLEAR_STATE]: () => initialState,
};

export default reducers;
