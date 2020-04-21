import { ActionBuildOptions } from '@/redux/typings';

// const namespace = 'page/index';

// const initialState = {};

export default {
  update: (state: object, action: ActionBuildOptions) => ({ ...state, ...action.payload }),
};
