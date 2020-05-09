import createReducer from '@src/redux/reducer/creator';

describe('test createReducer function', () => {
  const initialState = {
    a: {
      b: 1,
      c: 2
    }
  };
  const result = {
    update: 'update'
  };
  const handlers = {
    updateState: jest.fn()
  };
  test('createReducer return Function', () => {
    const reducer = createReducer(initialState, handlers);
    expect(reducer).toEqual(expect.any(Function));
  });

  test('reducer state default value', () => {
    const state = undefined;
    const action = { type: 'update' };
    const reducer1 = createReducer(initialState, handlers);
    expect(reducer1(state, action)).toEqual(initialState);
  });

  test('reducer action type no exist state value', () => {
    const state = initialState;
    const action = { type: 'update' };
    const reducer1 = createReducer(initialState, handlers);
    expect(reducer1(state, action)).toEqual(state);
    expect(reducer1(state, action)).not.toEqual(result);
    expect(reducer1(state, action)).not.toEqual({ ...state, ...result });
  });

  test('reducer action type exist state value', () => {
    const state = initialState;
    const action = { type: 'updateState' };
    handlers.updateState.mockReturnValueOnce(result);
    const reducer1 = createReducer(initialState, handlers);
    expect(reducer1(state, action)).toEqual(result);

    handlers.updateState.mockReturnValueOnce({ ...state, ...result });
    const reducer2 = createReducer(initialState, handlers);
    expect(reducer2(state, action)).toEqual({ ...state, ...result });
  });
});
