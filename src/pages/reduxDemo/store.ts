import { createStore, Store, Reducer } from 'redux';

interface IState {
  num: number;
}

const initState = {
  num: 1,
};

const reducers: Reducer<IState> = (state = initState, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        num: state.num + 1,
      };
    case 'minus':
      return {
        ...state,
        num: state.num - 1,
      };
    default:
      return state;
  }
};

const store: Store<IState> = createStore(reducers);

export default store;
