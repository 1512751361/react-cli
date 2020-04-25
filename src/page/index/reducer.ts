import { ActionBuildOptions } from '@/redux/typings';

// export const namespace = 'page/index';

export const initialState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false,
    },
  ],
};

export default {
  updateState: (state: object, action: ActionBuildOptions) => ({ ...state, ...action.payload }),
};
