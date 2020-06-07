import { ModelReducers } from '@src/redux/typings';
import {
  UPDATE_STATE,
  CLEAR_STATE,
} from '@src/actions/app';

export interface ModalState {
  spinLoading: boolean;
}

export const initialState: ModalState = {
  spinLoading: false,
};

interface ReducerPayload {
  [UPDATE_STATE]: ModalState;
  [CLEAR_STATE]: ModalState;
}

const reducers: ModelReducers<ModalState, ReducerPayload> = {
  [UPDATE_STATE]: (state, { payload }) => ({ ...state, ...payload }),
  [CLEAR_STATE]: () => initialState,
};

export default reducers;
