import { ModelSagas } from '@src/redux/typings';

interface Sagas {
  login: {
    param: object;
    type: string;
  };
  timeout: {
    param: object;
    type: string;
    resolve: Function;
    reject: Function;
  };
}

const delay = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 1000 * 5));

const sagas: ModelSagas<Sagas> = {
  * login({ payload }, { put, call, take }) {
    console.log('login:', payload, 1);
    yield put({ type: 'timeout' });
    yield take('timeout/@@end');
    console.log('login', 'ff', 2);
    yield call(delay);
    console.log('login', 'ff', 3);
    yield 1;
  },
  * timeout({ payload }, { call, put }) {
    console.log('timeout', payload, 4);
    yield call(delay);
    yield call(delay);
    console.log('timeout', payload, 5);
    yield 1;
    yield put({
      type: 'updateState',
      payload: {
        visibilityFilter: 'visibilityFilter',
      },
    });
  },
};

export default sagas;
