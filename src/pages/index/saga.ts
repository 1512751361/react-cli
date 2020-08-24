import { ModelSagas } from '@src/redux/typings';
import pollingEffect from '@src/util/pollingEffect';

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
  watch: any;
}
const sagas: ModelSagas<Sagas> = {
  *login({ payload }, { put, take, delay }) {
    console.log('login:', payload, 1);
    yield put({ type: 'timeout' });
    yield take('timeout/@@end');
    console.log('login', 'ff', 2);
    yield delay(1000 * 5);
    console.log('login', 'ff', 3);
    yield 1;
  },
  *timeout({ payload }, { delay, put }) {
    console.log('timeout', payload, 4);
    yield delay(1000 * 5);
    yield delay(1000 * 5);
    console.log('timeout', payload, 5);
    yield 1;
    yield put({
      type: 'updateState',
      payload: {
        visibilityFilter: 'visibilityFilter'
      }
    });
  },
  // *watch(_, { delay }) {
  //   try {
  //     console.log('watch');
  //     while (true) {
  //       const res = yield delay(1000 * 2);
  //       console.log('while', res);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   } finally {
  //     console.log('finally');
  //     yield delay(1000 * 5);
  //   }
  // },
  watch: pollingEffect<any>(function* (_, { delay }) {
    yield delay(1000 * 2);
    console.log('watch ....');
  })
};

export default sagas;
