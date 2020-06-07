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
  * login({ payload }, { put, take }) {
    console.log('login:', payload, 1);
    yield put({ type: 'pages/index/timeout' });
    yield take('pages/index/timeout/@@end');
    console.log('login', 'ff', 2);
    yield 1;
  },
  * timeout({ payload }, { call, put }) {
    console.log('timeout', payload, 3);
    yield call(delay);
    console.log('timeout', payload, 4);
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
