let nextTodoId = 2;

export const namespace = 'pages/index';

export const ADD_TODO = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = (text: string): object => {
  nextTodoId += 1;
  return {
    type: ADD_TODO,
    payload: {
      id: nextTodoId,
      text,
    },
  };
};

export const setVisibilityFilter = (filter: string): object => ({
  type: SET_VISIBILITY_FILTER,
  payload: {
    filter,
  },
});

export const toggleTodo = (id: number): object => ({
  type: TOGGLE_TODO,
  payload: {
    id,
  },
});
