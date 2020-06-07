import { ModelReducers } from '@src/redux/typings';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
} from './actions';

export interface ModalState {
  visibilityFilter: string;
  todos: {
    id: number;
    text?: string;
    completed?: boolean;
  }[];
}

export const initialState: ModalState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      id: 1,
      text: 'Consider using Redux',
      completed: true,
    },
    {
      id: 2,
      text: 'Keep all state in a single tree',
      completed: false,
    },
  ],
};

interface ReducerPayload {
  updateState: ModalState;
  [TOGGLE_TODO]: { id: number };
  [ADD_TODO]: { id: number; text: string };
  [SET_VISIBILITY_FILTER]: ModalState;
}

const reducers: ModelReducers<ModalState, ReducerPayload> = {
  updateState: (state, { payload }) => ({ ...state, ...payload }),
  [TOGGLE_TODO]: (state, { payload }) => {
    const { todos } = state;

    return {
      ...state,
      todos: todos.map((todo) => (todo.id === payload?.id
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo)),
    };
  },
  [ADD_TODO]: (state, { payload }) => ({
    ...state,
    todos: state.todos.concat({
      id: payload?.id || Math.random(),
      text: payload?.text,
      completed: false,
    }),
  }),
  [SET_VISIBILITY_FILTER]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
};

export default reducers;
