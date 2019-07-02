// Action Creators 生成器
export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type, payload: {} };

  argNames.forEach((arg, index) => {
    action.payload[argNames[index]] = args[index];
  });

  return action;
};
// Reducers 生成器
export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => {
  if (action.type in handlers) {
    return handlers[action.type](state, action);
  }
  return state;
};

export const createRequestTypes = actionType => ({
  REQUEST: `${actionType}_REQUEST`,
  SUCCESS: `${actionType}_SUCCESS`,
  FAILURE: `${actionType}_FAILURE`
});
// 异步 Action Creators
export const makeAsyncActionCreator = ({ REQUEST, SUCCESS, FAILURE }) => ({
  request: payload => ({
    type: REQUEST,
    payload
  }),
  success: payload => ({
    type: SUCCESS,
    payload
  }),
  failure: payload => ({
    type: FAILURE,
    payload
  })
});
