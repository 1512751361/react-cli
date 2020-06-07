import { ModelSagas } from '@src/redux/typings';
import {
  SPIN_WRAPPER, UPDATE_STATE, PROMISE_DISPATCH, namespace,
} from '@src/actions/app';

interface Sagas {
  [SPIN_WRAPPER]: {
    param: object;
    type: string;
  };
  [PROMISE_DISPATCH]: {
    param: object;
    type: string;
    resolve: Function;
    reject: Function;
  };
}

const delay = (time: number): Promise<boolean> => new Promise((resolve) => {
  setTimeout(() => resolve(true), time);
});

const sagas: ModelSagas<Sagas> = {

  /**
   * @description spinWrapper 页面 loading saga 包装器
   * @param {Action} action action
   * @param {Effect} sagaEffect effect
   * @returns {Generator} void
   */
  * [SPIN_WRAPPER]({ payload }, {
    put, take, race, call,
  }) {
    const type = payload?.type;
    const {
      timeout,
    } = yield race({
      stop: take(`${type}/@@end`),
      timeout: call(delay, 200),
    });

    if (timeout) {
      yield put({ type: `${namespace}/${UPDATE_STATE}`, payload: { spinLoading: true } });
      try {
        yield put({ type, payload: payload?.param });
        yield take(`${type}/@@end`);
      } finally {
        yield put({ type: `${namespace}/${UPDATE_STATE}`, payload: { spinLoading: false } });
      }
    }
  },

  /**
   * @description promiseDispatch Promise dispatch saga 包装器
   * @param {Action} action action
   * @param {Effect} sagaEffect effect
   * @returns {Generator} void
   */
  * [PROMISE_DISPATCH]({ payload }, { put, take, call }) {
    const resolve = payload?.resolve;
    const reject = payload?.reject;

    try {
      yield put({ type: payload?.type, payload: payload?.param });
      const res = yield take(`${payload?.type}/@@end`);

      yield call(resolve, res);
    } catch (error) {
      yield call(reject, error);
    }
  },
};

export default sagas;
