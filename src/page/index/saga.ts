import { SagasBuildOptions } from '@src/redux/saga/typings';

const delay = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 1000 * 5));

const sagas: SagasBuildOptions<any> = {
  * login(arg, { put, take }) {
    console.log('login:', arg, 1);
    yield put({ type: 'page/index/timeout' });
    yield take('page/index/timeout/@@end');
    console.log('login', 'ff', 2);
    yield 1;
  },
  * timeout({ payload }, { call, put }) {
    console.log('timeout', payload, 3);
    yield call(delay);
    console.log('timeout', payload, 4);
    yield 1;
    yield put({ type: 'page/index/timeout/@@end' });
  },
};

export default sagas;
